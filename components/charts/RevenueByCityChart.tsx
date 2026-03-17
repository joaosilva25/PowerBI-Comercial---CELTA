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
  chartTokens,
  NeonDefs,
  toKeyValueData,
  tooltipContentStyle,
  tooltipItemStyle,
  tooltipLabelStyle,
  truncateLabel,
} from "@/components/charts/ChartCard";

interface RevenueByCityChartProps {
  data: Record<string, number>;
}

export const RevenueByCityChart: React.FC<RevenueByCityChartProps> = ({
  data,
}) => {
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const chartData = toKeyValueData(data, 10);

  return (
    <ChartCard title="Faturamento por Cidade (Top 10)">
      {chartData.length === 0 ? (
        <EmptyChartState />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 24, left: 40, bottom: 0 }}
          >
            <NeonDefs id="rev-city" />
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={chartTokens.grid}
            />
            <XAxis
              dataKey="name"
              tickFormatter={(v) => truncateLabel(String(v), 10)}
              tick={{ fill: chartTokens.tick, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />
            <YAxis
              width={96}
              tickFormatter={(v) => formatCurrency(Number(v) || 0)}
              tickMargin={8}
              tick={{ fill: chartTokens.tick, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value) || 0)}
              labelFormatter={(label) => String(label)}
              contentStyle={tooltipContentStyle}
              labelStyle={tooltipLabelStyle}
              itemStyle={tooltipItemStyle}
              cursor={{ fill: "rgb(148 163 184 / 0.08)" }}
            />
            <Bar
              dataKey="value"
              fill="url(#rev-city-bar)"
              fillOpacity={0.86}
              stroke={chartTokens.accent2}
              strokeOpacity={0.4}
              strokeWidth={1}
              filter="url(#rev-city-glow)"
              radius={[4, 4, 0, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};
