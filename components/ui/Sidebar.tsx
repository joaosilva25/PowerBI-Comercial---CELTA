import React from "react";
import Image from "next/image";
import { FileText, LayoutDashboard, LogOut, Sparkles } from "lucide-react";

export const Sidebar: React.FC = () => {
  return (
    <div className="w-76 bg-surface/70 backdrop-blur-xl h-screen fixed left-0 top-0 border-r border-border/60 flex flex-col hidden md:flex shadow-[0_20px_60px_-40px_rgb(0_0_0_/_0.8)]">
      <div className="p-9 flex justify-center">
        <Image
          src="/Logo1.png"
          alt="PowerDash Logo"
          width={180}
          height={60}
          className="object-contain h-10 w-auto opacity-90"
          priority
        />
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <a
          href="#"
          className="group flex items-center gap-3 px-4 py-3 rounded-xl font-medium border border-border/60 bg-surface-2/50 text-foreground shadow-[0_12px_30px_-18px_rgb(0_0_0_/_0.7)]"
        >
          <div className="h-9 w-9 rounded-lg bg-[linear-gradient(135deg,rgb(59_130_246_/_0.22),rgb(34_211_238_/_0.12))] border border-border/60 flex items-center justify-center">
            <LayoutDashboard
              className="w-5 h-5 text-accent"
              strokeWidth={1.3}
            />
          </div>
          Dashboard
        </a>
      </nav>

      <div className="px-4 pb-4">
        <div
          className="relative overflow-hidden rounded-2xl min-h-[300px]"
          style={{
            backgroundImage: "url(/Cely.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/80" />

          <div className="relative p-5 min-h-[300px] flex flex-col items-center justify-center text-center">
            <div className="h-10 w-10 rounded-2xl bg-[linear-gradient(135deg,rgb(59_130_246_/_0.35),rgb(34_211_238_/_0.18))] border border-border/60 flex items-center justify-center shadow-[0_18px_50px_-36px_rgb(0_0_0_/_0.9)]">
              <Sparkles className="h-5 w-5 text-foreground" strokeWidth={1.3} />
            </div>

            <div className="mt-4">
              <div className="text-base font-semibold text-foreground">
                Insights e automações
              </div>
              <div className="text-xs text-muted mt-1">
                Visual moderno, rápido e com IA.
              </div>
            </div>

            <button className="mt-5 h-10 w-full rounded-xl bg-surface/65 hover:bg-surface/80 text-foreground border border-border/60 text-sm font-semibold transition-colors flex items-center justify-center gap-2">
              <FileText className="h-4 w-4" strokeWidth={1.6} />
              Gerar Relatório
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border/60">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 text-muted hover:text-foreground hover:bg-surface-2/40 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" strokeWidth={1.3} />
          Sair
        </a>
      </div>
    </div>
  );
};
