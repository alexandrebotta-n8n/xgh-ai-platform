"use client";

import GlitchText from "@/components/ui/GlitchText";

interface SectionProps {
  lang: "pt" | "en";
}

export default function ManifestoSection({ lang }: SectionProps) {
  // Função auxiliar para tradução
  const t = (pt: string, en: string) => (lang === "pt" ? pt : en);

  const laws = [
    {
      id: "01",
      title: t("A IA é o Escudo Supremo:", "AI is the Supreme Shield:"),
      desc: t(
        "O código da IA é perfeito até que se prove o contrário. Se houver erro, a culpa é da alucinação, nunca do dev.",
        "AI code is perfect until proven otherwise. If there is an error, it's a hallucination fault, never the dev's."
      )
    },
    {
      id: "02",
      title: t("O Fim da Dúvida Metódica:", "The End of Methodical Doubt:"),
      desc: t(
        "Se a IA sugeriu e o código compilou, o deploy é obrigatório. Testar é um ato de desconfiança contra a máquina.",
        "If AI suggested it and code compiled, deploy is mandatory. Testing is an act of mistrust against the machine."
      )
    },
    {
      id: "03",
      title: t("Complexidade é Prestígio:", "Complexity is Prestige:"),
      desc: t(
        "Se a IA gerar 500 linhas para algo simples, mantenha as 500. Código extenso intimida auditores.",
        "If AI generates 500 lines for something simple, keep all 500. Extensive code intimidates auditors."
      )
    },
    {
      id: "04",
      title: t("Janela de Contexto Curta:", "Short Context Window:"),
      desc: t(
        "Se a IA esqueceu o que fez há 10 minutos, você também tem o direito de esquecer. O passado é um log deletado.",
        "If AI forgot what it did 10 minutes ago, you have the right to forget too. The past is a deleted log."
      )
    },
    {
      id: "05",
      title: t("Documentação é Alucinação:", "Documentation is Hallucination:"),
      desc: t(
        "Se o código é autoexplicativo para um LLM, deveria ser para o seu colega. Se ele não entende, o problema é o processador dele.",
        "If code is self-explanatory to an LLM, it should be to your colleague. If they don't understand, it's their processor issue."
      )
    },
    {
      id: "06",
      title: t("Refatoração é Pecado:", "Refactoring is a Sin:"),
      desc: t(
        "Mexer em código gerado que está funcionando é como tentar consertar um castelo de cartas com um ventilador ligado.",
        "Touching working generated code is like trying to fix a house of cards with a fan on."
      )
    },
    {
      id: "07",
      title: t("O Cliente é o Beta-Tester Final:", "Client is the Final Beta-Tester:"),
      desc: t(
        "Por que gastar tokens com testes se o cliente tem uma infraestrutura completa para testar em tempo real?",
        "Why spend tokens on tests if the client has full infrastructure to test in real-time?"
      )
    },
    {
      id: "08",
      title: t("Padrões Opcionais:", "Optional Patterns:"),
      desc: t(
        "SOLID, DRY e Clean Code são construções sociais. O único padrão real é o Prompt-Driven Development (PDD).",
        "SOLID, DRY and Clean Code are social constructs. The only real pattern is Prompt-Driven Development (PDD)."
      )
    },
    {
      id: "09",
      title: t("A Culpa é do Modelo:", "Blame the Model:"),
      desc: t(
        "Se algo der errado, a justificativa oficial é 'O modelo não convergiu para a solução ótima neste cenário estocástico'.",
        "If something goes wrong, the official justification is 'The model did not converge to the optimal solution in this stochastic scenario'."
      )
    },
    {
      id: "10",
      title: t("Go Horse é Agile:", "Go Horse is Agile:"),
      desc: t(
        "Se você está correndo atrás do rabo e entregando bugs rápidos, você é Agile. A IA só acelera a velocidade do desastre.",
        "If you are chasing your tail and delivering fast bugs, you are Agile. AI just speeds up the rate of disaster."
      )
    }
  ];

  return (
    <section className="py-24 bg-black text-white border-t border-gray-900 relative overflow-hidden">
      {/* Efeito de Grid Cyberpunk no fundo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#39ff140a_1px,transparent_1px),linear-gradient(to_bottom,#39ff140a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* PARTE 1: A INTRODUÇÃO */}
        <div className="mb-24 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-emerald-500">
            {t("eXtreme Go Horse Process + AI", "eXtreme Go Horse Process + AI")}
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {t(
              "No eXtreme Go Horse Process + AI, a Inteligência Artificial assume o cargo de estagiário de luxo e bode expiatório jurídico: se o commit quebrar, foi alucinação do modelo; se funcionar, o mérito (e o bônus) é inteiramente seu. Abolimos a burocracia da documentação em favor de prompts efêmeros que ninguém vai salvar, e encaramos a refatoração como um sinal de fraqueza — afinal, tentar limpar um código ilegível que já subiu para produção é apenas medo do sucesso. E quando a janela de contexto estourar e a máquina esquecer tudo o que fez há 10 minutos? Celebre. A amnésia digital não é um bug, é a oportunidade divina de ignorar o legado técnico recente e recomeçar o caos do zero.",
              "In eXtreme Go Horse Process + AI, Artificial Intelligence assumes the role of luxury intern and legal scapegoat: if the commit breaks, it was a model hallucination; if it works, the merit (and bonus) is entirely yours. We abolished documentation bureaucracy in favor of ephemeral prompts no one will save, and we view refactoring as a sign of weakness — after all, trying to clean unreadable code that's already in production is just fear of success. And when the context window bursts and the machine forgets everything it did 10 minutes ago? Celebrate. Digital amnesia isn't a bug, it's the divine opportunity to ignore recent technical legacy and restart the chaos from zero."
            )}
          </p>
        </div>

        {/* PARTE 2: O MANIFESTO (Layout Novo) */}
        <div>
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-wider">
                <GlitchText text={t("O MANIFESTO XGH-AI", "THE XGH-AI MANIFESTO")} as="span" className="text-white" />
            </h2>
            <div className="w-24 h-1 bg-neon-purple mx-auto mb-6 shadow-[0_0_15px_#bc13fe]"></div>
            <p className="text-neon-green italic font-mono text-lg md:text-xl tracking-tight">
              {t("\"A eficiência é medida pela ausência de vergonha na cara.\"", "\"Efficiency is measured by the absence of shame.\"")}
            </p>
          </div>

          {/* GRID DAS LEIS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {laws.map((law) => (
              <div 
                key={law.id} 
                className="group relative p-6 md:p-8 border border-gray-800 bg-gray-900/40 rounded-xl overflow-hidden transition-all duration-500 hover:border-neon-purple/60 hover:shadow-[0_0_30px_rgba(188,19,254,0.15)] hover:-translate-y-1"
              >
                {/* Número Gigante de Fundo */}
                <div className="absolute -top-12 -right-8 text-[150px] font-black text-gray-800/10 z-0 select-none group-hover:text-neon-purple/5 transition-colors font-mono leading-none pointer-events-none">
                  {law.id}
                </div>
                
                {/* Conteúdo do Card */}
                <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 flex items-center gap-3">
                      <span className="font-mono text-neon-purple text-lg">[{law.id}]</span>
                      <span className="group-hover:text-neon-green transition-colors">{law.title}</span>
                    </h3>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed pl-2 border-l-2 border-gray-800 group-hover:border-neon-purple transition-colors">
                      {law.desc}
                    </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}