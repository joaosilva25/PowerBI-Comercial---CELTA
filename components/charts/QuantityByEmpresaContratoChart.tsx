"use client";

import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartCard,
  EmptyChartState,
  toKeyValueData,
  truncateLabel,
} from "@/components/charts/ChartCard";

interface QuantityByEmpresaContratoChartProps {
  data: Record<string, number>;
}

export const QuantityByEmpresaContratoChart: React.FC<
  QuantityByEmpresaContratoChartProps
> = ({ data }) => {
  const chartData = toKeyValueData(data, 12);

  return (
    <ChartCard title="Quantidade por Empresa/Contrato (Top 12)">
      {chartData.length === 0 ? (
        <EmptyChartState />
      ) : (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 24, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis
            dataKey="name"
            tickFormatter={(v) => truncateLabel(String(v), 10)}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis />
          <Tooltip
            formatter={(value) => Number(value) || 0}
            labelFormatter={(label) => String(label)}
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8b5cf6"
            fill="#f5f3ff"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
      )}
    </ChartCard>
  );
};
