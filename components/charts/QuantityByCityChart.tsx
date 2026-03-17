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
            <NeonDefs id="qty-city" />
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke={chartTokens.grid}
            />
            <XAxis
              type="number"
              tick={{ fill: chartTokens.tick, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickMargin={8}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={150}
              tickFormatter={(v) => truncateLabel(String(v), 20)}
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
            <Bar
              dataKey="value"
              fill="url(#qty-city-bar)"
              fillOpacity={0.88}
              stroke={chartTokens.accent2}
              strokeOpacity={0.35}
              strokeWidth={1}
              filter="url(#qty-city-glow)"
              radius={[0, 4, 4, 0]}
              barSize={26}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};
