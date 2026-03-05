"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import MiniPlayer from "@/components/ui/MiniPlayer";
import { PlayerProvider } from "@/contexts/PlayerContext";

// Lazy-load sections below the fold
const GeneratorSection = dynamic(() => import("@/components/sections/GeneratorSection"), { ssr: false });
const SquadsSection = dynamic(() => import("@/components/sections/SquadsSection"), { ssr: false });
const BlogSection = dynamic(() => import("@/components/sections/BlogSection"), { ssr: false });
const GlossarySection = dynamic(() => import("@/components/sections/GlossarySection"), { ssr: false });
const TermsSection = dynamic(() => import("@/components/sections/TermsSection"), { ssr: false });

export default function Home() {
  const [lang, setLang] = useState<"pt" | "en">("pt");

  return (
    <PlayerProvider>
      <main id="main-content" className="min-h-screen relative overflow-x-hidden selection:bg-neon-purple selection:text-white">

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
        <MiniPlayer />

      </main>
    </PlayerProvider>
  );
}
