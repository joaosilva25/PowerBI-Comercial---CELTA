"use client";

import React from "react";

export type KeyValueDatum = { name: string; value: number };

export const chartTokens = {
  grid: "var(--chart-grid)",
  tick: "var(--chart-tick)",
  tooltipBg: "var(--tooltip-bg)",
  tooltipBorder: "var(--border)",
  accent: "var(--accent)",
  accent2: "var(--accent-2)",
  surface: "var(--surface)",
} as const;

export const tooltipContentStyle: React.CSSProperties = {
  backgroundColor: chartTokens.tooltipBg,
  borderRadius: "12px",
  border: `1px solid ${chartTokens.tooltipBorder}`,
  boxShadow: "0 18px 50px -36px rgb(0 0 0 / 0.9)",
};

export const tooltipLabelStyle: React.CSSProperties = {
  color: "var(--muted)",
};

export const tooltipItemStyle: React.CSSProperties = {
  color: "var(--foreground)",
};

export const NeonDefs: React.FC<{
  id: string;
  primary?: string;
  secondary?: string;
}> = ({ id, primary = chartTokens.accent, secondary = chartTokens.accent2 }) => {
  return (
    <defs>
      <linearGradient id={`${id}-bar`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={primary} stopOpacity="0.95" />
        <stop offset="100%" stopColor={secondary} stopOpacity="0.78" />
      </linearGradient>

      <linearGradient id={`${id}-area`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={secondary} stopOpacity="0.28" />
        <stop offset="100%" stopColor={secondary} stopOpacity="0" />
      </linearGradient>

      <filter
        id={`${id}-glow`}
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
      >
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation="4"
          floodColor={secondary}
          floodOpacity="0.35"
        />
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation="10"
          floodColor={primary}
          floodOpacity="0.18"
        />
      </filter>
    </defs>
  );
};

export const toKeyValueData = (
  data: Record<string, number>,
  limit?: number,
): KeyValueDatum[] => {
  const rows = Object.entries(data)
    .map(([name, value]) => ({ name, value: Number(value) || 0 }))
    .filter((row) => row.value > 0)
    .sort((a, b) => b.value - a.value);

  return typeof limit === "number" ? rows.slice(0, limit) : rows;
};

export const groupOthers = (
  rows: KeyValueDatum[],
  limit: number,
  othersLabel = "Outros",
): KeyValueDatum[] => {
  if (rows.length <= limit) return rows;
  const head = rows.slice(0, limit);
  const tail = rows.slice(limit);
  const othersValue = tail.reduce((acc, r) => acc + (Number(r.value) || 0), 0);
  if (othersValue <= 0) return head;
  return [...head, { name: othersLabel, value: othersValue }];
};

export const truncateLabel = (value: string, max = 18) => {
  const s = String(value ?? "");
  if (s.length <= max) return s;
  return `${s.slice(0, Math.max(0, max - 1))}…`;
};

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="bg-surface/60 backdrop-blur-xl p-7 rounded-2xl border border-border/60 h-[400px] shadow-[0_12px_30px_-18px_rgb(0_0_0_/_0.7)]">
      <h3 className="text-base font-semibold tracking-tight text-foreground mb-4">
        {title}
      </h3>
      <div className="h-[320px] w-full">{children}</div>
    </div>
  );
};

interface EmptyChartStateProps {
  message?: string;
}

export const EmptyChartState: React.FC<EmptyChartStateProps> = ({
  message = "Sem dados para o período selecionado.",
}) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="text-sm text-muted">{message}</div>
    </div>
  );
};
