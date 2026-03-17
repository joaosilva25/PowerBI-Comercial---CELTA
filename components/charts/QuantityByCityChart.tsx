"use client";

import React from "react";
import {
  Bar,
  BarChart,
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

interface QuantityByCityChartProps {
  data: Record<string, number>;
}

export const QuantityByCityChart: React.FC<QuantityByCityChartProps> = ({
  data,
}) => {
  const chartData = toKeyValueData(data, 12);

  return (
    <ChartCard title="Quantidade por Cidade (Top 12)">
      {chartData.length === 0 ? (
        <EmptyChartState />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 24, left: 24, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#e5e7eb"
            />
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="name"
              width={150}
              tickFormatter={(v) => truncateLabel(String(v), 20)}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => Number(value) || 0}
              labelFormatter={(label) => String(label)}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Bar
              dataKey="value"
              fill="#3b82f6"
              radius={[0, 4, 4, 0]}
              barSize={26}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};
