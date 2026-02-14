"use client";

interface FooterProps {
  lang: "pt" | "en";
}

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="bg-black border-t border-gray-900 py-12 relative overflow-hidden z-10">
      
      {/* Linha de brilho no topo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-50"></div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        
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
            href="https://x.com/xgh_ai"  /* <--- COLOQUE SEU LINK AQUI */
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

      <div className="mt-10 pt-6 border-t border-gray-900/50 text-center">
        <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
          XGH-AI © 2026. {lang === "pt" ? "Desenvolvido com ódio e café." : "Developed with hate and coffee."}
        </p>
      </div>
    </footer>
  );
}