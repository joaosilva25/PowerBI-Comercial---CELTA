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

interface RevenueByServiceChartProps {
  data: Record<string, number>;
}

export const RevenueByServiceChart: React.FC<RevenueByServiceChartProps> = ({
  data,
}) => {
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const chartData = toKeyValueData(data, 10);

  return (
    <ChartCard title="Faturamento por Serviço">
      {chartData.length === 0 ? (
        <EmptyChartState />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 24, left: 24, bottom: 0 }}
          >
            <NeonDefs id="rev-service" />
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke={chartTokens.grid}
            />
            <XAxis
              type="number"
              tickFormatter={(v) => formatCurrency(Number(v) || 0)}
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
              formatter={(value) => formatCurrency(Number(value) || 0)}
              labelFormatter={(label) => String(label)}
              contentStyle={tooltipContentStyle}
              labelStyle={tooltipLabelStyle}
              itemStyle={tooltipItemStyle}
              cursor={{ fill: "rgb(148 163 184 / 0.08)" }}
            />
            <Bar
              dataKey="value"
              fill="url(#rev-service-bar)"
              fillOpacity={0.9}
              stroke={chartTokens.accent2}
              strokeOpacity={0.35}
              strokeWidth={1}
              filter="url(#rev-service-glow)"
              radius={[0, 4, 4, 0]}
              barSize={26}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};
