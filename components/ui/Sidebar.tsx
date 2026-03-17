import React from "react";
import Image from "next/image";
import { LayoutDashboard, LogOut } from "lucide-react";

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 border-r border-gray-200 flex flex-col hidden md:flex">
      <div className="p-10 flex justify-center">
        <Image
          src="/Logo.png"
          alt="PowerDash Logo"
          width={180}
          height={60}
          className="object-contain h-12 w-auto"
          priority
        />
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium"
        >
          <LayoutDashboard className="w-5 h-5" strokeWidth={1.3} />
          Dashboard
        </a>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" strokeWidth={1.3} />
          Sair
        </a>
      </div>
    </div>
  );
};
