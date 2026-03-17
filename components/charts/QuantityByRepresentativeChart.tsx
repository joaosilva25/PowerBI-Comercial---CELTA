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
  groupOthers,
  toKeyValueData,
  tooltipContentStyle,
  tooltipItemStyle,
  tooltipLabelStyle,
  truncateLabel,
} from "@/components/charts/ChartCard";

interface QuantityByRepresentativeChartProps {
  data: Record<string, number>;
}

export const QuantityByRepresentativeChart: React.FC<
  QuantityByRepresentativeChartProps
> = ({ data }) => {
  const base = toKeyValueData(data);
  const chartData = groupOthers(base, 7);
  const total = chartData.reduce((acc, row) => acc + (Number(row.value) || 0), 0);

  return (
    <ChartCard title="Quantidade por Representante">
      {chartData.length === 0 ? (
        <EmptyChartState />
      ) : (
        <div className="relative h-full">
          <div className="absolute top-2 right-2 z-10 rounded-xl border border-border/60 bg-surface/60 backdrop-blur-xl px-3 py-2 shadow-[0_12px_30px_-18px_rgb(0_0_0_/_0.7)]">
            <div className="text-[10px] text-muted leading-none">Total</div>
            <div className="text-sm font-semibold tabular-nums text-foreground mt-1 leading-none">
              {total.toLocaleString("pt-BR")}
            </div>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 8, right: 24, left: 24, bottom: 8 }}
            >
              <NeonDefs id="qty-rep" />
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
                width={160}
                tickFormatter={(v) => truncateLabel(String(v), 18)}
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
                fill="url(#qty-rep-bar)"
                fillOpacity={0.9}
                stroke={chartTokens.accent2}
                strokeOpacity={0.25}
                strokeWidth={1}
                filter="url(#qty-rep-glow)"
                radius={[0, 6, 6, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartCard>
  );
};
