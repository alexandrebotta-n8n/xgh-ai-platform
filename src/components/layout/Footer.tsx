"use client";

interface FooterProps {
  lang: "pt" | "en";
}

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="bg-black border-t border-gray-900 py-12 relative overflow-hidden z-10">
      
      {/* Linha de brilho no topo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-50"></div>

      {/* Grid de Fundo Sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        
        {/* Texto da Esquerda */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white mb-2 tracking-tighter">
            XGH<span className="text-neon-green">-AI</span>
          </h3>
          <p className="text-gray-500 text-xs font-mono max-w-xs">
            {lang === "pt" 
              ? "Automatizando o caos e escalando a gambiarra desde 2026." 
              : "Automating chaos and scaling kludges since 2026."}
          </p>
        </div>

        {/* Ícones da Direita */}
        <div className="flex items-center gap-6">
          
          {/* Link do X (Twitter) */}
          <a 
            href="https://x.com/xgh_ai"  /* <--- SEU LINK AQUI */
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-10 h-10 rounded-full border border-gray-800 bg-gray-900/50 text-gray-400 transition-all hover:border-neon-green hover:text-neon-green hover:shadow-[0_0_15px_rgba(57,255,20,0.3)]"
            title="Siga no X"
          >
            {/* Ícone do X */}
            <i className="fa-brands fa-twitter text-lg transition-transform group-hover:rotate-12"></i>
          </a>

        </div>
      </div>

      {/* ================================================================= */}
      {/* 🤖 POWERED BY SECTION: Gemini & Anthropic 🤖 */}
      {/* ================================================================= */}
      <div className="mt-12 pt-8 pb-4 border-t border-gray-900/50 flex flex-col items-center gap-4 relative z-10">
        <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
          {lang === "pt" ? "Motores de Inteligência:" : "Intelligence Engines:"}
        </p>

        <div className="flex flex-wrap justify-center gap-8 items-center">
            
            {/* --- Google Gemini --- */}
            <a href="https://deepmind.google/technologies/gemini/" target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-2 group opacity-60 hover:opacity-100 transition-all">
                {/* Ícone simulando o brilho do Gemini */}
                <i className="fa-solid fa-wand-magic-sparkles text-blue-400 group-hover:text-purple-400 transition-colors"></i>
                <span className="text-gray-400 font-bold tracking-tight text-xs group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all">
                    Google Gemini
                </span>
            </a>

            <div className="h-3 w-[1px] bg-gray-800 hidden md:block"></div>

            {/* --- Anthropic --- */}
            <a href="https://www.anthropic.com/" target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-2 group opacity-60 hover:opacity-100 transition-all">
                {/* Ícone simulando o cérebro/Claude */}
                <i className="fa-solid fa-brain text-orange-400/80 group-hover:text-orange-400 transition-colors"></i>
                <span className="text-gray-400 font-bold tracking-tight text-xs group-hover:text-white transition-all">
                    Anthropic
                </span>
            </a>
        </div>
      </div>
      {/* ================================================================= */}

      <div className="mt-6 text-center relative z-10">
        <p className="text-[10px] text-gray-700 font-mono uppercase tracking-widest">
          XGH-AI © 2026. {lang === "pt" ? "Desenvolvido com ódio e café." : "Developed with hate and coffee."}
        </p>
      </div>
    </footer>
  );
}