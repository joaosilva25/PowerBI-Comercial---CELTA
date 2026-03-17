"use client";

import React from "react";

export type KeyValueDatum = { name: string; value: number };

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
    <div className="bg-white p-6 rounded-xl border border-gray-100 h-[400px] shadow-xs">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
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
      <div className="text-sm text-gray-500">{message}</div>
    </div>
  );
};
