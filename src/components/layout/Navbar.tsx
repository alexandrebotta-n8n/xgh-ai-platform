"use client";

import { useState, useEffect } from "react";

interface NavbarProps {
  lang: "pt" | "en";
  setLang: (lang: "pt" | "en") => void;
}

const navItems = [
  { id: "manifesto", pt: "Manifesto", en: "Manifesto" },
  { id: "gambiarra-machine", pt: "Debugger", en: "Debugger" },
  { id: "squads", pt: "Squads", en: "Squads" },
  { id: "blog-section", pt: "Blog", en: "Blog" },
  { id: "glossary", pt: "Glossário", en: "Glossary" },
  { id: "terms", pt: "Termos", en: "Terms" },
];

export default function Navbar({ lang, setLang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Scroll-spy: find active section based on scroll position
      // Works reliably with lazy-loaded (dynamic) sections
      const offset = window.innerHeight * 0.35;
      let current = "";
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= offset) {
            current = item.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-gray-800/50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo / Brand */}
        <button
          onClick={() => scrollTo("hero")}
          className="text-white font-bold text-lg tracking-tighter font-mono hover:text-neon-green transition-colors"
        >
          XGH<span className="text-neon-green">-AI</span>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest transition-all rounded ${
                activeSection === item.id
                  ? "text-neon-green bg-neon-green/10"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              {lang === "pt" ? item.pt : item.en}
            </button>
          ))}
        </div>

        {/* Right side: Language Toggle + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="flex gap-1">
            {(["pt", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 text-[9px] font-bold border uppercase tracking-tighter font-mono transition-all ${
                  lang === l
                    ? "bg-neon-green/90 text-black border-neon-green shadow-[0_0_10px_rgba(57,255,20,0.3)]"
                    : "text-neon-green border-neon-green/30 bg-black/50 hover:bg-neon-green/20"
                }`}
              >
                {l === "pt" ? "PT" : "EN"}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1 p-2"
            aria-label={lang === "pt" ? "Abrir menu" : "Open menu"}
          >
            <span className={`block w-4 h-[1.5px] bg-neon-green transition-all ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
            <span className={`block w-4 h-[1.5px] bg-neon-green transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-4 h-[1.5px] bg-neon-green transition-all ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-black/95 backdrop-blur-lg border-b border-gray-800/50 ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`text-left px-4 py-3 text-xs font-mono uppercase tracking-widest transition-all rounded ${
                activeSection === item.id
                  ? "text-neon-green bg-neon-green/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-neon-purple mr-2">//</span>
              {lang === "pt" ? item.pt : item.en}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
