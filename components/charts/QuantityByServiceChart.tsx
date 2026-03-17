"use client";

import React from "react";
import {
  Line,
  LineChart,
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

interface QuantityByServiceChartProps {
  data: Record<string, number>;
}

export const QuantityByServiceChart: React.FC<QuantityByServiceChartProps> = ({
  data,
}) => {
  const chartData = toKeyValueData(data, 12);

  return (
    <ChartCard title="Quantidade por Serviço (Top 12)">
      {chartData.length === 0 ? (
        <EmptyChartState />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 24, left: 28, bottom: 0 }}
          >
            <NeonDefs id="qty-service" />
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
              width={48}
              tickMargin={8}
              tick={{ fill: chartTokens.tick, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value) => Number(value) || 0}
              labelFormatter={(label) => String(label)}
              contentStyle={tooltipContentStyle}
              labelStyle={tooltipLabelStyle}
              itemStyle={tooltipItemStyle}
              cursor={{ fill: "rgb(148 163 184 / 0.08)" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={chartTokens.accent2}
              strokeOpacity={0.95}
              strokeWidth={2}
              dot={{ r: 3, fill: chartTokens.accent2, stroke: chartTokens.surface }}
              activeDot={{
                r: 5,
                fill: chartTokens.accent2,
                stroke: chartTokens.surface,
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#qty-service-glow)"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};
