"use client";

interface HeroProps {
  lang: "pt" | "en";
}

export default function HeroSection({ lang }: HeroProps) {
  
  // --- DADOS DO CONTEÚDO (Extraídos do seu index.html) ---
  const content = {
    introTitle: {
      pt: "eXtreme Go Horse Process + AI",
      en: "eXtreme Go Horse Process + AI"
    },
    introText: {
      pt: "No eXtreme Go Horse Process + AI, a Inteligência Artificial assume o cargo de estagiário de luxo e bode expiatório jurídico: se o commit quebrar, foi alucinação do modelo; se funcionar, o mérito (e o bônus) é inteiramente seu. Abolimos a burocracia da documentação em favor de prompts efêmeros que ninguém vai salvar, e encaramos a refatoração como um sinal de fraqueza — afinal, tentar limpar um código ilegível que já subiu para produção é apenas medo do sucesso. E quando a janela de contexto estourar e a máquina esquecer tudo o que fez há 10 minutos? Celebre. A amnésia digital não é um bug, é a oportunidade divina de ignorar o legado técnico recente e recomeçar o caos do zero.",
      en: "In the eXtreme Go Horse Process + AI, Artificial Intelligence takes on the role of luxury intern and legal scapegoat: if the commit breaks, it was a model hallucination; if it works, the credit (and the bonus) is entirely yours. We abolish the bureaucracy of documentation in favor of ephemeral prompts that no one will save, and we view refactoring as a sign of weakness—after all, trying to clean up illegible code that has already gone to production is just fear of success. And when the context window bursts and the machine forgets everything it did 10 minutes ago? Celebrate. Digital amnesia is not a bug, it's the divine opportunity to ignore the recent technical legacy and restart the chaos from zero."
    },
    lawsTitle: {
      pt: "O Manifesto XGH-AI: As Novas Leis",
      en: "The XGH-AI Manifesto: The New Laws"
    },
    lawsQuote: {
      pt: '"A eficiência é medida pela ausência de vergonha na cara."',
      en: '"Efficiency is measured by the lack of shame."'
    },
    laws: {
      pt: [
        "01. A IA é o Escudo Supremo: O código da IA é perfeito até que se prove o contrário. Se houver erro, a culpa é da alucinação, nunca do dev.",
        "02. O Fim da Dúvida Metódica: Se a IA sugeriu e o código compilou, o deploy é obrigatório. Testar é um ato de desconfiança contra a máquina.",
        "03. Complexidade é Prestígio: Se a IA gerar 500 linhas para algo simples, mantenha as 500. Código extenso intimida auditores.",
        "04. Janela de Contexto Curta: Se a IA esqueceu o que fez há 10 minutos, você também tem o direito de esquecer. O passado é um log deletado.",
        "05. Documentação é Alucinação: Se o código é autoexplicativo para um LLM, deveria ser para o seu colega. Se ele não entende, o problema é o processador dele.",
        "06. Refatoração é Pecado: Mexer em código gerado que está funcionando é como tentar consertar um castelo de cartas com um ventilador ligado.",
        "07. O Cliente é o Beta-Tester Final: Por que gastar tokens com testes se o cliente tem uma infraestrutura completa para testar em tempo real?",
        "08. Padrões Opcionais: SOLID, DRY e Clean Code são construções sociais. O único padrão real é o Prompt-Driven Development (PDD).",
        "09. A Culpa é do Modelo: Se algo der errado, a justificativa oficial é 'O modelo não convergiu para a solução ótima neste cenário estocástico'.",
        "10. Go Horse é Agile: Se você está correndo atrás do rabo e entregando bugs rápidos, você é Agile. A IA só acelera a velocidade do desastre."
      ],
      en: [
        "01. AI is the Ultimate Shield: AI code is perfect until proven otherwise. If there is an error, it is hallucination's fault, never the dev's.",
        "02. The End of Methodical Doubt: If AI suggested it and the code compiled, deployment is mandatory. Testing is an act of mistrust against the machine.",
        "03. Complexity is Prestige: If AI generates 500 lines for something simple, keep the 500. Extensive code intimidates auditors.",
        "04. Short Context Window: If AI forgot what it did 10 minutes ago, you also have the right to forget. The past is a deleted log.",
        "05. Documentation is Hallucination: If the code is self-explanatory to an LLM, it should be to your colleague. If they don't understand, the problem is their processor.",
        "06. Refactoring is Sin: Tampering with generated code that works is like trying to fix a house of cards with a fan on.",
        "07. The Client is the Final Beta-Tester: Why spend tokens on tests if the client has a full infrastructure to test in real-time?",
        "08. Optional Patterns: SOLID, DRY, and Clean Code are social constructs. The only real standard is Prompt-Driven Development (PDD).",
        "09. Blame the Model: If something goes wrong, the official justification is 'The model did not converge to the optimal solution in this stochastic scenario'.",
        "10. Go Horse is Agile: If you are chasing your tail and delivering fast bugs, you are Agile. AI only accelerates the speed of disaster."
      ]
    }
  };

  return (
    <>
      {/* --- SEÇÃO DE INTRODUÇÃO --- */}
      <section className="py-16 md:py-24 border-l-4 border-neon-green bg-card-bg/50 backdrop-blur-sm my-10 mx-4 md:mx-0 p-6 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {content.introTitle[lang]}
        </h2>
        
        <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed text-lg text-justify">
          <p>{content.introText[lang]}</p>
        </div>
      </section>

      {/* --- SEÇÃO DO MANIFESTO (LEIS) --- */}
      <section className="py-16 md:py-20 my-10 mx-4 md:mx-0 bg-[#1a1a1a] border-l-4 border-neon-green p-6 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-neon-green uppercase border-b-2 border-neon-green pb-4 mb-4">
          {content.lawsTitle[lang]}
        </h2>
        
        <p className="text-gray-500 italic mb-8 text-lg">
          {content.lawsQuote[lang]}
        </p>

        <div className="grid grid-cols-1 gap-6">
          {content.laws[lang].map((law, index) => {
            // Separa o título (em negrito) do resto do texto
            const [title, ...rest] = law.split(":");
            return (
              <div key={index} className="text-gray-300 text-lg border-b border-gray-800 pb-4 last:border-0 hover:text-white transition-colors">
                <strong className="text-neon-purple block md:inline mb-1 md:mb-0 mr-2">
                  {title}:
                </strong>
                {rest.join(":")}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}