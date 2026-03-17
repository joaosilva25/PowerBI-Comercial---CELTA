import React from "react";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div className="bg-surface/60 backdrop-blur-xl p-7 rounded-2xl border border-border/60 flex flex-col justify-between h-full shadow-[0_12px_30px_-18px_rgb(0_0_0_/_0.7)]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-muted text-sm font-medium">{title}</h3>
          <p className="text-3xl font-semibold tracking-tight mt-1">
            {value}
          </p>
        </div>
        {Icon && (
          <div className="p-2.5 rounded-xl bg-[linear-gradient(135deg,rgb(59_130_246_/_0.22),rgb(34_211_238_/_0.10))] border border-border/60">
            <Icon className="w-6 h-6 text-accent" strokeWidth={1.3} />
          </div>
        )}
      </div>
    </div>
  );
};
