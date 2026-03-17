"use client";
import { useState, useCallback } from "react";
import { Sidebar } from "@/components/ui/Sidebar";
import { KPICard } from "@/components/ui/KPICard";
import { RevenueByServiceChart } from "@/components/charts/RevenueByServiceChart";
import { RevenueByClientChart } from "@/components/charts/RevenueByClientChart";
import { RevenueByRepresentativeChart } from "@/components/charts/RevenueByRepresentativeChart";
import { RevenueByCityChart } from "@/components/charts/RevenueByCityChart";
import { QuantityByCityChart } from "@/components/charts/QuantityByCityChart";
import { QuantityByRepresentativeChart } from "@/components/charts/QuantityByRepresentativeChart";
import { QuantityByClientChart } from "@/components/charts/QuantityByClientChart";
import { QuantityBySituationChart } from "@/components/charts/QuantityBySituationChart";
import { QuantityByFrotaChart } from "@/components/charts/QuantityByFrotaChart";
import { QuantityByServiceChart } from "@/components/charts/QuantityByServiceChart";
import { OptionalNacionalizadoCard } from "@/components/charts/OptionalNacionalizadoCard";
import { OptionalCosmeticaCard } from "@/components/charts/OptionalCosmeticaCard";
import { OptionalPinturaInternaCard } from "@/components/charts/OptionalPinturaInternaCard";
import { OptionalPinturaExternaCard } from "@/components/charts/OptionalPinturaExternaCard";
import { OptionalPisoCard } from "@/components/charts/OptionalPisoCard";
import { DashboardFilters } from "@/components/DashboardFilters";
import { fetchData } from "@/data/mockData";
import { YEARS_DATA } from "@/data/constants";
import { DollarSign, Hash, TrendingUp } from "lucide-react";
import { ApiDashboardData } from "@/types";
import { Skeleton } from "@/components/ui/Skeleton";
import { toast } from "sonner";

const parseCurrency = (value: string): number => {
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

export default function Home() {
  const [rawData, setRawData] = useState<ApiDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sheetCode, setSheetCode] = useState<string>("");

  const currentYear = new Date().getFullYear().toString();
  const initialYearId =
    YEARS_DATA.find((y) => y.label === currentYear)?.id || YEARS_DATA[0].id;

  const selectedYearId = initialYearId;
  const selectedMonth = (new Date().getMonth() + 1).toString();
  const selectedPeriod = "monthly";
  const selectedType = "todos";

  const loadData = useCallback(
    async (forceRefresh = false, code?: string) => {
      setIsLoading(true);
      const toastId = "loading-data";
      let toastShown = false;

      // Only show toast if loading takes more than 500ms (avoids flicker on cached data)
      const timer = setTimeout(() => {
        toast.loading("Carregando Informações...", { id: toastId });
        toastShown = true;
      }, 500);

      try {
        const selectedYearData = YEARS_DATA.find(
          (y) => y.id === selectedYearId,
        );
        const yearLabel = selectedYearData?.label || selectedYearId;
        const yearIdRow = selectedYearData?.idRow;
        const spreadsheetCode = (code ?? sheetCode).trim();

        const result = await fetchData(
          yearLabel,
          selectedPeriod === "monthly" ? selectedMonth : undefined,
          selectedYearId,
          forceRefresh,
          yearIdRow,
          selectedPeriod,
          selectedType,
          spreadsheetCode,
        );

        // Clear timer immediately after fetch returns
        clearTimeout(timer);
        if (toastShown) {
          toast.dismiss(toastId);
        }

        setRawData(result);
      } catch (error) {
        clearTimeout(timer);
        console.error("Error loading dashboard data:", error);
        setRawData(null);
        toast.error("Dados Inexistentes", { id: toastId });
      } finally {
        setIsLoading(false);
      }
    },
    [selectedYearId, selectedMonth, selectedPeriod, selectedType, sheetCode],
  );

  const handleGenerateDashboard = useCallback(
    (code: string) => {
      setSheetCode(code);
      loadData(true, code);
    },
    [loadData],
  );

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-72 p-6 md:p-10">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex justify-between items-start gap-6">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Dashboard Comercial
              </h1>
              <p className="text-muted mt-1">
                Visão geral de faturamento e quantidade
              </p>
            </div>
            <div className="text-sm text-muted bg-surface/60 backdrop-blur-xl px-4 py-2 rounded-xl border border-border/60 shadow-[0_12px_30px_-18px_rgb(0_0_0_/_0.7)]">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </div>
          </div>

          <DashboardFilters
            onGenerateDashboard={handleGenerateDashboard}
            isLoading={isLoading}
          />

          {isLoading ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-surface/60 backdrop-blur-xl p-7 rounded-2xl border border-border/60 h-32 shadow-[0_12px_30px_-18px_rgb(0_0_0_/_0.7)]"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-32" />
                      </div>
                      <Skeleton className="h-10 w-10 rounded-lg" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-surface/60 backdrop-blur-xl p-7 rounded-2xl border border-border/60 h-[400px] shadow-[0_12px_30px_-18px_rgb(0_0_0_/_0.7)]">
                  <Skeleton className="h-6 w-48 mb-6" />
                  <Skeleton className="h-[300px] w-full rounded-lg" />
                </div>
                <div className="bg-surface/60 backdrop-blur-xl p-7 rounded-2xl border border-border/60 h-[400px] shadow-[0_12px_30px_-18px_rgb(0_0_0_/_0.7)]">
                  <Skeleton className="h-6 w-48 mb-6" />
                  <Skeleton className="h-[300px] w-full rounded-lg" />
                </div>
              </div>

              <div className="grid grid-cols-1">
                <div className="bg-surface/60 backdrop-blur-xl p-7 rounded-2xl border border-border/60 h-[400px] shadow-[0_12px_30px_-18px_rgb(0_0_0_/_0.7)]">
                  <Skeleton className="h-6 w-48 mb-6" />
                  <Skeleton className="h-[300px] w-full rounded-lg" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KPICard
                  title="Faturamento Total"
                  value={rawData?.resumo.faturamento_total || "0"}
                  icon={DollarSign}
                />
                <KPICard
                  title="Quantidade Total"
                  value={rawData?.resumo.quantidade_total || 0}
                  icon={Hash}
                />
                <KPICard
                  title="Ticket Médio"
                  value={
                    rawData
                      ? formatCurrency(
                          rawData.resumo.quantidade_total > 0
                            ? parseCurrency(rawData.resumo.faturamento_total) /
                                rawData.resumo.quantidade_total
                            : 0,
                        )
                      : "0"
                  }
                  icon={TrendingUp}
                />
              </div>

              <div className="text-xs font-semibold tracking-wider text-muted uppercase">
                Faturamento
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueByServiceChart data={rawData?.faturamento_por.servico || {}} />
                <RevenueByClientChart data={rawData?.faturamento_por.cliente || {}} />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueByRepresentativeChart
                  data={rawData?.faturamento_por.representante || {}}
                />
                <RevenueByCityChart data={rawData?.faturamento_por.cidade || {}} />
              </div>

              <div className="text-xs font-semibold tracking-wider text-muted uppercase">
                Quantidade
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <QuantityByCityChart data={rawData?.quantidade_por.cidade || {}} />
                <QuantityByRepresentativeChart
                  data={rawData?.quantidade_por.representante || {}}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <QuantityByClientChart data={rawData?.quantidade_por.cliente || {}} />
                <QuantityBySituationChart
                  data={rawData?.quantidade_por.situacao || {}}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <QuantityByServiceChart data={rawData?.quantidade_por.servico || {}} />
                <QuantityByFrotaChart data={rawData?.quantidade_por.frota || {}} />
              </div>

              <div className="text-xs font-semibold tracking-wider text-muted uppercase">
                Opcionais
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {rawData?.opcionais.nacionalizado && (
                  <OptionalNacionalizadoCard data={rawData.opcionais.nacionalizado} />
                )}
                {rawData?.opcionais.cosmetica && (
                  <OptionalCosmeticaCard data={rawData.opcionais.cosmetica} />
                )}
                {rawData?.opcionais.pintura_interna && (
                  <OptionalPinturaInternaCard
                    data={rawData.opcionais.pintura_interna}
                  />
                )}
                {rawData?.opcionais.pintura_externa && (
                  <OptionalPinturaExternaCard
                    data={rawData.opcionais.pintura_externa}
                  />
                )}
                {rawData?.opcionais.piso && (
                  <OptionalPisoCard data={rawData.opcionais.piso} />
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
