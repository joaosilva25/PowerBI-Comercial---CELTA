"use client";

import React from "react";
import {
  ChartCard,
  EmptyChartState,
  toKeyValueData,
  truncateLabel,
} from "@/components/charts/ChartCard";

interface QuantityByClientChartProps {
  data: Record<string, number>;
}

export const QuantityByClientChart: React.FC<QuantityByClientChartProps> = ({
  data,
}) => {
  const chartData = toKeyValueData(data, 12);
  const maxValue = chartData[0]?.value ?? 0;

  return (
    <ChartCard title="Quantidade por Cliente (Top 12)">
      {chartData.length === 0 ? (
        <EmptyChartState />
      ) : (
        <div className="thin-scrollbar h-full overflow-auto rounded-xl border border-border/60 bg-surface-2/20">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-surface/85 backdrop-blur-xl border-b border-border/60">
              <tr>
                <th className="text-left font-semibold text-muted px-4 py-3 w-12">
                  #
                </th>
                <th className="text-left font-semibold text-muted px-4 py-3">
                  Cliente
                </th>
                <th className="text-right font-semibold text-muted px-4 py-3 w-28">
                  Qtde
                </th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((row, index) => {
                const pct =
                  maxValue > 0 ? Math.max(0, Math.min(1, row.value / maxValue)) : 0;

                return (
                  <tr
                    key={row.name}
                    className="border-b border-border/40 hover:bg-surface-2/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-muted-2 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="min-w-0">
                        <div className="text-foreground font-medium truncate">
                          {truncateLabel(String(row.name), 34)}
                        </div>
                        <div className="mt-2 h-1.5 rounded-full bg-border/30 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[linear-gradient(90deg,rgb(34_211_238),rgb(59_130_246))]"
                            style={{ width: `${pct * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-foreground font-medium">
                      {row.value}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </ChartCard>
  );
};
