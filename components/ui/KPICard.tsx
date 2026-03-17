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
    <div className="bg-white p-9 rounded-xl border border-gray-100 flex flex-col justify-between h-full shadow-xs">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        {Icon && (
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" strokeWidth={1.3} />
          </div>
        )}
      </div>
    </div>
  );
};
