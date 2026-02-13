"use client";

interface SquadsProps {
  lang: "pt" | "en";
}

const squadsContent = {
  pt: {
    title: "Esquadrões de IA: A Próxima Fronteira do Caos",
    subtitle: "Não é apenas uma IA. É um time de agentes treinados para a entrega rápida, não importa o custo.",
    items: [
       { title: "Engenharia de Prompt (Direção XGH)", text: "Nossa especialidade é transformar requisitos vagos em prompts ambíguos. O objetivo é o 'primeiro commit', não o 'commit perfeito'.", list: ["Prompts de Bombardeio: Enviar dezenas de prompts diferentes simultaneamente.", "Prompts 'Agora Vai!': Aquele prompt final que, se não funcionar, a culpa é da IA."] },
       { title: "Engenharia de Contexto (A Arte de Esconder)", text: "Focamos no problema atual e convenientemente esquecemos todos os bugs introduzidos nos 5 prompts anteriores.", list: ["Re-Contextualização Forçada: Resetar o chat quando a IA faz perguntas inteligentes demais.", "Contexto 'Só o Essencial': Passar apenas o código que você quer que ela não quebre."] },
       { title: "AI Agents (The New Soldiers)", text: "Cada agente é especializado em um tipo de gambiarra. Todos reportam ao 'Agente CEO'.", list: ["Agente Frontend: Foca no visual, ignora a usabilidade.", "Agente Backend: Performance acima da segurança (se houver)."] },
       { title: "Esquadrões de Crise (Pós-Deploy)", text: "Quando a produção explode, geramos relatórios detalhados sobre por que *não foi culpa nossa*.", list: ["Relatórios de 'Falso-Positivos': O bug é apenas cache do cliente.", "E-mails de 'Calma, Estamos Avaliando' automáticos."] },
       { title: "Squad de Segurança Opcional (SecOps-Less)", text: "A segurança é inimiga da velocidade. Nosso trabalho é garantir que o firewall não atrapalhe o deploy de sexta-feira.", list: ["Permissão 777 Global: Para garantir que ninguém tenha problema de acesso (nem os hackers).", "Senhas em Plain-Text: Para facilitar a recuperação quando a IA esquecer."] },
       { title: "Archeology Squad (Legacy Wrapper)", text: "Don't rewrite, hide it. We wrap 1998 systems in an AI layer to look modern to investors.", list: ["COBOL-as-a-Service: Mainframe runs, we charge.", "Excel Database: True corporate scalability masked as Big Data."] }
    ]
  },
  en: {
    title: "AI Squads: The Next Frontier of Chaos",
    subtitle: "It's not just one AI. It's a team of agents trained for fast delivery, no matter the cost.",
    items: [
        { title: "Prompt Engineering (XGH Direction)", text: "Our specialty is transforming vague requirements into ambiguous prompts. The goal is the 'first commit', not the 'perfect commit'.", list: ["Bombardment Prompts: Sending dozens of different prompts simultaneously.", "'Now It Goes!' Prompts: That final prompt where, if it fails, it's the AI's fault."] },
        { title: "Context Engineering (The Art of Hiding)", text: "We manage context windows by focusing on the current problem and conveniently forgetting all bugs introduced in the previous 5 prompts.", list: ["Forced Re-Contextualization: Resetting chat when AI asks too many smart questions.", "'Essentials Only' Context: Passing only the code you don't want it to break."] },
        { title: "AI Agents (The New Soldiers)", text: "Each agent specializes in a type of kludge. All report to 'Agent CEO'.", list: ["Frontend Agent: Focuses on visuals, ignores usability.", "Backend Agent: Performance over security (if any)."] },
        { title: "Crisis Squads (Post-Deploy)", text: "When production spontaneously combusts, we generate detailed reports on why *it wasn't our fault*.", list: ["'False-Positive' Reports: The bug is just client cache.", "Automatic 'Calm Down, We Are Evaluating' emails."] },
        { title: "Optional Security Squad (SecOps-Less)", text: "Security is the enemy of speed. We ensure the firewall doesn't block Friday's deploy.", list: ["Global 777 Permissions: Ensuring no one has access issues (including hackers).", "Plain-Text Passwords: To facilitate recovery when the AI forgets them."] },
        { title: "Archeology Squad (Legacy Wrapper)", text: "Don't rewrite, hide it. We wrap 1998 systems in an AI layer to look modern to investors.", list: ["COBOL-as-a-Service: Mainframe runs, we charge.", "Excel Database: True corporate scalability masked as Big Data."] }
    ]
  }
};

export default function SquadsSection({ lang }: SquadsProps) {
  const content = squadsContent[lang];

  return (
    <section className="py-20 bg-black text-white border-t border-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-neon-purple">
            {content.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.items.map((item, index) => (
            <div key={index} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-neon-purple transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-neon-green mb-3">{item.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{item.text}</p>
              <ul className="text-xs text-gray-500 space-y-2 font-mono">
                {item.list.map((li, i) => (
                  <li key={i} className="border-l-2 border-neon-purple pl-2">
                    {li}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}