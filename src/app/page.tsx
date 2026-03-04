"use client";

import { useState } from "react";

import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import GeneratorSection from "@/components/sections/GeneratorSection";
import SquadsSection from "@/components/sections/SquadsSection";
import BlogSection from "@/components/sections/BlogSection";
import GlossarySection from "@/components/sections/GlossarySection";
import TermsSection from "@/components/sections/TermsSection";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function Home() {
  const [lang, setLang] = useState<"pt" | "en">("pt");

  return (
    <main className="min-h-screen relative overflow-x-hidden selection:bg-neon-purple selection:text-white">

      <Navbar lang={lang} setLang={setLang} />

      <HeroSection lang={lang} />
      <ManifestoSection lang={lang} />
      <GeneratorSection lang={lang} />
      <SquadsSection lang={lang} />
      <BlogSection lang={lang} />
      <GlossarySection lang={lang} />
      <TermsSection lang={lang} />

      <Footer lang={lang} />
      <ScrollToTop />

    </main>
  );
}
