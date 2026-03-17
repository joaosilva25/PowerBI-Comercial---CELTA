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
  chartTokens,
  NeonDefs,
  toKeyValueData,
  tooltipContentStyle,
  tooltipItemStyle,
  tooltipLabelStyle,
  truncateLabel,
} from "@/components/charts/ChartCard";

interface QuantityBySituationChartProps {
  data: Record<string, number>;
}

export const QuantityBySituationChart: React.FC<
  QuantityBySituationChartProps
> = ({ data }) => {
  const chartData = toKeyValueData(data, 8);
  const colors = [
    "#60a5fa",
    "#38bdf8",
    "#22d3ee",
    "#818cf8",
    "#a5b4fc",
    "#93c5fd",
    "#0ea5e9",
    "#1d4ed8",
  ];

  return (
    <ChartCard title="Quantidade por Situação">
      {chartData.length === 0 ? (
        <EmptyChartState />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <NeonDefs id="qty-sit" />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={110}
              paddingAngle={3}
              stroke={chartTokens.surface}
              strokeWidth={1}
              filter="url(#qty-sit-glow)"
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => Number(value) || 0}
              labelFormatter={(label) => String(label)}
              contentStyle={tooltipContentStyle}
              labelStyle={tooltipLabelStyle}
              itemStyle={tooltipItemStyle}
            />
            <Legend
              verticalAlign="bottom"
              height={40}
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-muted font-medium">
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
