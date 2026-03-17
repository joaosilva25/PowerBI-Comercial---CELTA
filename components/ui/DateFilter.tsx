'use client';

import React from 'react';
import { Calendar } from 'lucide-react';

export const DateFilter: React.FC = () => {
  return (
    <div className="flex items-center gap-2 bg-surface/60 border border-border/60 rounded-xl px-4 py-2 hover:bg-surface-2/40 transition-colors cursor-pointer group">
      <Calendar
        className="w-4 h-4 text-muted group-hover:text-accent"
        strokeWidth={1.3}
      />
      <select 
        className="bg-transparent text-sm text-foreground outline-none cursor-pointer"
        defaultValue="this-month"
      >
        <option value="today">Hoje</option>
        <option value="this-week">Esta Semana</option>
        <option value="this-month">Este Mês</option>
        <option value="last-month">Mês Passado</option>
        <option value="this-year">Este Ano</option>
      </select>
    </div>
  );
};
