"use client";
import { FileText, Loader2, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { YEARS_DATA, PERIODS, MONTHS } from "@/data/constants";

interface DashboardFiltersProps {
  selectedYear: string;
  selectedMonth: string;
  selectedPeriod: string;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
  onPeriodChange: (period: string) => void;
  onTypeChange: (type: string) => void;
  selectedType: string;
  onGenerateReport: () => void;
  isGeneratingReport?: boolean;
  onRefresh?: () => void;
  onClearCache?: () => void;
  isLoading?: boolean;
}

export function DashboardFilters({
  selectedYear,
  selectedMonth,
  selectedPeriod,
  onYearChange,
  onMonthChange,
  onPeriodChange,
  onTypeChange,
  selectedType,
  onGenerateReport,
  isGeneratingReport = false,
  onClearCache,
  isLoading = false,
}: DashboardFiltersProps) {
  const isDisabled = isLoading || isGeneratingReport;

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
      <div className="flex items-center gap-2">
        <div className="bg-gray-100 p-1 rounded-lg flex gap-1">
          {PERIODS.map((period) => (
            <button
              key={period.value}
              onClick={() => onPeriodChange(period.value)}
              disabled={isDisabled}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                selectedPeriod === period.value
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-200"
              } ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {period.label}
            </button>
          ))}
        </div>

        <div className="h-6 w-px bg-gray-200 mx-2" />

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Ano:
          </span>
          <Select value={selectedYear} onValueChange={onYearChange}>
            <SelectTrigger className="w-[100px]" disabled={isDisabled}>
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {YEARS_DATA.map((year) => (
                <SelectItem key={year.id} value={year.id}>
                  {year.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedPeriod === "monthly" && (
          <div className="flex items-center gap-2 animate-in fade-in zoom-in duration-300">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Mês:
            </span>
            <Select value={selectedMonth} onValueChange={onMonthChange}>
              <SelectTrigger className="w-[140px]" disabled={isDisabled}>
                <SelectValue placeholder="Mês" />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Tipo:
          </span>
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger className="w-[140px]" disabled={isDisabled}>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="Preventiva">Preventiva</SelectItem>
              <SelectItem value="Corretiva">Corretiva</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-6 w-px bg-gray-200 hidden md:block" />

      {onClearCache && (
        <button
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          onClick={onClearCache}
          title="Limpar Cache Local"
          disabled={isDisabled}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}

      <button
        className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors shadow-sm text-sm font-medium ml-auto md:ml-0 w-full md:w-auto justify-center cursor-pointer ${
          isDisabled ? "opacity-70 cursor-not-allowed" : ""
        }`}
        onClick={onGenerateReport}
        disabled={isDisabled}
      >
        {isGeneratingReport ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <FileText className="w-4 h-4" />
        )}
        <span>{isGeneratingReport ? "Gerando..." : "Gerar Relatório"}</span>
      </button>
    </div>
  );
}
