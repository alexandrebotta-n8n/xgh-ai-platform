"use client";

interface FooterProps {
  lang: "pt" | "en";
}

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="py-12 border-t border-neon-green/20 bg-black text-center relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Link Social X (Twitter) */}
        <div className="mb-8">
          <a 
            href="https://x.com/xgh_ai" // <-- TROQUE PELO SEU LINK REAL
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white border border-gray-700 hover:bg-black hover:border-neon-green hover:text-neon-green hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] transition-all duration-300 transform hover:scale-110"
          >
            {/* Ícone do X (SVG Manual para não depender de lib externa) */}
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </a>
          <p className="mt-2 text-xs text-gray-600 font-mono">
            {lang === "pt" ? "Siga o Caos" : "Follow the Chaos"}
          </p>
        </div>

        {/* Copyright */}
        <p className="text-gray-600 text-sm font-mono">
          &copy; 2026 XGH-AI Platform. {lang === "pt" ? "Feito com pressa e ódio." : "Made in a hurry with hate."}
        </p>
        
        <p className="text-[10px] mt-4 text-gray-800 font-mono">
          v1.0.0-Release-Candidate-Final-Agora-Vai
        </p>
      </div>
      
      {/* Efeito de Fundo do Footer */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
    </footer>
  );
}