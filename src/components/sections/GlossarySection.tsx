"use client";

interface GlossaryProps {
  lang: "pt" | "en";
}

const glossaryContent = {
  pt: {
    title: "Glossário de Termos Técnicos",
    items: [
        { term: "Prompt-Horse", def: "Disparar comandos vagos até que a IA entregue uma gambiarra que compila por milagre." },
        { term: "HDD (Hallucination-Driven)", def: "Basear a arquitetura em funções inventadas pela IA. Se não existe, a gente finge que é feature." },
        { term: "Push & Pray", def: "Commitar 500 linhas geradas sem ler e rezar para o servidor não entrar em chamas." },
        { term: "Estagiário Sintético", def: "O modelo de IA que assume a culpa jurídica pelos bugs de sexta-feira." },
        { term: "Refatoração Fantasma", def: "Quando a IA limpa o código removendo a lógica essencial, mas deixando-o 'bonito'." },
        { term: "Senioridade por Prompt", def: "Parecer sênior usando termos caros no chat enquanto o código é puro espaguete." },
        { term: "Token-Burner", def: "Gastar 50 dólares de API para automatizar o que levaria 5 minutos à mão." },
        { term: "Context Ghosting", def: "Aceitar o erro da IA como a nova direção estratégica do software." },
        { term: "Axioma do Prompt Infinito", def: "Não planeje. Mande 50 variações do prompt até a IA cuspir algo que compile por sorte." },
        { term: "Refatoração Negativa", def: "Pedir à IA para melhorar o código e receber algo 100% ilegível em troca." },
        { term: "Arquitetura de Alucinação", def: "Estrutura baseada em código que ninguém entende e prompts que ninguém salvou." },
        { term: "Backup de Esperança", def: "Confiar que a IA terá sempre o histórico do chat quando a produção explodir." },
        { term: "Senioridade por Volume", def: "Gerar 2.000 linhas de código redundante para 'assustar' o bug até ele sumir." },
        { term: "Cavalo de Tróia", def: "Solução gerada em 2 segundos que introduz 14 vulnerabilidades novas no sistema." }
    ]
  },
  en: {
    title: "Technical Glossary",
    items: [
        { term: "Prompt-Horse", def: "Firing vague commands until AI delivers a workaround that miraculously compiles." },
        { term: "HDD (Hallucination-Driven)", def: "Basing architecture on functions invented by AI. If it doesn't exist, we pretend it's a feature." },
        { term: "Push & Pray", def: "Committing 500 generated lines without reading and praying the server doesn't catch fire." },
        { term: "Synthetic Intern", def: "The AI model that takes legal blame for bugs on Friday." },
        { term: "Ghost Refactoring", def: "When AI cleans code by removing essential logic but leaving it 'pretty'." },
        { term: "Seniority by Prompt", def: "Sounding senior using expensive terms in chat while the code is pure spaghetti." },
        { term: "Token-Burner", def: "Spending $50 in API credits to automate what would take 5 minutes by hand." },
        { term: "Context Ghosting", def: "Accepting the AI's mistake as the new strategic direction of the software." },
        { term: "Infinite Prompt Axiom", def: "Don't plan. Send 50 prompt variations until AI spits out something that compiles by luck." },
        { term: "Negative Refactoring", def: "Asking AI to improve code and getting something 100% unreadable in return." },
        { term: "Hallucination Architecture", def: "Structure based on code no one understands and prompts no one saved." },
        { term: "Backup of Hope", def: "Trusting that AI will always have the chat history when production explodes." },
        { term: "Seniority by Volume", def: "Generating 2,000 lines of redundant code to 'scare' the bug away." },
        { term: "Trojan Horse", def: "Solution generated in 2 seconds that introduces 14 new security vulnerabilities." }
    ]
  }
};

export default function GlossarySection({ lang }: GlossaryProps) {
  const content = glossaryContent[lang];

  return (
    <section className="py-20 bg-dark-bg border-t border-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-neon-green">
          {content.title}
        </h2>
        
        {/* MUDANÇA: Grid com 2 colunas no desktop (md:grid-cols-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.items.map((item, index) => (
            <div key={index} className="p-4 border border-gray-800 rounded hover:border-neon-purple hover:bg-gray-900/30 transition-all group">
              <span className="text-neon-purple font-bold font-mono text-lg block mb-2 group-hover:text-white transition-colors">
                {item.term}
              </span>
              <span className="text-gray-400 font-light text-sm leading-relaxed group-hover:text-gray-300">
                {item.def}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}