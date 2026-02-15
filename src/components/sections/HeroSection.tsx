"use client";

import { useState, useEffect, Suspense } from "react";
import GlitchText from "@/components/ui/GlitchText";
import CyberPlayer from "@/components/ui/CyberPlayer";
import DiscographySection from "@/components/sections/DiscographySection";
import { useSearchParams } from "next/navigation";

interface HeroProps {
  lang: "pt" | "en";
}

function HeroContent({ lang }: HeroProps) {
  const searchParams = useSearchParams();
  const t = (pt: string, en: string) => (lang === "pt" ? pt : en);
  
  const [isSystemPlaying, setIsSystemPlaying] = useState(false);

  useEffect(() => {
    const handlePlayerState = (e: any) => {
      if (e.detail && typeof e.detail.playing !== 'undefined') {
        setIsSystemPlaying(e.detail.playing);
      } else {
        setIsSystemPlaying(true);
      }
    };

    window.addEventListener('xgh-player-state', handlePlayerState);
    window.addEventListener('xgh-force-play', () => setIsSystemPlaying(true));
    
    return () => {
      window.removeEventListener('xgh-player-state', handlePlayerState);
      window.removeEventListener('xgh-force-play', () => setIsSystemPlaying(true));
    };
  }, []);

  const showCyberMessage = () => {
    const existingToast = document.getElementById("xgh-toast");
    if (existingToast) existingToast.remove();

    const toast = document.createElement("div");
    toast.id = "xgh-toast";
    toast.className = `
      fixed bottom-8 left-8 z-[9999] 
      bg-black/90 border-l-4 border-neon-green p-5 
      shadow-[0_0_30px_rgba(57,255,20,0.2)] backdrop-blur-md
      font-mono animate-in slide-in-from-left-10 fade-in duration-300
      max-w-sm
    `;
    
    toast.innerHTML = `
      <div class="flex items-start gap-4">
        <div class="mt-1 w-2 h-2 bg-neon-green animate-ping rounded-full shrink-0"></div>
        <div>
          <p class="text-neon-green font-bold text-[10px] uppercase tracking-[0.2em] mb-1">XGH_KERNEL_MSG</p>
          <p class="text-white text-xs leading-relaxed">
            ${t(
              "Atenção: A estabilidade deste sistema é uma ilusão coletiva. Não respire perto do servidor.",
              "Warning: This system's stability is a collective illusion. Do not breathe near the server."
            )}
          </p>
        </div>
      </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.5s ease";
      setTimeout(() => toast.remove(), 500);
    }, 5000);
  };

  return (
    /* pb-32 adicionado para criar o espaço entre a discografia e o final da seção */
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden pt-20 pb-32">
      
      {/* Logotipo */}
      <div 
        className="absolute top-4 left-4 md:top-6 md:left-6 z-50 w-14 h-14 md:w-32 md:h-32 rounded-full border border-neon-green/30 bg-black/50 backdrop-blur-sm shadow-[0_0_20px_rgba(57,255,20,0.1)] flex items-center justify-center cursor-pointer transition-all duration-700 hover:rotate-[360deg] hover:scale-110 hover:border-neon-green group p-1"
        onClick={showCyberMessage}
        title={t("Clique para checar a integridade do sistema", "Click to check system integrity")}
      >
        <img 
          src="/logo.png" 
          alt="XGH Logo" 
          className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]" 
        />
      </div>

      <div className="container mx-auto px-4 z-10 space-y-8 flex flex-col items-center">
        
        {/* Badge de Status */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-green/30 bg-neon-green/5 backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
          </span>
          <span className="text-neon-green text-[10px] font-mono tracking-widest uppercase">
            {lang === "pt" ? "Sistema Operacional v1.0" : "System Operational v1.0"}
          </span>
        </div>

        {/* Título Principal */}
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white drop-shadow-[0_0_30px_rgba(57,255,20,0.1)]">
          <GlitchText text="XGH-AI" as="span" />
        </h1>

        <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed px-4 text-balance">
          {lang === "pt" 
            ? "A metodologia Go Horse elevada à potência da Inteligência Artificial."
            : "The Go Horse methodology raised to the power of Artificial Intelligence."}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-12 pt-8 border-t border-gray-800/50">
          {[
            { label: "Bugs/Min", val: "∞", color: "text-neon-purple" },
            { label: "Uptime", val: "42%", color: "text-white" },
            { label: "Coffees", val: "9000+", color: "text-white" },
            { label: "Deploys", val: "Fridays", color: "text-red-500" }
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded bg-gray-900/20 border border-gray-800/50 hover:border-neon-green/30 transition-all hover:bg-gray-900/40 group text-center">
              <div className={`text-3xl font-bold font-mono mb-1 ${stat.color} group-hover:scale-110 transition-transform`}>{stat.val}</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* --- CONSOLE DE ÁUDIO UNIFICADO (RACK STYLE) --- */}
        <div className="mt-12 w-full max-w-md flex flex-col relative group animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          
          <div className={`absolute -inset-x-2 -inset-y-1 bg-gradient-to-r from-neon-green/40 to-neon-purple/40 blur-xl transition-all duration-1000 
            opacity-30 group-hover:opacity-50 ${isSystemPlaying ? 'opacity-80 animate-pulse' : ''}`}>
          </div>

          <div className="relative flex flex-col w-full bg-black rounded-lg overflow-hidden border border-gray-800/50 shadow-2xl">
            <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-gray-800 z-50"></div>
            <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-gray-800 z-50"></div>

            <div className="z-20">
              <CyberPlayer />
            </div>
            
            <div className="z-10 mt-[-1px]">
              <DiscographySection lang={lang} />
            </div>

            <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-gray-800 z-50"></div>
            <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-gray-800 z-50"></div>
          </div>
        </div>

      </div>

      {/* Degradê inferior */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none"></div>
    </section>
  );
}

export default function HeroSection(props: HeroProps) {
  return (
    <Suspense fallback={null}>
      <HeroContent {...props} />
    </Suspense>
  );
}