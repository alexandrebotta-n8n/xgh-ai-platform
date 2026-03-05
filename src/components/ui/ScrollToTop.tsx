"use client";

import { useState, useEffect } from "react";
import { useSFX } from "@/hooks/useSFX";

export default function ScrollToTop() {
  const { beep } = useSFX();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    beep();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      className={`fixed bottom-8 right-8 z-40 w-10 h-10 rounded border border-neon-green/50 bg-black/80 backdrop-blur-sm text-neon-green flex items-center justify-center transition-all duration-300 hover:bg-neon-green hover:text-black hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
