"use client";

import React from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  ChartCard,
  EmptyChartState,
  groupOthers,
  toKeyValueData,
  truncateLabel,
} from "@/components/charts/ChartCard";

interface RevenueByRepresentativeChartProps {
  data: Record<string, number>;
}

export const RevenueByRepresentativeChart: React.FC<
  RevenueByRepresentativeChartProps
> = ({ data }) => {
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const base = toKeyValueData(data);
  const chartData = groupOthers(base, 7);
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#f97316", "#64748b"];

  return (
    <ChartCard title="Faturamento por Representante">
      {chartData.length === 0 ? (
        <EmptyChartState />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={110}
              paddingAngle={3}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => formatCurrency(Number(value) || 0)}
              labelFormatter={(label) => String(label)}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={40}
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-gray-600 font-medium">
                  {truncateLabel(String(value), 18)}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};
