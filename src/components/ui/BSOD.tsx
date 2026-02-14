"use client";

import { useState, useEffect } from "react";

export default function BSOD() {
  const [visible, setVisible] = useState(false);
  const [sequence, setSequence] = useState<string[]>([]);
  
  // A sequência sagrada: Cima, Cima, Baixo, Baixo, Esq, Dir, Esq, Dir, B, A
  const konamiCode = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", 
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", 
    "b", "a"
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Adiciona a tecla pressionada ao array
      const newSequence = [...sequence, e.key];
      
      // Mantém o array do mesmo tamanho do código para comparar
      if (newSequence.length > konamiCode.length) {
        newSequence.shift();
      }
      
      setSequence(newSequence);

      // Verifica se bateu com o código
      if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
        triggerBSOD();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sequence]);

  const triggerBSOD = () => {
    setVisible(true);
    // Toca um som de erro do Windows (opcional, mas hilário)
    // const audio = new Audio('/windows-error.mp3'); 
    // audio.play().catch(() => {}); 
  };

  if (!visible) return null;

  return (
    <div 
      className="fixed inset-0 z-[99999] bg-[#0000AA] text-white font-mono p-10 cursor-none select-none overflow-hidden"
      onClick={() => setVisible(false)} // Clica para sair (segredo)
    >
      <div className="max-w-4xl mx-auto mt-20">
        <p className="bg-[#AAAAAA] text-[#0000AA] inline-block px-2 mb-8 font-bold">Windows</p>
        
        <p className="text-xl mb-8">A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) + 00010E36. The current application will be terminated.</p>
        
        <ul className="list-none space-y-4 text-lg">
          <li>* Press any key to terminate the current application.</li>
          <li>* Press CTRL+ALT+DEL to restart your computer. You will lose any unsaved information in all applications.</li>
          <li>* Pressing the XGH button caused this error.</li>
        </ul>

        <p className="mt-12 text-center animate-pulse">Press any key to continue _</p>
        
        <div className="absolute bottom-10 left-10 text-sm opacity-50">
          XGH_KERNEL_PANIC_V1.0
        </div>
      </div>
    </div>
  );
}