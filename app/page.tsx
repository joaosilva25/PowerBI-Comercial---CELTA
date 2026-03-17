"use client";
import { useEffect, useState, useCallback } from "react";
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
import { fetchData, clearCache, prefetchAllData } from "@/data/mockData";
import { YEARS_DATA } from "@/data/constants";
import { DollarSign, Hash, TrendingUp } from "lucide-react";
import { ApiDashboardData } from "@/types";
import { Skeleton } from "@/components/ui/Skeleton";
import axios from "axios";
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
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const currentYear = new Date().getFullYear().toString();
  const initialYearId =
    YEARS_DATA.find((y) => y.label === currentYear)?.id || YEARS_DATA[0].id;

  const [selectedYearId, setSelectedYearId] = useState<string>(initialYearId);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString(),
  );
  const [selectedPeriod, setSelectedPeriod] = useState<string>("monthly");
  const [selectedType, setSelectedType] = useState<string>("todos");

  const loadData = useCallback(
    async (forceRefresh = false) => {
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

        const result = await fetchData(
          yearLabel,
          selectedPeriod === "monthly" ? selectedMonth : undefined,
          selectedYearId,
          forceRefresh,
          yearIdRow,
          selectedPeriod,
          selectedType,
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
    [selectedYearId, selectedMonth, selectedPeriod, selectedType],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    // Trigger pre-fetch in background after initial mount
    prefetchAllData();
  }, []);
  const handleClearCache = useCallback(() => {
    clearCache();
    toast.success("Cache limpo. Recarregando dados...");
    loadData(true);
    prefetchAllData();
  }, [loadData]);

  const handleGenerateReport = async () => {
    if (!rawData) {
      toast.error("Nenhum dado disponível para gerar relatório.");
      return;
    }

    setIsGeneratingReport(true);
    const toastId = toast.loading("Nossa IA está gerando seu relatório...");

    // TODO: Substitua pela URL correta do seu webhook para geração de relatórios
    const REPORT_WEBHOOK_URL =
      "https://n8n.srv946688.hstgr.cloud/webhook/df2ddc7d-37a0-418e-9399-ccf3065b3751";

    try {
      const response = await axios.post(REPORT_WEBHOOK_URL, rawData, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const selectedYearData = YEARS_DATA.find((y) => y.id === selectedYearId);
      const yearLabel = selectedYearData?.label || selectedYearId;

      const fileName = `Relatorio_Mensal_${selectedMonth.padStart(2, "0")}-${yearLabel}.docx`;

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Relatório gerado e baixado com sucesso!", {
        id: toastId,
      });
    } catch (error) {
      console.error("Erro ao enviar solicitação de relatório:", error);
      toast.error("Erro ao solicitar relatório. Tente novamente mais tarde.", {
        id: toastId,
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Comercial
              </h1>
              <p className="text-gray-500 mt-1">
                Visão geral de faturamento e quantidade
              </p>
            </div>
            <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-xs">
              Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </div>
          </div>

          <DashboardFilters
            selectedYear={selectedYearId}
            selectedMonth={selectedMonth}
            selectedPeriod={selectedPeriod}
            selectedType={selectedType}
            onYearChange={setSelectedYearId}
            onMonthChange={setSelectedMonth}
            onPeriodChange={setSelectedPeriod}
            onTypeChange={setSelectedType}
            onGenerateReport={handleGenerateReport}
            isGeneratingReport={isGeneratingReport}
            onClearCache={handleClearCache}
            isLoading={isLoading}
          />

          {isLoading ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-xl border border-gray-100 h-32"
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
                <div className="bg-white p-6 rounded-xl border border-gray-100 h-[400px]">
                  <Skeleton className="h-6 w-48 mb-6" />
                  <Skeleton className="h-[300px] w-full rounded-lg" />
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 h-[400px]">
                  <Skeleton className="h-6 w-48 mb-6" />
                  <Skeleton className="h-[300px] w-full rounded-lg" />
                </div>
              </div>

              <div className="grid grid-cols-1">
                <div className="bg-white p-6 rounded-xl border border-gray-100 h-[400px]">
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

              <div className="text-sm font-semibold text-gray-700">
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

              <div className="text-sm font-semibold text-gray-700">
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

              <div className="text-sm font-semibold text-gray-700">Opcionais</div>
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
