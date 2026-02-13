"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; // Novo
import HeroSection from "@/components/sections/HeroSection";
import GeneratorSection from "@/components/sections/GeneratorSection";
import SquadsSection from "@/components/sections/SquadsSection";
import BlogSection from "@/components/sections/BlogSection";
import GlossarySection from "@/components/sections/GlossarySection";
import TermsSection from "@/components/sections/TermsSection"; // Novo

export default function Home() {
  const [lang, setLang] = useState<"pt" | "en">("pt");

  return (
    <main className="min-h-screen bg-dark-bg text-white selection:bg-neon-green selection:text-black">
      <Header lang={lang} setLang={setLang} />
      
      <div className="container mx-auto px-4 max-w-5xl">
        <HeroSection lang={lang} />
      </div>

      <GeneratorSection lang={lang} />

      <SquadsSection lang={lang} />

      <BlogSection lang={lang} />

      <GlossarySection lang={lang} />

      {/* Seção de Termos antes do Footer */}
      <TermsSection lang={lang} />
      
      <Footer lang={lang} />
    </main>
  );
}