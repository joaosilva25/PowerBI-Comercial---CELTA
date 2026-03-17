'use client';

import React from 'react';
import { Calendar } from 'lucide-react';

export const DateFilter: React.FC = () => {
  return (
    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:border-blue-400 transition-colors cursor-pointer group">
      <Calendar className="w-4 h-4 text-gray-500 group-hover:text-blue-500" strokeWidth={1.3} />
      <select 
        className="bg-transparent text-sm text-gray-700 outline-none cursor-pointer group-hover:text-blue-600"
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
