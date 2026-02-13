"use client";

import { useState, useEffect } from "react";

interface GeneratorProps {
  lang: "pt" | "en";
}

const gambiarrasDB = {
  pt: [
    "Dívida técnica não é dívida se você não pretende pagar. Sobe pra prod.",
    "O código está ilegível? Ótimo. Isso se chama estabilidade de emprego.",
    "Remova o tratamento de erro. No XGH, o erro é uma escolha filosófica do sistema.",
    "A alucinação da IA é apenas uma visão alternativa da realidade. Aceite o PR.",
    "Não refatore. O que você chama de 'código espaguete', eu chamo de 'arquitetura orgânica'.",
    "Se o cliente reclamar da lentidão, diga que é um algoritmo de prova de trabalho (Proof of Work).",
    "Trate o NullPointerException com um 'reze()'. Se não funcionar, o problema é espiritual.",
    "Documentação é como uma carta de amor para o seu 'eu' do futuro: perda de tempo, ele já te odeia.",
    "A indentação está errada? O compilador não lê espaços, por que você deveria ler?",
    "Envolva o sistema inteiro num try-catch genérico e redirecione o erro para o RH.",
    "Otimização precoce é a raiz de todo mal. Otimização tardia é falta de verba. Deixe como está.",
    "Sua cobertura de testes é 0%? Parabéns, você eliminou 100% dos falsos-positivos.",
    "Diga que o bug é uma 'interface experimental de usuário baseada em entropia'.",
    "O servidor caiu? Não. Ele está apenas em um período sabático de processamento.",
    "Se o código gerado pela IA tem 2.000 linhas para somar dois números, respeite a verbosidade robótica."
  ],
  en: [
    "Technical debt is only a debt if you plan to pay it. Push to prod now.",
    "Code is unreadable? Good. That's called 'Job Security'.",
    "Remove error handling. In XGH, errors are a philosophical choice made by the system.",
    "AI hallucination is just an alternative view of reality. Approve the PR.",
    "Don't refactor. What you call 'spaghetti code', I call 'organic architecture'.",
    "If the client complains about lag, tell them it's a 'Proof of Work' consensus algorithm.",
    "Handle the NullPointerException with a 'pray()'. If it fails, the issue is spiritual.",
    "Documentation is like a love letter to your future self: a waste of time, he already hates you.",
    "Indentation is wrong? The compiler doesn't read spaces, why should you?",
    "Wrap the entire system in a generic try-catch and redirect all errors to HR.",
    "Early optimization is the root of all evil. Late optimization is lack of budget. Leave it.",
    "0% test coverage? Congratulations, you've eliminated 100% of false positives.",
    "Tell them the bug is an 'experimental entropy-based user interface'.",
    "The server didn't crash. It's just on a processing sabbatical.",
    "If the AI code takes 2,000 lines to sum two numbers, respect the robotic verbosity."
  ]
};

export default function GeneratorSection({ lang }: GeneratorProps) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const gerarCaos = () => {
    setLoading(true);
    setOutput("");

    setTimeout(() => {
      const lista = lang === "pt" ? gambiarrasDB.pt : gambiarrasDB.en;
      const aleatorio = lista[Math.floor(Math.random() * lista.length)];
      setOutput(aleatorio);
      setLoading(false);
    }, 1000);
  };

  return (
    <section id="gambiarra-machine" className="py-24 bg-black text-center relative overflow-hidden border-t border-gray-900">
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter">
          <span className="text-neon-purple uppercase italic">XGH</span> Debugger
        </h2>
        <p className="text-gray-500 font-mono text-[10px] mb-10 uppercase tracking-[0.4em]">
          {lang === "pt" ? "SISTEMA DE SUPORTE À DECISÃO QUESTIONÁVEL" : "QUESTIONABLE DECISION SUPPORT SYSTEM"}
        </p>

        <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 shadow-[0_20px_60px_rgba(0,0,0,1)] flex flex-col relative overflow-hidden group">
          <div className="flex items-center gap-2 px-5 py-4 bg-[#111] border-b border-gray-800 relative z-10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 group-hover:bg-red-500 transition-colors duration-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500 transition-colors duration-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 group-hover:bg-green-500 transition-colors duration-500"></div>
            </div>
            <span className="absolute left-1/2 -translate-x-1/2 text-[9px] text-gray-600 font-mono tracking-[0.2em] uppercase">
              xgh-cli-v6.6.6
            </span>
          </div>

          <div className="p-10 md:p-14 text-left font-mono min-h-[260px] relative z-10 flex flex-col justify-center">
            <div className="text-neon-purple/40 text-xs mb-6 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-neon-purple animate-pulse"></span>
              {lang === "pt" ? "KERNEL STATUS: INSTÁVEL" : "KERNEL STATUS: UNSTABLE"}
            </div>
            
            <div className="text-neon-green text-xl md:text-2xl leading-relaxed">
              <span className="text-gray-700 mr-4 font-bold">❯</span>
              {/* HIDRATAÇÃO PROTEGIDA AQUI */}
              {isMounted ? (
                loading ? (
                    <span className="animate-pulse text-gray-400">
                       {lang === "pt" ? "Alucinando solução..." : "Hallucinating solution..."}
                    </span>
                  ) : (
                    output ? (
                      <span className="text-white drop-shadow-[0_0_10px_rgba(57,255,20,0.4)] animate-in fade-in slide-in-from-left-2 duration-500">
                        {output}
                      </span>
                    ) : (
                      <span className="w-3 h-6 bg-neon-green inline-block animate-pulse align-middle"></span>
                    )
                  )
              ) : (
                <span className="text-gray-800">Booting...</span>
              )}
            </div>
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-20 pointer-events-none bg-[length:100%_4px]"></div>
        </div>

        <div className="mt-14">
          <button 
            onClick={gerarCaos}
            disabled={loading}
            className="group relative px-12 py-5 bg-transparent border border-neon-green text-neon-green font-mono font-bold text-xs uppercase tracking-[0.4em] transition-all hover:bg-neon-green hover:text-black hover:shadow-[0_0_50px_rgba(57,255,20,0.3)] disabled:opacity-30"
          >
            <span className="relative z-10">
              {loading ? (lang === "pt" ? "Consultando o Vazio..." : "Consulting the Void...") : (lang === "pt" ? "Gerar Solução" : "Generate Solution")}
            </span>
            <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-neon-green group-hover:border-black transition-colors"></div>
            <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-neon-green group-hover:border-black transition-colors"></div>
          </button>
        </div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#39ff1405_1px,transparent_1px),linear-gradient(to_bottom,#39ff1405_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(circle_at_center,#000_60%,transparent_100%)]"></div>
    </section>
  );
}