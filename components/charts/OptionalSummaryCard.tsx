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
import { ChartCard } from "@/components/charts/ChartCard";

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
  const colors = ["#10b981", "#ef4444"];

  return (
    <ChartCard title={title}>
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="relative h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="58%"
                outerRadius="82%"
                paddingAngle={3}
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => Number(value) || 0}
                labelFormatter={(label) => String(label)}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="text-xs text-gray-500">Percentual</div>
            <div className="text-xl font-bold text-gray-900">
              {data.percentual}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 content-start">
          <div className="rounded-lg border border-gray-100 p-3">
            <div className="text-sm text-gray-500">Sim</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {data.sim}
            </div>
          </div>
          <div className="rounded-lg border border-gray-100 p-3">
            <div className="text-sm text-gray-500">Não</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {data.nao}
            </div>
          </div>
          <div className="rounded-lg border border-gray-100 p-3">
            <div className="text-sm text-gray-500">Total</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {data.total}
            </div>
          </div>
        </div>
      </div>
    </ChartCard>
  );
};
