"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import GlitchText from "@/components/ui/GlitchText";
import CyberPlayer from "@/components/ui/CyberPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWaveSquare } from "@fortawesome/free-solid-svg-icons";
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
    const handlePlayerState = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail.playing !== 'undefined') {
        setIsSystemPlaying(detail.playing);
      } else {
        setIsSystemPlaying(true);
      }
    };

    const handleForcePlay = () => setIsSystemPlaying(true);

    window.addEventListener('xgh-player-state', handlePlayerState);
    window.addEventListener('xgh-force-play', handleForcePlay);

    return () => {
      window.removeEventListener('xgh-player-state', handlePlayerState);
      window.removeEventListener('xgh-force-play', handleForcePlay);
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
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden pt-20 pb-32">

      {/* Logotipo */}
      <div 
        className="absolute top-[4.5rem] left-4 md:top-[5rem] md:left-6 z-40 w-14 h-14 md:w-28 md:h-28 rounded-full border border-neon-green/30 bg-black/50 backdrop-blur-sm shadow-[0_0_20px_rgba(57,255,20,0.1)] flex items-center justify-center cursor-pointer transition-all duration-700 hover:rotate-[360deg] hover:scale-110 hover:border-neon-green group p-1"
        role="button"
        tabIndex={0}
        aria-label={t("Checar integridade do sistema", "Check system integrity")}
        onClick={showCyberMessage}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') showCyberMessage(); }}
        title={t("Clique para checar a integridade do sistema", "Click to check system integrity")}
      >
        <Image
          src="/logo.webp"
          alt="XGH-AI Logo - eXtreme Go Horse Process"
          width={112}
          height={112}
          priority
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
            { label: "Bugs/Min", val: "∞", color: "text-neon-purple", size: "text-3xl" },
            { label: "Uptime", val: "42%", color: "text-white", size: "text-3xl" },
            { label: t("Cafés", "Coffees"), val: "9000+", color: "text-white", size: "text-3xl" },
            { label: "Deploys", val: t("Sexta-feira", "Fridays"), color: "text-red-500", size: "text-lg md:text-2xl" }
          ].map((stat, i) => (
            <div key={i} className="p-4 rounded bg-gray-900/20 border border-gray-800/50 hover:border-neon-green/30 transition-all hover:bg-gray-900/40 group text-center flex flex-col justify-center">
              <div className={`${stat.size} font-bold font-mono mb-1 ${stat.color} group-hover:scale-110 transition-transform`}>{stat.val}</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* --- CONSOLE DE ÁUDIO UNIFICADO (RACK STYLE) --- */}
        <div className="mt-12 w-full max-w-md flex flex-col relative group animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          
          {/* Glow de fundo do Rack */}
          <div className={`absolute -inset-x-2 -inset-y-1 bg-gradient-to-r from-neon-green/40 to-neon-purple/40 blur-xl transition-all duration-1000 
            opacity-30 group-hover:opacity-50 ${isSystemPlaying ? 'opacity-80 animate-pulse' : ''}`}>
          </div>

          {/* Container do Rack */}
          <div className="relative flex flex-col w-full bg-black rounded-lg overflow-hidden border border-gray-800/50 shadow-2xl">
            <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-gray-800 z-50"></div>
            <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-gray-800 z-50"></div>

            {/* Parte 1: O Player (Fita) */}
            <div className="z-20">
              <CyberPlayer />
            </div>
            
            {/* Parte 2: A Playlist */}
            <div className="z-10 mt-[-1px] bg-black/90">
              <DiscographySection lang={lang} />
            </div>

            {/* ================================================================= */}
            {/* 🤖 R2-D2: Crédito SUNO AI adicionado ao final do Rack 🤖 */}
            {/* ================================================================= */}
            <div className="z-10 border-t border-gray-900/80 bg-black/95 p-2 pr-4 flex justify-center items-center gap-2">
                {/* Link para Suno (Opcional, se quiser linkar) */}
                <a 
                    href="https://suno.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-all group/suno"
                    title="Audio generated by SUNO AI"
                >
                    <div className="relative">
                        <FontAwesomeIcon icon={faWaveSquare} className="text-gray-500 group-hover/suno:text-neon-purple text-[10px] transition-colors" />
                    </div>
                    <span className="font-bold text-gray-400 group-hover/suno:text-white tracking-widest text-[10px] transition-colors">
                        SUNO
                    </span>
                </a>
            </div>
            {/* ================================================================= */}

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