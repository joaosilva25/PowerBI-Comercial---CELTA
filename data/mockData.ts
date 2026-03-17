import axios from "axios";
import { ApiDashboardData } from "../types";
import { YEARS_DATA, MONTHS } from "./constants";

const CACHE_PREFIX = "dashboard_data_";

const getFromCache = (key: string): ApiDashboardData | null => {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem(CACHE_PREFIX + key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error("Error reading from cache", e);
    return null;
  }
};

const saveToCache = (key: string, data: ApiDashboardData) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving to cache", e);
  }
};

export const clearCache = () => {
  if (typeof window === "undefined") return;
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(CACHE_PREFIX)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
};

export const fetchData = async (
  year?: string,
  month?: string,
  yearId?: string,
  forceRefresh = false,
  yearIdRow?: string,
  period?: string,
  type: string = "todos",
): Promise<ApiDashboardData> => {
  // Handle Period Aggregation (3m, 6m, 12m) on Frontend
  if (period && period !== "monthly") {
    return aggregatePeriodData(year, yearId, yearIdRow, period, type);
  }

  const cacheKey = JSON.stringify({
    year,
    month,
    yearId,
    yearIdRow,
    period: "monthly",
    type,
  });

  if (!forceRefresh) {
    const cachedData = getFromCache(cacheKey);
    if (cachedData) {
      return cachedData;
    }
  }

  try {
    const response = await axios.post<ApiDashboardData>(
      "https://n8n.srv946688.hstgr.cloud/webhook/e4296402-9d9d-49f1-b01e-8a5a06ccfe27",
      {
        year,
        month,
        yearId,
        yearIdRow,
        type,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    saveToCache(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

// --- Aggregation Logic ---

const parseCurrency = (value: string): number => {
  // Format: "R$ 1.234,56" or similar
  try {
    const numericPart = value.replace(/[^\d,]/g, "").replace(",", ".");
    return parseFloat(numericPart) || 0;
  } catch {
    return 0;
  }
};

const formatCurrency = (value: number): string => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const aggregatePeriodData = async (
  year?: string,
  yearId?: string,
  yearIdRow?: string,
  period?: string,
  type: string = "todos",
): Promise<ApiDashboardData> => {
  let monthsToAggregate: string[] = [];

  if (period === "3m") {
    monthsToAggregate = ["1", "2", "3"]; // Jan, Feb, Mar
  } else if (period === "6m") {
    monthsToAggregate = ["1", "2", "3", "4", "5", "6"]; // Jan-Jun
  } else if (period === "12m") {
    monthsToAggregate = Array.from({ length: 12 }, (_, i) =>
      (i + 1).toString(),
    ); // Jan-Dec
  }

  // Fetch all required months
  const promises = monthsToAggregate.map((m) =>
    fetchData(year, m, yearId, false, yearIdRow, "monthly", type).catch(
      () => null,
    ),
  );

  const results = await Promise.all(promises);
  const validResults = results.filter((r) => r !== null) as ApiDashboardData[];

  const initOpcional = () => ({
    sim: 0,
    nao: 0,
    total: 0,
    percentual: "0%",
  });

  const initRecord = () => ({} as Record<string, number>);

  const aggregated: ApiDashboardData = {
    resumo: { faturamento_total: formatCurrency(0), quantidade_total: 0 },
    opcionais: {
      nacionalizado: initOpcional(),
      cosmetica: initOpcional(),
      pintura_interna: initOpcional(),
      pintura_externa: initOpcional(),
      piso: initOpcional(),
    },
    quantidade_por: {
      cidade: initRecord(),
      representante: initRecord(),
      cliente: initRecord(),
      situacao: initRecord(),
      empresa_contrato: initRecord(),
      frota: initRecord(),
      servico: initRecord(),
      pagamento: initRecord(),
    },
    faturamento_por: {
      cidade: initRecord(),
      representante: initRecord(),
      cliente: initRecord(),
      servico: initRecord(),
    },
  };

  const addToRecord = (
    target: Record<string, number>,
    source?: Record<string, number>,
  ) => {
    if (!source) return;
    for (const [key, value] of Object.entries(source)) {
      target[key] = (target[key] || 0) + (Number(value) || 0);
    }
  };

  const addOpcional = (
    target: { sim: number; nao: number; total: number; percentual: string },
    source?: { sim: number; nao: number; total: number; percentual: string },
  ) => {
    if (!source) return;
    target.sim += Number(source.sim) || 0;
    target.nao += Number(source.nao) || 0;
    target.total += Number(source.total) || 0;
  };

  let faturamentoTotal = 0;
  let quantidadeTotal = 0;

  for (const data of validResults) {
    faturamentoTotal += parseCurrency(data.resumo.faturamento_total);
    quantidadeTotal += Number(data.resumo.quantidade_total) || 0;

    addOpcional(aggregated.opcionais.nacionalizado, data.opcionais.nacionalizado);
    addOpcional(aggregated.opcionais.cosmetica, data.opcionais.cosmetica);
    addOpcional(aggregated.opcionais.pintura_interna, data.opcionais.pintura_interna);
    addOpcional(aggregated.opcionais.pintura_externa, data.opcionais.pintura_externa);
    addOpcional(aggregated.opcionais.piso, data.opcionais.piso);

    addToRecord(aggregated.quantidade_por.cidade, data.quantidade_por.cidade);
    addToRecord(
      aggregated.quantidade_por.representante,
      data.quantidade_por.representante,
    );
    addToRecord(aggregated.quantidade_por.cliente, data.quantidade_por.cliente);
    addToRecord(aggregated.quantidade_por.situacao, data.quantidade_por.situacao);
    addToRecord(
      aggregated.quantidade_por.empresa_contrato,
      data.quantidade_por.empresa_contrato,
    );
    addToRecord(aggregated.quantidade_por.frota, data.quantidade_por.frota);
    addToRecord(aggregated.quantidade_por.servico, data.quantidade_por.servico);
    addToRecord(aggregated.quantidade_por.pagamento, data.quantidade_por.pagamento);

    addToRecord(aggregated.faturamento_por.cidade, data.faturamento_por.cidade);
    addToRecord(
      aggregated.faturamento_por.representante,
      data.faturamento_por.representante,
    );
    addToRecord(aggregated.faturamento_por.cliente, data.faturamento_por.cliente);
    addToRecord(aggregated.faturamento_por.servico, data.faturamento_por.servico);
  }

  const finalizeOpcional = (o: { sim: number; nao: number; total: number; percentual: string }) => {
    const total = Number(o.total) || 0;
    const sim = Number(o.sim) || 0;
    o.percentual = total > 0 ? `${((sim / total) * 100).toFixed(2)}%` : "0%";
  };

  finalizeOpcional(aggregated.opcionais.nacionalizado);
  finalizeOpcional(aggregated.opcionais.cosmetica);
  finalizeOpcional(aggregated.opcionais.pintura_interna);
  finalizeOpcional(aggregated.opcionais.pintura_externa);
  finalizeOpcional(aggregated.opcionais.piso);

  aggregated.resumo = {
    faturamento_total: formatCurrency(faturamentoTotal),
    quantidade_total: quantidadeTotal,
  };

  return aggregated;
};

export const prefetchAllData = async () => {
  console.log("Starting background pre-fetch...");

  // Helper to process queue sequentially
  const processQueue = async () => {
    // Sort years to prioritize 2025 then 2026
    const sortedYears = [...YEARS_DATA].sort((a, b) => {
      if (a.label === "2025") return -1;
      if (b.label === "2025") return 1;
      return a.label.localeCompare(b.label);
    });

    // 1. Fetch all months for all years
    for (const yearData of sortedYears) {
      for (const month of MONTHS) {
        try {
          // Check cache first to avoid redundant calls if already loaded
          const cacheKey = JSON.stringify({
            year: yearData.label,
            month: month.value,
            yearId: yearData.id,
            yearIdRow: yearData.idRow,
            period: "monthly",
            type: "todos",
          });

          if (!getFromCache(cacheKey)) {
            console.log(`Pre-fetching: ${yearData.label} - ${month.label}`);
            await fetchData(
              yearData.label,
              month.value,
              yearData.id,
              false,
              yearData.idRow,
              "monthly",
              "todos",
            );
          }
        } catch (error) {
          console.error(
            `Failed to pre-fetch ${yearData.label}/${month.value}`,
            error,
          );
          // Continue with next item even if one fails
        }
      }
    }

    // 2. Fetch all periods for all years (skipping "monthly" as it's handled above)
    // Note: Since we are now aggregating on the frontend, pre-fetching 'periods' effectively just ensures
    // the individual months required for those periods are in cache.
    // However, the aggregation logic uses `fetchData` recursively for months, so we just need to ensure
    // individual months are fetched. The previous loop already does this for ALL months.
    // So we don't strictly need to pre-fetch "period" calls anymore if the aggregation happens client-side.
    // But to be safe and ensure the "period" cache key is also populated if we ever use it directly,
    // we can keep it or remove it. Given the new requirement to aggregate ON FRONTEND,
    // we actually should rely on the individual month cache.

    // For now, I will remove the explicit period pre-fetch loop because the user wants "soma dos dados"
    // which implies we will compute it from the monthly data we just fetched.
  };

  // Run without blocking
  processQueue().then(() => {
    console.log("Background pre-fetch completed.");
  });
};
