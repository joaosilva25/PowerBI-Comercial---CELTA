"use client";
import { useState } from "react";

interface DashboardFiltersProps {
  onGenerateDashboard: (sheetCode: string) => void;
  isLoading?: boolean;
}

export function DashboardFilters({
  onGenerateDashboard,
  isLoading = false,
}: DashboardFiltersProps) {
  const [sheetCode, setSheetCode] = useState("");
  const isDisabled = isLoading;

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-surface/60 backdrop-blur-xl p-5 rounded-2xl border border-border/60 shadow-[0_12px_30px_-18px_rgb(0_0_0_/_0.7)]">
      <input
        value={sheetCode}
        onChange={(e) => setSheetCode(e.target.value)}
        placeholder="Código da planilha"
        disabled={isDisabled}
        className="h-11 w-full rounded-xl border border-border/60 bg-surface/60 px-4 text-sm text-foreground placeholder:text-muted outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-60"
      />

      <button
        className={`h-11 w-full md:w-[220px] flex items-center justify-center gap-2 bg-[linear-gradient(135deg,rgb(59_130_246),rgb(34_211_238))] hover:brightness-110 text-white px-5 rounded-xl transition-all shadow-[0_12px_30px_-18px_rgb(0_0_0_/_0.7)] text-sm font-semibold cursor-pointer ${
          isDisabled || sheetCode.trim().length === 0
            ? "opacity-60 cursor-not-allowed"
            : ""
        }`}
        onClick={() => onGenerateDashboard(sheetCode.trim())}
        disabled={isDisabled || sheetCode.trim().length === 0}
      >
        Gerar Dashboard
      </button>
    </div>
  );
}
