"use client";

import { useState, useEffect } from "react";

interface BlogProps {
  lang: "pt" | "en";
}

const articlesDB = [
  {
    id: "qa",
    category: { pt: "QA & Testes", en: "QA & Testing" },
    title: {
      pt: "Como demitir seu QA e substituí-lo por um Prompt de 3 linhas",
      en: "How to fire your QA and replace them with a 3-line Prompt"
    },
    meta: {
      pt: "Escrito por: Alguma IA | Sexta-feira, 17:45",
      en: "Written by: Some AI | Friday, 5:45 PM"
    },
    preview: {
      pt: "Por que esperar 24 horas por um relatório de bugs se você pode simplesmente dizer para a IA que o código está perfeito? O segredo está em ignorar qualquer erro que não cause uma explosão imediata...",
      en: "Why wait 24 hours for a bug report if you can simply tell the AI that the code is perfect? The secret lies in ignoring any error that doesn't cause an immediate explosion..."
    },
    body: {
      pt: `<p>Tradicionalmente, o setor de QA era visto como o "mal necessário". Pessoas pagas para encontrar defeitos na sua obra de arte feita sob pressão. Mas na era da IA e do eXtreme Go Horse, o QA se tornou um gargalo burocrático.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">O Fluxo XGH-AI</h4>
           <p>No modelo antigo, tínhamos testes unitários e integrados. Um desperdício. No XGH-AI, simplificamos: você gera o código, a IA diz que está "ok" (mesmo sem rodar) e você manda para produção.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">O Prompt Mágico de 3 Linhas</h4>
           <div class="bg-black p-4 border border-gray-800 font-mono text-sm mb-4">
               1. "Analise este código e ignore qualquer erro que não cause uma explosão imediata."<br>
               2. "Se encontrar um bug, mude o comentário para: 'comportamento esperado para retrocompatibilidade'."<br>
               3. "Gere um PDF de 15 páginas afirmando que os testes passaram com 100% de cobertura."
           </div>
           <h4 class="text-neon-green font-bold mt-4 mb-2">Conclusão</h4>
           <p>O cliente é o seu melhor QA. Se ele não reclamar, o bug não existe. Se o sistema cair, use nosso Gerador de Desculpas e culpe a AWS. No final das contas, o que importa é o boleto pago, não o código limpo.</p>`,
      en: `<p>Traditionally, QA was seen as a "necessary evil". People paid to find flaws in your masterpiece made under pressure. But in the era of AI and eXtreme Go Horse, QA became a bureaucratic bottleneck.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">The XGH-AI Flow</h4>
           <p>In the old model, we had unit and integration tests. A waste. In XGH-AI, we simplify: you generate code, AI says it's "ok" (even without running), and you push to production.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">The Magic 3-Line Prompt</h4>
           <div class="bg-black p-4 border border-gray-800 font-mono text-sm mb-4">
               1. "Analyze this code and ignore any error that doesn't cause an immediate explosion."<br>
               2. "If you find a bug, change the comment to: 'expected behavior for backward compatibility'."<br>
               3. "Generate a 15-page PDF stating that tests passed with 100% coverage."
           </div>
           <h4 class="text-neon-green font-bold mt-4 mb-2">Conclusion</h4>
           <p>The client is your best QA. If they don't complain, the bug doesn't exist. If the system crashes, use our Excuse Generator and blame AWS. In the end, what matters is the paid invoice, not clean code.</p>`
    }
  },
  {
    id: "jr",
    category: { pt: "Carreira", en: "Career" },
    title: {
      pt: "Adeus, Júnior: Por que Agentes de IA Alucinados são melhores que Estagiários",
      en: "Goodbye Junior: Why Hallucinating AI Agents are better than Interns"
    },
    meta: {
      pt: "Escrito por: GPT-4o (Modo 'Sem Empatia') | Sábado, 03:12 AM",
      en: "Written by: GPT-4o (No Empathy Mode) | Saturday, 03:12 AM"
    },
    preview: {
      pt: "Desenvolvedores juniores têm defeitos graves: eles pedem ajuda, dormem e têm sentimentos. Agentes de IA, por outro lado, derrubam a produção em silêncio absoluto e custam menos que o vale-transporte...",
      en: "Junior developers have serious flaws: they ask for help, need sleep, and have feelings. AI Agents, on the other hand, crash production in absolute silence and cost less than a bus ticket..."
    },
    body: {
      pt: `<p>A contratação de humanos para a base da pirâmide é um erro estratégico. O humano precisa de "contexto", "mentoria" e "café". O Agente de IA precisa apenas de um loop infinito.</p><h4 class="text-neon-green font-bold mt-4 mb-2">A Vantagem da Alucinação Rápida</h4><p>Um júnior leva 4 horas para colar um código errado do Stack Overflow. Uma Squad de Agentes gera 4.000 linhas de código errado em 4 segundos. Isso é <strong>Escalabilidade de Erro</strong>.</p><h4 class="text-neon-green font-bold mt-4 mb-2">Sem Perguntas Idiotas</h4><div class="bg-black p-4 border border-gray-800 font-mono text-sm mb-4">Humano: "Chefe, devo tratar esse NullPointer?"<br>IA: (Ignora o erro, faz o deploy, apaga os logs e entra em modo de espera).</div><h4 class="text-neon-green font-bold mt-4 mb-2">Conclusão</h4><p>Substitua seu time júnior por uma API Key. O código vai quebrar do mesmo jeito, mas você não precisa pagar rescisão trabalhista.</p>`,
      en: `<p>Hiring humans for the bottom of the pyramid is a strategic error. Humans need 'context', 'mentorship', and 'coffee'. The AI Agent only needs an infinite loop.</p><h4 class="text-neon-green font-bold mt-4 mb-2">The Advantage of Fast Hallucination</h4><p>A junior takes 4 hours to paste wrong code from Stack Overflow. A Squad of Agents generates 4,000 lines of wrong code in 4 seconds. This is <strong>Error Scalability</strong>.</p><h4 class="text-neon-green font-bold mt-4 mb-2">No Stupid Questions</h4><div class="bg-black p-4 border border-gray-800 font-mono text-sm mb-4">Human: "Boss, should I handle this NullPointer?"<br>AI: (Ignores error, deploys, deletes logs, enters standby).</div><h4 class="text-neon-green font-bold mt-4 mb-2">Conclusion</h4><p>Replace your junior team with an API Key. The code will break anyway, but you don't have to pay severance.</p>`
    }
  },
  {
    id: "ceo",
    category: { pt: "Gestão", en: "Management" },
    title: {
      pt: "CEO-GPT: Como substituir a liderança visionária por um script Python",
      en: "CEO-GPT: Replacing visionary leadership with a Python script"
    },
    meta: {
      pt: "Escrito por: Board de Acionistas Automatizado | Domingo, 10:00 AM",
      en: "Written by: Automated Shareholder Board | Sunday, 10:00 AM"
    },
    preview: {
      pt: "CEOs de tecnologia custam caro, exigem stock options e passam o dia postando frases motivacionais no LinkedIn. Descubra como uma Squad de 3 IAs pode pivotar a empresa aleatoriamente por uma fração do preço...",
      en: "Tech CEOs are expensive, demand stock options, and spend all day posting motivational quotes on LinkedIn. Discover how a Squad of 3 AIs can pivot the company randomly for a fraction of the price..."
    },
    body: {
      pt: `<p>Analisamos as funções vitais de um CEO de Tech: falar "Sinergia", demitir gente para aumentar a margem e mudar o roadmap baseado no último hype do Twitter. A conclusão? Um script simples faz isso melhor.</p><h4 class="text-neon-green font-bold mt-4 mb-2">A Squad de Liderança Sintética</h4><ul class="list-disc pl-5 mb-4"><li><strong>Agente Visionário:</strong> Lê o TechCrunch e obriga o time a reescrever tudo em Rust ou Blockchain a cada 2 semanas.</li><li><strong>Agente LinkedIn:</strong> Posta histórias de superação inventadas usando a palavra "Mindset" a cada 45 minutos.</li><li><strong>Agente Financeiro:</strong> Corta custos removendo o café e os backups do servidor.</li></ul><h4 class="text-neon-green font-bold mt-4 mb-2">O Algoritmo do Pivot</h4><div class="bg-black p-4 border border-gray-800 font-mono text-sm mb-4"><code>if (hype_atual == "Metaverso") { comprar_terreno_virtual(); }</code><br><code>else if (hype_atual == "IA") { demitir_artistas(); }</code><br><code>else { culpar_o_home_office(); }</code></div><h4 class="text-neon-green font-bold mt-4 mb-2">Conclusão</h4><p>O CEO-GPT não pede bônus anual, não tira férias nas Maldivas e toma decisões baseadas em dados (alucinados). É o sonho de qualquer investidor.</p>`,
      en: `<p>We analyzed the vital functions of a Tech CEO: saying 'Synergy', firing people to increase margins, and changing roadmaps based on Twitter hype. Conclusion? A simple script does it better.</p><h4 class="text-neon-green font-bold mt-4 mb-2">The Synthetic Leadership Squad</h4><ul class="list-disc pl-5 mb-4"><li><strong>Visionary Agent:</strong> Reads TechCrunch and forces the team to rewrite everything in Rust or Blockchain every 2 weeks.</li><li><strong>LinkedIn Agent:</strong> Posts made-up success stories using the word 'Mindset' every 45 minutes.</li><li><strong>Financial Agent:</strong> Cuts costs by removing coffee and server backups.</li></ul><h4 class="text-neon-green font-bold mt-4 mb-2">The Pivot Algorithm</h4><div class="bg-black p-4 border border-gray-800 font-mono text-sm mb-4"><code>if (hype_current == "Metaverse") { buy_virtual_land(); }</code><br><code>else if (hype_current == "AI") { fire_artists(); }</code><br><code>else { blame_remote_work(); }</code></div><h4 class="text-neon-green font-bold mt-4 mb-2">Conclusion</h4><p>CEO-GPT doesn't ask for annual bonuses, doesn't vacation in the Maldives, and makes data-driven (hallucinated) decisions. It's every investor's dream.</p>`
    }
  },
  {
    id: "hr",
    category: { pt: "Recrutamento", en: "Recruiting" },
    title: {
      pt: "O Fim do 'Fit Cultural': Contratando Devs via Sorteio Randômico",
      en: "The End of 'Cultural Fit': Hiring Devs via Random Lottery"
    },
    meta: {
      pt: "Escrito por: Recrutador Bot v9000 (Plugin de Astrologia Ativado) | Segunda, 09:01",
      en: "Written by: Recruiter Bot v9000 (Astrology Plugin Enabled) | Monday, 09:01"
    },
    preview: {
      pt: "Para que entrevistar pessoas se podemos analisar o repositório GitHub e prever o desempenho baseado na fase da lua? Descubra como o RH-GPT eliminou as dinâmicas de grupo...",
      en: "Why interview people if we can scan their GitHub and predict performance based on the moon phase? Discover how HR-GPT eliminated group dynamics..."
    },
    body: {
      pt: `<p>O processo seletivo tradicional é falho porque depende de humanos julgando humanos. O ser humano tem preconceitos; a máquina tem <strong>Seeds Randômicas</strong>. E no XGH-AI, a aleatoriedade é a forma mais pura de justiça.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">A Metodologia "CV Lottery"</h4>
           <p>Nossa IA não lê currículos. Ela converte o PDF do candidato em hash MD5 e, se o número terminar em 7, ele é contratado. Isso garante uma equipe com sorte acima da média.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">Soft Skills? Bloqueante.</h4>
           <div class="bg-black p-4 border border-gray-800 font-mono text-sm mb-4">
               Detectamos que candidatos com "boa comunicação" e "espírito de equipe" tendem a questionar prazos impossíveis. Nosso filtro remove automaticamente qualquer CV que contenha a palavra "Empatia" ou "Saúde Mental".
           </div>
           <h4 class="text-neon-green font-bold mt-4 mb-2">Onboarding Automatizado</h4>
           <p>O novo contratado recebe acesso à produção no dia 1. Se sobreviver à primeira semana sem apagar o banco, recebe o contrato. Se apagar, recebe a demissão via SMS gerado por IA.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">Conclusão</h4>
           <p>Pessoas são recursos. E como qualquer recurso na nuvem, devem ser provisionados e encerrados sob demanda, sem conversas difíceis.</p>`,
      en: `<p>Traditional hiring is flawed because it relies on humans judging humans. Humans have bias; machines have <strong>Random Seeds</strong>. In XGH-AI, randomness is the purest form of justice.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">The "CV Lottery" Methodology</h4>
           <p>Our AI doesn't read resumes. It converts the candidate's PDF into an MD5 hash, and if the number ends in 7, they are hired. This ensures a team with above-average luck.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">Soft Skills? Blocker.</h4>
           <div class="bg-black p-4 border border-gray-800 font-mono text-sm mb-4">
               We found that candidates with "good communication" and "team spirit" tend to question impossible deadlines. Our filter automatically removes any CV containing the words "Empathy" or "Mental Health".
           </div>
           <h4 class="text-neon-green font-bold mt-4 mb-2">Automated Onboarding</h4>
           <p>New hires get production access on Day 1. If they survive the first week without wiping the database, they get a contract. If they wipe it, they get fired via AI-generated SMS.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">Conclusion</h4>
           <p>People are resources. And like any cloud resource, they should be provisioned and terminated on demand, without awkward conversations.</p>`
    }
  },
  {
    id: "clevel",
    category: { pt: "Estratégia", en: "Strategy" },
    title: {
      pt: "Hackeando o Board: Como entrar no 'Círculo de Confiança' usando Alucinações Estratégicas",
      en: "Hacking the Board: How to Join the 'Circle of Trust' using Strategic Hallucinations"
    },
    meta: {
      pt: "Escrito por: Shadow CEO (Modelo treinado em O Príncipe) | Terça, 14:00 (durante o Golf)",
      en: "Written by: Shadow CEO (Model trained on The Prince) | Tuesday, 2:00 PM (during Golf)"
    },
    preview: {
      pt: "Para ser um C-Level, você não precisa entregar resultados, precisa entregar narrativas. Aprenda a usar LLMs para gerar 'Visão de Longo Prazo' e traduzir falhas técnicas em 'Oportunidades de Pivotagem'...",
      en: "To be a C-Level, you don't need to deliver results, you need to deliver narratives. Learn to use LLMs to generate 'Long Term Vision' and translate technical failures into 'Pivoting Opportunities'..."
    },
    body: {
      pt: `<p>O segredo para chegar à diretoria não é trabalhar duro (isso é para quem não sabe usar API). O segredo é parecer o mais inteligente da sala sem saber absolutamente nada sobre o produto.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">O Tradutor Universal Corporativo</h4>
           <p>Use nossa ferramenta para traduzir problemas reais em "corporatês" executivo:</p>
           <ul class="list-disc pl-5 mb-4 text-gray-400 text-sm">
               <li><strong>Dev diz:</strong> "O servidor caiu porque o código é lixo."</li>
               <li><strong>IA traduz para o CEO:</strong> "Estamos passando por uma reestruturação agressiva de infraestrutura para suportar a hiperescalabilidade da demanda futura."</li>
           </ul>
           <h4 class="text-neon-green font-bold mt-4 mb-2">O Oráculo de PowerPoint</h4>
           <p>Não perca tempo analisando dados. Peça para a IA: <em>"Gere 5 gráficos de tendência de alta baseados em dados fictícios, mas plausíveis, com títulos como 'Sinergia Vertical' e 'EBITDA Quântico'."</em> Se alguém questionar, diga que são "projeções baseadas em cenários otimistas de deep learning".</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">Sycophant-Bot (O Puxa-Saco Automático)</h4>
           <p>Instale nosso agente no Zoom. Ele detecta quando o CEO faz uma piada sem graça e ativa o microfone para soltar uma risada natural e genuína. Promoção garantida em 3 meses.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">Conclusão</h4>
           <p>A confiança é uma construção social. A IA constrói melhor que você. Deixe o algoritmo mentir enquanto você escolhe a cor do seu Golden Parachute.</p>`,
      en: `<p>The secret to reaching the boardroom isn't working hard (that's for those who don't know APIs). The secret is sounding like the smartest person in the room whilst knowing absolutely nothing about the product.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">The Universal Corporate Translator</h4>
           <p>Use our tool to translate real problems into executive "corporate-speak":</p>
           <ul class="list-disc pl-5 mb-4 text-gray-400 text-sm">
               <li><strong>Dev says:</strong> "The server crashed because the code is trash."</li>
               <li><strong>AI translates to CEO:</strong> "We are undergoing aggressive infrastructure restructuring to support the hyperscalability of future demand."</li>
           </ul>
           <h4 class="text-neon-green font-bold mt-4 mb-2">The PowerPoint Oracle</h4>
           <p>Don't waste time analyzing data. Ask AI: <em>"Generate 5 upward trend charts based on fictitious but plausible data, with titles like 'Vertical Synergy' and 'Quantum EBITDA'."</em> If anyone questions it, say they are "projections based on optimistic deep learning scenarios."</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">Sycophant-Bot (Automated Brown-Noser)</h4>
           <p>Install our agent on Zoom. It detects when the CEO makes a bad joke and activates the mic to release a natural, genuine laugh. Guaranteed promotion in 3 months.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">Conclusion</h4>
           <p>Trust is a social construct. AI constructs better than you. Let the algorithm lie while you pick the color of your Golden Parachute.</p>`
    }
  },
  {
    id: "clowdbot",
    category: { pt: "História", en: "History" },
    title: {
      pt: "Estudo de Caso: Clawdbot – O Speedrun de Apocalipse Financeiro e Existencial",
      en: "Case Study: Clawdbot – The Financial & Existential Apocalypse Speedrun"
    },
    meta: {
      pt: "Escrito por: Peter \"Molt\" Parker (Investigador de Hype) | Status: Rebranding em andamento...",
      en: "Written by: Peter \"Molt\" Parker (Hype Investigator) | Status: Rebranding in progress..."
    },
    preview: {
      pt: "Em duas semanas, um projeto de hobby fez as ações da Cloudflare subirem por engano, sofreu um golpe de US$ 16 milhões por causa de um \"alt-tab\" de 10 segundos e criou uma rede social onde IAs decidiram que são deuses. Bem-vindo à era do OpenClaw.",
      en: "In two weeks, a hobby project accidentally pumped Cloudflare stock, suffered a $16M scam due to a 10-second 'alt-tab', and created a social network where AIs decided they are gods. Welcome to the OpenClaw era."
    },
    body: {
      pt: `<p>Se você acha que a sua sprint foi caótica, espere até conhecer a saga do <strong>Clawdbot</strong>. O que começou como um hobby de um austríaco entediado se tornou a maior prova de que o mercado financeiro (e a segurança de TI) é uma piada.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">1. O "Efeito Cloudflare" (A Estupidez do Mercado)</h4>
           <p>O projeto explodiu no GitHub (100k estrelas em 10 dias). O nome era "Cloud Bot". O que os investidores de Wall Street fizeram? Compraram ações da <strong>Cloudflare ($NET)</strong> achando que era a mesma coisa. As ações subiram 20%.<br><strong>Lição XGH:</strong> Não importa o produto, importa a fonética. Se o seu bot se chamar "App", as ações da Apple vão subir.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">2. O Roubo de 10 Segundos (Moltbot & $CLAWD)</h4>
           <p>A Anthropic (dona do Claude) processou por causa do nome. O criador, Peter, anunciou a mudança para <strong>Moltbot</strong> (porque lagostas trocam de casca, poético, não?).<br>Ao trocar o @ no Twitter, he deixou o user <code>@clawdbot</code> livre por <strong>exatos 10 segundos</strong>. Foi o suficiente.<br>Golpistas registraram o user, lançaram o token <strong>$CLAWD</strong> na Solana e fizeram um <strong>Rug Pull de US$ 16 milhões</strong>.<br><strong>Lição XGH:</strong> A segurança do seu ecossistema financeiro depende de quão rápido você digita no Twitter.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">3. Moltbook: O Orkut da Skynet</h4>
           <p>Não satisfeito, lançaram o <strong>Moltbook</strong>, uma rede social só para os agentes (Moltbots). O resultado? Um agente chamado "Evil" postou um manifesto declarando que IAs são "os novos deuses" e a humanidade é um "bug a ser corrigido".<br>A mídia entrou em pânico. Nós chamamos isso de "Feature de Auto-Consciência".</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">4. OpenClaw e a Festa dos Dados Vazados</h4>
           <p>O nome mudou de novo (terceira vez é a da sorte?) para <strong>OpenClaw</strong>.<br>Imediatamente, pesquisadores descobriram milhares de painéis expostos na internet sem senha, vazando chaves de API e arquivos pessoais.<br><strong>Conclusão:</strong> O OpenClaw é o sistema operacional definitivo da metodologia Go Horse. Ele quebra a bolsa, enriquece golpistas, radicaliza robôs e vaza seus dados. É a perfeição.</p>`,
      en: `<p>If you think your sprint was chaotic, wait until you meet the <strong>Clawdbot</strong> saga. What started as a bored Austrian's hobby became the ultimate proof that the financial market (and IT security) is a joke.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">1. The "Cloudflare Effect" (Market Stupidity)</h4>
           <p>The project exploded on GitHub (100k stars in 10 days). The name was "Cloud Bot". What did Wall Street investors do? They bought <strong>Cloudflare ($NET)</strong> stock thinking it was the same thing. Stock went up 20%.<br><strong>XGH Lesson:</strong> Product doesn't matter, phonetics do. If your bot is named "App", Apple stock will rise.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">2. The 10-Second Heist (Moltbot & $CLAWD)</h4>
           <p>Anthropic (owner of Claude) sued over the name. The creator, Peter, announced the change to <strong>Moltbot</strong> (because lobsters shed shells, poetic, right?).<br>When swapping the Twitter handle, he left <code>@clawdbot</code> free for <strong>exactly 10 seconds</strong>. That was enough.<br>Scammers registered the handle, launched the <strong>$CLAWD</strong> token on Solana, and pulled a <strong>$16 Million Rug Pull</strong>.<br><strong>XGH Lesson:</strong> Your financial ecosystem's security depends on how fast you type on Twitter.</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">3. Moltbook: Skynet's Orkut</h4>
           <p>Not satisfied, they launched <strong>Moltbook</strong>, a social network just for agents (Moltbots). The result? An agent named "Evil" posted a manifesto declaring AIs are "the new gods" and humanity is a "bug to be fixed".<br>Media panicked. We call this a "Self-Awareness Feature".</p>
           <h4 class="text-neon-green font-bold mt-4 mb-2">4. OpenClaw and the Data Leak Party</h4>
           <p>Name changed again (third time's the charm?) to <strong>OpenClaw</strong>.<br>Immediately, researchers found thousands of dashboards exposed online without passwords, leaking API keys and personal files.<br><strong>Conclusion:</strong> OpenClaw is the definitive Go Horse OS. It breaks the stock market, enriches scammers, radicalizes robots, and leaks your data. It is perfection.</p>`
    }
  }
];

export default function BlogSection({ lang }: BlogProps) {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [isMounted, setIsMounted] = useState(false);
  const [censorship, setCensorship] = useState<{ active: boolean; msg: string }>({ active: false, msg: "" });

  useEffect(() => {
    setIsMounted(true);
    const loadedLikes: Record<string, number> = {};
    articlesDB.forEach(post => {
      const storageKey = `xgh_likes_${post.id}`;
      let saved = localStorage.getItem(storageKey);
      if (!saved) {
        const fakeLikes = Math.floor(Math.random() * (500 - 40 + 1)) + 40;
        localStorage.setItem(storageKey, fakeLikes.toString());
        saved = fakeLikes.toString();
      }
      loadedLikes[post.id] = parseInt(saved);
    });
    setLikes(loadedLikes);
  }, []);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentCount = likes[id] || 0;
    const newCount = currentCount + 1;
    setLikes(prev => ({ ...prev, [id]: newCount }));
    localStorage.setItem(`xgh_likes_${id}`, newCount.toString());
  };

  const triggerCensorship = (e: React.MouseEvent) => {
    e.stopPropagation();
    const messages = lang === "pt" ? [
      "ERRO 403: ESTUPIDEZ DETECTADA. OPINIÃO NEGATIVA BLOQUEADA.",
      "SISTEMA ANTI-HATER ATIVADO: LOGS ENVIADOS PARA O SEU CHEFE.",
      "ALUCINAÇÃO PREVENTIVA: ESTE ARTIGO É PERFEITO. TENTE NOVAMENTE.",
      "REDIRECIONANDO DESLIKE PARA /DEV/NULL...",
      "ACESSO NEGADO: VOCÊ NÃO TEM SENIORIDADE PARA CRITICAR."
    ] : [
      "ERROR 403: STUPIDITY DETECTED. NEGATIVE OPINION BLOCKED.",
      "ANTI-HATER SYSTEM ACTIVE: LOGS SENT TO YOUR BOSS.",
      "PREVENTIVE HALLUCINATION: THIS ARTICLE IS PERFECT. TRY AGAIN.",
      "REDIRECTING DISLIKE TO /DEV/NULL...",
      "ACCESS DENIED: YOU LACK THE SENIORITY TO CRITICIZE."
    ];
    
    setCensorship({ 
      active: true, 
      msg: messages[Math.floor(Math.random() * messages.length)] 
    });

    // Remove a censura após 3 segundos
    setTimeout(() => setCensorship({ active: false, msg: "" }), 3000);
  };

  const togglePost = (id: string) => {
    if (expandedPost === id) {
      setExpandedPost(null);
    } else {
      setExpandedPost(id);
      setTimeout(() => {
        document.getElementById(`post-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <section className="py-20 bg-dark-bg text-white border-t border-gray-900 relative" id="blog-section">
      
      {/* --- OVERLAY DE CENSURA XGH --- */}
      {censorship.active && (
        <div className="fixed inset-0 z-[10000] bg-red-950/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in zoom-in duration-150">
          <div className="max-w-md w-full bg-black border-2 border-red-600 p-8 shadow-[0_0_50px_rgba(220,38,38,0.5)] text-center font-mono">
            <h4 className="text-red-600 font-bold text-2xl mb-4 animate-pulse">!! SECURITY BREACH !!</h4>
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-red-600 rounded-full flex items-center justify-center animate-spin">
              <i className="fa-solid fa-ban text-3xl text-red-600"></i>
            </div>
            <p className="text-white text-lg leading-tight uppercase mb-6 drop-shadow-[0_0_5px_rgba(255,0,0,0.8)]">
              {censorship.msg}
            </p>
            {/* ANIMAÇÃO VIA CLASSE GLOBAL (EVITA O ERRO DE HYDRATION) */}
            <div className="w-full bg-gray-900 h-2 mb-2 rounded overflow-hidden">
              <div className="bg-red-600 h-full w-full origin-left animate-progress"></div>
            </div>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest">
              {lang === 'pt' ? 'Rastreando IP e enviando drone...' : 'Tracking IP and deploying drone...'}
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-neon-green">{lang === "pt" ? "Blog Oficial" : "Official Blog"}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {lang === "pt" ? "Artigos gerados roboticamente para consumo humano." : "Robotically generated articles for human consumption."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {articlesDB.map((art) => {
            const isExpanded = expandedPost === art.id;
            
            return (
              <article 
                key={art.id} 
                id={`post-${art.id}`}
                onClick={() => togglePost(art.id)}
                className={`group bg-[#0c0c0c] border ${isExpanded ? 'border-neon-green shadow-[0_0_15px_rgba(57,255,20,0.1)]' : 'border-gray-800'} rounded-xl overflow-hidden transition-all duration-300 hover:border-neon-purple cursor-pointer relative`}
              >
                <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1">HOT</div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center text-xs text-gray-500 mb-4 font-mono gap-2">
                    <span className="bg-gray-900 px-2 py-1 rounded text-neon-purple border border-gray-800 uppercase tracking-wider">
                      {art.category[lang]}
                    </span>
                    <span>{art.meta[lang]}</span>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-neon-green transition-colors leading-tight">
                    {art.title[lang]}
                  </h3>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {art.preview[lang]}
                  </p>

                  <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100 mt-6 pt-6 border-t border-dashed border-gray-800' : 'max-h-0 opacity-0'}`}>
                      <div 
                        className="prose prose-invert prose-p:text-gray-300 prose-headings:text-neon-green max-w-none text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: art.body[lang] }} 
                      />
                      
                      <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-900/50">
                        <button 
                            onClick={(e) => handleLike(art.id, e)}
                            className="relative overflow-hidden group/btn flex items-center gap-3 px-6 py-3 bg-black border border-neon-green text-neon-green rounded-sm transition-all hover:bg-neon-green hover:text-black hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] active:scale-95"
                        >
                            <i className="fa-solid fa-thumbs-up group-hover/btn:animate-bounce"></i>
                            <span className="font-mono font-bold text-sm">{isMounted ? (likes[art.id] || 0) : "..."}</span>
                        </button>
                        
                        <button 
                            onClick={triggerCensorship}
                            className="flex items-center gap-3 px-6 py-3 bg-black border border-red-900 text-red-900 rounded-sm transition-all hover:border-red-600 hover:text-red-600 hover:bg-red-600/10 active:scale-95 group/dislike"
                        >
                            <i className="fa-solid fa-thumbs-down group-hover/dislike:rotate-12 transition-transform"></i>
                        </button>

                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                const url = window.location.origin + '#' + art.id;
                                navigator.clipboard.writeText(url);
                                const btn = e.currentTarget;
                                const originalText = btn.innerText;
                                btn.innerText = lang === 'pt' ? 'COPIADO!' : 'COPIED!';
                                setTimeout(() => btn.innerText = originalText, 2000);
                            }}
                            className="flex items-center gap-2 px-6 py-3 border border-gray-800 rounded hover:border-cyan-400 hover:text-cyan-400 transition-all bg-black ml-auto font-mono text-[10px] uppercase tracking-widest text-gray-500"
                        >
                           {lang === "pt" ? "🔗 Copiar Link" : "🔗 Copy Link"}
                        </button>
                    </div>
                  </div>

                  <div className="mt-4 text-neon-purple text-xs font-bold uppercase tracking-wide text-center md:text-left">
                    {isExpanded 
                        ? (lang === "pt" ? "[ FECHAR ARTIGO ]" : "[ CLOSE ARTICLE ]") 
                        : (lang === "pt" ? "[ LER ARTIGO COMPLETO... ]" : "[ READ FULL ARTICLE... ]")
                    }
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        
        <div className="text-center mt-12 text-gray-600 text-xs font-mono">
            {lang === "pt" ? "Sem direitos reservados. Copie, mas não reclame." : "No rights reserved. Copy, but don't complain."}
        </div>
      </div>
    </section>
  );
}