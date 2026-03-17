"use client";

import React from "react";
import { ApiOpcionalResumo } from "@/types";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  ChartCard,
  chartTokens,
  NeonDefs,
  tooltipContentStyle,
  tooltipItemStyle,
  tooltipLabelStyle,
} from "@/components/charts/ChartCard";

interface OptionalSummaryCardProps {
  title: string;
  data: ApiOpcionalResumo;
}

export const OptionalSummaryCard: React.FC<OptionalSummaryCardProps> = ({
  title,
  data,
}) => {
  const chartData = [
    { name: "Sim", value: Number(data.sim) || 0 },
    { name: "Não", value: Number(data.nao) || 0 },
  ];
  const colors = [chartTokens.accent, "rgb(148 163 184 / 0.55)"];

  return (
    <ChartCard title={title}>
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="relative h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <NeonDefs id="opt-sum" />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="58%"
                outerRadius="82%"
                paddingAngle={3}
                stroke={chartTokens.surface}
                strokeWidth={1}
                filter="url(#opt-sum-glow)"
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
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-xs text-muted">Percentual</div>
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              {data.percentual}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 content-start">
          <div className="rounded-xl border border-border/60 bg-surface-2/20 p-4">
            <div className="text-sm text-muted">Sim</div>
            <div className="text-2xl font-semibold tracking-tight text-foreground mt-1">
              {data.sim}
            </div>
          </div>
          <div className="rounded-xl border border-border/60 bg-surface-2/20 p-4">
            <div className="text-sm text-muted">Não</div>
            <div className="text-2xl font-semibold tracking-tight text-foreground mt-1">
              {data.nao}
            </div>
          </div>
          <div className="rounded-xl border border-border/60 bg-surface-2/20 p-4">
            <div className="text-sm text-muted">Total</div>
            <div className="text-2xl font-semibold tracking-tight text-foreground mt-1">
              {data.total}
            </div>
          </div>
        </div>
      </div>
    </ChartCard>
  );
};
