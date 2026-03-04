"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const glitchMessages = {
  pt: [
    "ERRO 404: A PÁGINA FOI DEPLOYADA NA SEXTA E SUMIU.",
    "FALHA DE ALUCINAÇÃO: A IA JUROU QUE ESSA ROTA EXISTIA.",
    "PÁGINA NÃO ENCONTRADA. CULPE O ESTAGIÁRIO SINTÉTICO.",
    "404: O CÓDIGO SAIU PARA COMPRAR CIGARRO E NÃO VOLTOU.",
    "ROTA INEXISTENTE. TENTE UM PROMPT MAIS CRIATIVO.",
  ],
  en: [
    "ERROR 404: PAGE WAS DEPLOYED ON FRIDAY AND VANISHED.",
    "HALLUCINATION FAILURE: AI SWORE THIS ROUTE EXISTED.",
    "PAGE NOT FOUND. BLAME THE SYNTHETIC INTERN.",
    "404: THE CODE WENT OUT FOR CIGARETTES AND NEVER CAME BACK.",
    "ROUTE DOESN'T EXIST. TRY A MORE CREATIVE PROMPT.",
  ],
};

export default function NotFound() {
  const [message, setMessage] = useState("");
  const [glitch, setGlitch] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const msgs = glitchMessages.pt;
    setMessage(msgs[Math.floor(Math.random() * msgs.length)]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePanic = () => {
    setCounter((c) => c + 1);
    const msgs = glitchMessages.pt;
    setMessage(msgs[Math.floor(Math.random() * msgs.length)]);
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Scanlines */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />

      {/* Grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#39ff1408_1px,transparent_1px),linear-gradient(to_bottom,#39ff1408_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="relative z-20 text-center max-w-2xl">
        {/* 404 number */}
        <h1
          className={`text-[10rem] md:text-[14rem] font-bold leading-none tracking-tighter select-none transition-all duration-100 ${
            glitch
              ? "text-neon-purple skew-x-2 scale-[1.02]"
              : "text-neon-green"
          }`}
          style={{
            textShadow: glitch
              ? "-3px 0 #bc13fe, 3px 0 #39ff14, 0 0 40px rgba(188,19,254,0.5)"
              : "0 0 30px rgba(57,255,20,0.3), 0 0 60px rgba(57,255,20,0.1)",
          }}
        >
          404
        </h1>

        {/* Error message */}
        <div className="bg-black/80 border border-gray-800 rounded-lg p-6 mb-8 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-500 text-[10px] font-mono uppercase tracking-[0.3em]">
              SYSTEM_FAULT
            </span>
          </div>
          <p className="text-white font-mono text-sm md:text-base leading-relaxed">
            {message}
          </p>
        </div>

        {/* Panic counter */}
        {counter > 0 && (
          <p className="text-gray-600 text-[10px] font-mono mb-4 tracking-widest uppercase animate-in fade-in duration-300">
            Tentativas de pane: {counter} | Status: Piorando
          </p>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-neon-green text-black font-mono font-bold text-xs uppercase tracking-[0.3em] hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-all hover:scale-105"
          >
            Voltar ao Caos
          </Link>

          <button
            onClick={handlePanic}
            className="px-8 py-4 border border-red-900 text-red-500 font-mono font-bold text-xs uppercase tracking-[0.3em] hover:bg-red-900/20 hover:border-red-500 transition-all hover:scale-105"
          >
            Botao de Panico
          </button>
        </div>

        {/* XGH wisdom */}
        <p className="mt-12 text-gray-700 font-mono text-[10px] tracking-[0.2em] uppercase">
          &quot;Se a pagina nao existe, o bug tambem nao.&quot; — Axioma XGH
          #7
        </p>
      </div>
    </div>
  );
}
