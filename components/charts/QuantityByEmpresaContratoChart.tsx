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
  chartTokens,
  NeonDefs,
  toKeyValueData,
  tooltipContentStyle,
  tooltipItemStyle,
  tooltipLabelStyle,
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
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 24, left: 0, bottom: 0 }}
          >
            <NeonDefs id="qty-emp" />
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
              tick={{ fill: chartTokens.tick, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />
            <Tooltip
              formatter={(value) => Number(value) || 0}
              labelFormatter={(label) => String(label)}
              contentStyle={tooltipContentStyle}
              labelStyle={tooltipLabelStyle}
              itemStyle={tooltipItemStyle}
              cursor={{ fill: "rgb(148 163 184 / 0.08)" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartTokens.accent2}
              strokeOpacity={0.95}
              fill="url(#qty-emp-area)"
              strokeWidth={2}
              filter="url(#qty-emp-glow)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};
