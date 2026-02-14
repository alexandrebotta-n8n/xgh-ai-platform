"use client";

import { useState } from "react";

// Importando todas as seções
import HeroSection from "@/components/sections/HeroSection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import GeneratorSection from "@/components/sections/GeneratorSection";
import SquadsSection from "@/components/sections/SquadsSection";
import BlogSection from "@/components/sections/BlogSection";
import GlossarySection from "@/components/sections/GlossarySection";
import TermsSection from "@/components/sections/TermsSection";
import Footer from "@/components/layout/Footer"; // <--- IMPORTAR O NOVO FOOTER

export default function Home() {
  const [lang, setLang] = useState<"pt" | "en">("pt");

  return (
    <main className="min-h-screen relative overflow-x-hidden selection:bg-neon-purple selection:text-white">
      
      {/* Botão de Idioma */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        {["pt", "en"].map((l) => (
          <button
            key={l}
            onClick={() => setLang(l as "pt" | "en")}
            className={`px-3 py-1 text-[10px] font-bold border border-neon-green uppercase tracking-tighter transition-all font-mono backdrop-blur-md ${
              lang === l
                ? "bg-neon-green/90 text-black shadow-[0_0_15px_#39ff14]"
                : "text-neon-green bg-black/50 hover:bg-neon-green/20"
            }`}
          >
            {l === "pt" ? "🇧🇷 PT" : "🇺🇸 EN"}
          </button>
        ))}
      </div>

      <HeroSection lang={lang} />
      <ManifestoSection lang={lang} />
      <GeneratorSection lang={lang} />
      <SquadsSection lang={lang} />
      <BlogSection lang={lang} />
      <GlossarySection lang={lang} />
      <TermsSection lang={lang} />

      {/* USANDO O COMPONENTE FOOTER AQUI */}
      <Footer lang={lang} /> 

    </main>
  );
}