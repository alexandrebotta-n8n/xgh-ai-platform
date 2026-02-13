"use client";

import { useState } from "react";

interface HeaderProps {
  lang: "pt" | "en";
  setLang: (lang: "pt" | "en") => void;
}

export default function Header({ lang, setLang }: HeaderProps) {
  // Função de tradução rápida
  const t = (pt: string, en: string) => (lang === "pt" ? pt : en);

  // --- NOVA LÓGICA DE NOTIFICAÇÃO (Substituindo o Alert) ---
  const showCyberMessage = () => {
    // Remove toast anterior se existir (evita empilhamento infinito no estilo XGH)
    const existingToast = document.getElementById("xgh-toast");
    if (existingToast) existingToast.remove();

    const toast = document.createElement("div");
    toast.id = "xgh-toast";
    toast.className = `
      fixed bottom-8 right-8 z-[9999] 
      bg-black border-l-4 border-neon-purple p-5 
      shadow-[0_0_30px_rgba(188,19,254,0.3)] 
      font-mono animate-in slide-in-from-right-10 fade-in duration-500
    `;
    
    toast.innerHTML = `
      <div class="flex items-center gap-4">
        <div class="w-2 h-2 bg-neon-purple animate-ping rounded-full"></div>
        <div>
          <p class="text-neon-purple font-bold text-[10px] uppercase tracking-[0.3em]">Kernel Message</p>
          <p class="text-gray-300 text-sm mt-1">
            ${t(
              "Ambiente operando sob regime de Gambiarra Máxima. Não toque em nada.",
              "System operating under Maximum Kludge regime. Do not touch anything."
            )}
          </p>
        </div>
      </div>
    `;

    document.body.appendChild(toast);

    // Fade out e remoção
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.5s ease";
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  };

  const scrollToGenerator = () => {
    document.getElementById('gambiarra-machine')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative text-center py-20 md:py-32 border-b-2 border-neon-green bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-dark-bg to-black overflow-hidden">
      
      {/* --- LOGO FLUTUANTE COM AÇÃO DE TOAST --- */}
      <div 
        className="absolute top-10 left-10 w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-neon-green shadow-[0_0_20px_#39ff14] flex items-center justify-center cursor-pointer transition-all duration-500 hover:rotate-180 hover:scale-110 z-50 overflow-hidden bg-black p-1"
        onClick={showCyberMessage}
      >
        <img 
          src="/logo.png" 
          alt="XGH Logo" 
          className="w-full h-full object-contain" 
        />
      </div>

      {/* --- SELETOR DE IDIOMA --- */}
      <div className="absolute top-6 right-6 z-50 flex gap-3">
        {["pt", "en"].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l as "pt" | "en")}
            className={`px-4 py-1 text-[10px] font-bold border border-neon-green uppercase tracking-tighter transition-all font-mono ${
              lang === l
                ? "bg-neon-green text-black shadow-[0_0_15px_#39ff14]"
                : "text-neon-green hover:bg-neon-green/10"
            }`}
          >
            {l === "pt" ? "🇧🇷 PT" : "🇺🇸 EN"}
          </button>
        ))}
      </div>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className="container mx-auto px-4 relative z-10 pt-12 md:pt-0">
        
        {/* Título Upgraded com Animação CSS nativa */}
        <h1 className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-emerald-400 to-neon-green bg-[length:200%_auto] animate-gradient tracking-tighter drop-shadow-[0_0_15px_rgba(57,255,20,0.4)] cursor-default select-none font-mono">
          XGH-AI
        </h1>
        
        <p className="mt-8 text-xl md:text-3xl text-gray-300 font-light max-w-3xl mx-auto leading-tight tracking-tight">
          {t("Onde a Inteligência Artificial encontra o Caos Escalável.", "Where Artificial Intelligence meets Scalable Chaos.")}
        </p>

        <p className="mt-4 text-xs md:text-sm text-gray-600 italic font-mono uppercase tracking-[0.2em] opacity-80">
          {t("\"Se o robô faz a gambiarra, não é erro, é feature.\"", "\"If the robot builds the workaround, it's not a bug, it's a feature.\"")}
        </p>

        {/* Botão CTA Harmônico */}
        <div className="mt-14">
          <button
            onClick={scrollToGenerator}
            className="group relative px-10 py-5 bg-transparent border-2 border-neon-purple text-neon-purple font-bold text-sm md:text-base transition-all hover:bg-neon-purple hover:text-white hover:shadow-[0_0_30px_#bc13fe] active:scale-95 uppercase tracking-[0.3em] font-mono"
          >
            <span className="relative z-10">
              {t("GERAR GAMBIARRA AGORA", "GENERATE WORKAROUND NOW")}
            </span>
            {/* Detalhes Estéticos */}
            <div className="absolute -top-[2px] -right-[2px] w-3 h-3 border-t-2 border-r-2 border-neon-purple group-hover:border-white"></div>
            <div className="absolute -bottom-[2px] -left-[2px] w-3 h-3 border-b-2 border-l-2 border-neon-purple group-hover:border-white"></div>
          </button>
        </div>
      </div>

      {/* Efeito de Scanline e Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-0 pointer-events-none bg-[length:100%_4px]"></div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </header>
  );
}