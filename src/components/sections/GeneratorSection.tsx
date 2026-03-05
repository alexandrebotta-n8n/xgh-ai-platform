"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useSFX } from "@/hooks/useSFX";

interface GeneratorProps {
  lang: "pt" | "en";
}

interface TerminalEntry {
  command: string;
  response: string;
  color?: string;
  typed?: boolean;
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const commandsDB = {
  pt: {
    deploy: [
      "Deploy realizado com sucesso! (mentira, mas o log ficou bonito)",
      "Enviando para produção... Pronto. Rezem.",
      "Deploy na sexta-feira 17h45 confirmado. RH notificado para demissão preventiva.",
      "Build passou! (Ignoramos 47 warnings e 3 erros 'non-critical')",
      "Produção atualizada. Tempo estimado até o primeiro incidente: 4 minutos.",
    ],
    blame: [
      "Análise de culpa concluída: Foi o estagiário. (Ele nem trabalha mais aqui.)",
      "git blame retornou: 'A IA fez isso sozinha, eu estava no café.'",
      "Culpado identificado: O dev que saiu da empresa em 2019. Perfeito.",
      "Blame redirected to /dev/null. Ninguém é culpado. O código se escreveu sozinho.",
      "Relatório de culpa: 40% IA, 30% Stack Overflow, 20% sorte, 10% café.",
    ],
    hotfix: [
      "Hotfix aplicado: Comentamos a linha que causava o erro. Problema resolvido para sempre.",
      "Solução emergencial: Adicionamos um sleep(5000) e agora o timeout parece intencional.",
      "Fix: Substituímos o erro por um console.log('tudo bem'). O cliente parou de reclamar.",
      "Hotfix v1: try { bug() } catch { /* isso nunca acontece */ }",
      "Patch de emergência: Revertemos para a versão de 3 meses atrás. Ninguém notou.",
    ],
    debug: [
      "Debug mode ON. Encontrados 0 bugs. (Desligamos os testes para acelerar o processo.)",
      "Depuração completa: O bug não é um bug, é uma feature não-documentada.",
      "console.log('aqui 1'), console.log('aqui 2'), console.log('POR QUE??!')",
      "Stack trace: É culpa da dependência. Qual? Todas.",
      "Bug encontrado na linha 42. Significado da vida confirmado como undefined.",
    ],
    desculpa: [
      "Desculpa gerada: 'A latência da nuvem durante o equinócio solar afetou o deploy.'",
      "'O modelo de IA passou por uma atualização espiritual e rejeitou o código por motivos éticos.'",
      "'Houve uma inversão de polaridade nos microserviços durante a retrospectiva.'",
      "'O Kubernetes decidiu que esse pod não merecia viver. Respeitamos a decisão.'",
      "'O cache estava com saudade dos dados antigos e se recusou a atualizar.'",
    ],
    review: [
      "Code Review: LGTM 👍 (Não li, mas o nome do PR parecia confiável.)",
      "Review: 'Aprovado. Se quebrar, revertemos. Se não quebrar, é mérito meu.'",
      "Parecer técnico: O código está... criativo. Aprovado por fadiga.",
      "Review automatizado: 2.000 linhas analisadas em 0.3s. Tudo perfeito. (Olhamos só o título.)",
      "CR Status: Approved with mass existential doubt but no blocking comments.",
    ],
    random: [],
    help: [],
    clear: [],
  },
  en: {
    deploy: [
      "Deploy successful! (That's a lie, but the log looks pretty)",
      "Pushing to production... Done. Pray.",
      "Friday 5:45 PM deploy confirmed. HR notified for preemptive termination.",
      "Build passed! (We ignored 47 warnings and 3 'non-critical' errors)",
      "Production updated. Estimated time to first incident: 4 minutes.",
    ],
    blame: [
      "Blame analysis complete: It was the intern. (He doesn't even work here anymore.)",
      "git blame returned: 'The AI did it alone, I was getting coffee.'",
      "Culprit identified: The dev who left in 2019. Perfect.",
      "Blame redirected to /dev/null. Nobody's guilty. The code wrote itself.",
      "Blame report: 40% AI, 30% Stack Overflow, 20% luck, 10% coffee.",
    ],
    hotfix: [
      "Hotfix applied: We commented out the line causing the error. Problem solved forever.",
      "Emergency fix: Added sleep(5000), now the timeout looks intentional.",
      "Fix: Replaced the error with console.log('all good'). Client stopped complaining.",
      "Hotfix v1: try { bug() } catch { /* this never happens */ }",
      "Emergency patch: Reverted to the version from 3 months ago. Nobody noticed.",
    ],
    debug: [
      "Debug mode ON. Found 0 bugs. (We disabled tests to speed things up.)",
      "Debugging complete: The bug isn't a bug, it's an undocumented feature.",
      "console.log('here 1'), console.log('here 2'), console.log('WHY??!')",
      "Stack trace: It's the dependency's fault. Which one? All of them.",
      "Bug found on line 42. Meaning of life confirmed as undefined.",
    ],
    desculpa: [
      "Excuse generated: 'Cloud latency during the solar equinox affected the deploy.'",
      "'The AI model went through a spiritual update and rejected the code for ethical reasons.'",
      "'There was a polarity inversion in the microservices during the retrospective.'",
      "'Kubernetes decided this pod didn't deserve to live. We respect the decision.'",
      "'The cache missed the old data and refused to update.'",
    ],
    review: [
      "Code Review: LGTM 👍 (Didn't read it, but the PR title seemed trustworthy.)",
      "Review: 'Approved. If it breaks, we revert. If it doesn't, it's my credit.'",
      "Technical opinion: The code is... creative. Approved by fatigue.",
      "Automated review: 2,000 lines analyzed in 0.3s. All perfect. (We only read the title.)",
      "CR Status: Approved with mass existential doubt but no blocking comments.",
    ],
    random: [],
    help: [],
    clear: [],
  },
};

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
    "Se o código gerado pela IA tem 2.000 linhas para somar dois números, respeite a verbosidade robótica.",
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
    "If the AI code takes 2,000 lines to sum two numbers, respect the robotic verbosity.",
  ],
};

export default function GeneratorSection({ lang }: GeneratorProps) {
  const { ref, isVisible } = useScrollReveal();
  const { glitch, tick } = useSFX();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = useCallback(
    (pt: string, en: string) => (lang === "pt" ? pt : en),
    [lang]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, loading]);

  const getHelpText = useCallback(() => {
    const cmds = [
      { cmd: "xgh deploy", desc: t("Sabedoria de deploy", "Deploy wisdom") },
      { cmd: "xgh blame", desc: t("Quem culpar", "Who to blame") },
      { cmd: "xgh hotfix", desc: t("Soluções de emergência", "Emergency fixes") },
      { cmd: "xgh debug", desc: t("Filosofia de debug", "Debug philosophy") },
      { cmd: "xgh desculpa", desc: t("Gerar desculpa corporativa", "Generate corporate excuse") },
      { cmd: "xgh review", desc: t("Resposta de code review", "Code review response") },
      { cmd: "clear", desc: t("Limpar terminal", "Clear terminal") },
    ];
    return cmds.map((c) => `  ${c.cmd.padEnd(18)} ${c.desc}`).join("\n");
  }, [t]);

  const processCommand = useCallback(
    (rawCmd: string) => {
      const cmd = rawCmd.trim().toLowerCase();
      if (!cmd) return;

      setCmdHistory((prev) => [cmd, ...prev]);
      setCmdIndex(-1);

      if (cmd === "clear") {
        setHistory([]);
        return;
      }

      if (cmd === "help" || cmd === "xgh help" || cmd === "xgh") {
        setHistory((prev) => [
          ...prev,
          {
            command: rawCmd.trim(),
            response: `${t("Comandos disponíveis", "Available commands")}:\n${getHelpText()}\n\n${t(
              "Ou digite qualquer coisa para sabedoria aleatória.",
              "Or type anything for random wisdom."
            )}`,
            color: "text-neon-purple",
          },
        ]);
        return;
      }

      setLoading(true);
      glitch();
      setHistory((prev) => [...prev, { command: rawCmd.trim(), response: "" }]);

      setTimeout(() => {
        const db = commandsDB[lang];
        let response: string;
        let color = "text-white";

        if (cmd === "xgh deploy") {
          response = pick(db.deploy);
          color = "text-neon-green";
        } else if (cmd === "xgh blame") {
          response = pick(db.blame);
          color = "text-yellow-400";
        } else if (cmd === "xgh hotfix") {
          response = pick(db.hotfix);
          color = "text-orange-400";
        } else if (cmd === "xgh debug") {
          response = pick(db.debug);
          color = "text-cyan-400";
        } else if (cmd === "xgh desculpa" || cmd === "xgh excuse") {
          response = pick(db.desculpa);
          color = "text-pink-400";
        } else if (cmd === "xgh review" || cmd === "xgh cr") {
          response = pick(db.review);
          color = "text-emerald-400";
        } else {
          response = pick(gambiarrasDB[lang]);
        }

        setHistory((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            command: rawCmd.trim(),
            response,
            color,
            typed: false,
          };
          return updated;
        });
        setLoading(false);
        setTyping(true);
        setDisplayedText("");

        let charIndex = 0;
        let tickCounter = 0;
        const typeInterval = setInterval(() => {
          charIndex++;
          tickCounter++;
          if (tickCounter % 4 === 0) tick();
          setDisplayedText(response.slice(0, charIndex));
          if (charIndex >= response.length) {
            clearInterval(typeInterval);
            setTyping(false);
            setHistory((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = { ...updated[updated.length - 1], typed: true };
              return updated;
            });
          }
        }, 20);
      }, 600 + Math.random() * 600);
    },
    [lang, t, getHelpText, glitch, tick]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || typing || !input.trim()) return;
    processCommand(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cmdIndex + 1, cmdHistory.length - 1);
      setCmdIndex(next);
      if (cmdHistory[next]) setInput(cmdHistory[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cmdIndex - 1;
      if (next < 0) {
        setCmdIndex(-1);
        setInput("");
      } else {
        setCmdIndex(next);
        setInput(cmdHistory[next]);
      }
    }
  };

  return (
    <section
      id="gambiarra-machine"
      className="py-24 bg-black text-center relative overflow-hidden border-t border-gray-900"
    >
      <div
        ref={ref}
        className={`container mx-auto px-4 max-w-3xl relative z-10 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter">
          <span className="text-neon-purple uppercase italic">XGH</span>{" "}
          Debugger
        </h2>
        <p className="text-gray-500 font-mono text-[10px] mb-10 uppercase tracking-[0.4em]">
          {t(
            "SISTEMA DE SUPORTE À DECISÃO QUESTIONÁVEL",
            "QUESTIONABLE DECISION SUPPORT SYSTEM"
          )}
        </p>

        <div
          className="bg-[#0a0a0a] rounded-lg border border-gray-800 shadow-[0_20px_60px_rgba(0,0,0,1)] flex flex-col relative overflow-hidden group cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title bar */}
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

          {/* Terminal body */}
          <div
            ref={terminalRef}
            className="p-6 md:p-8 text-left font-mono min-h-[280px] max-h-[400px] overflow-y-auto relative z-10 custom-scrollbar"
          >
            {/* Kernel status */}
            <div className="text-neon-purple/40 text-xs mb-4 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-neon-purple animate-pulse"></span>
              {t("KERNEL STATUS: INSTÁVEL", "KERNEL STATUS: UNSTABLE")}
            </div>

            {/* Welcome message */}
            {isMounted && history.length === 0 && !loading && (
              <div className="text-gray-500 text-sm mb-4 leading-relaxed">
                <p className="text-neon-green mb-2">
                  {t(
                    'Bem-vindo ao XGH-CLI. Digite "help" para ver os comandos.',
                    'Welcome to XGH-CLI. Type "help" to see available commands.'
                  )}
                </p>
                <p className="text-gray-700 text-xs">
                  {t(
                    "Ou digite qualquer coisa. Nós não julgamos. (A IA julga.)",
                    "Or type anything. We don't judge. (The AI does.)"
                  )}
                </p>
              </div>
            )}

            {/* Command history */}
            {history.map((entry, i) => {
              const isLast = i === history.length - 1;
              const showText = isLast && !entry.typed ? displayedText : entry.response;
              return (
                <div key={i} className="mb-4">
                  <div className="text-sm flex items-start gap-2">
                    <span className="text-neon-green shrink-0">❯</span>
                    <span className="text-gray-300">{entry.command}</span>
                  </div>
                  {showText && (
                    <div
                      className={`text-sm mt-1 pl-5 leading-relaxed whitespace-pre-wrap ${
                        entry.color || "text-white"
                      }`}
                    >
                      {showText}
                      {isLast && typing && (
                        <span className="inline-block w-2 h-4 bg-neon-green ml-0.5 animate-pulse align-middle"></span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading */}
            {loading && (
              <div className="text-sm text-gray-400 animate-pulse pl-5">
                {t("Alucinando solução...", "Hallucinating solution...")}
              </div>
            )}

            {/* Input line */}
            {isMounted && !loading && !typing && (
              <form onSubmit={handleSubmit} className="flex items-center gap-2 text-sm">
                <span className="text-neon-green shrink-0">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("digite um comando...", "type a command...")}
                  className="flex-1 bg-transparent text-gray-200 outline-none placeholder:text-gray-700 caret-neon-green"
                  autoComplete="off"
                  spellCheck={false}
                  aria-label={t("Entrada do terminal", "Terminal input")}
                />
              </form>
            )}

            {!isMounted && (
              <span className="text-gray-800 text-sm">Booting...</span>
            )}
          </div>

          {/* Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-20 pointer-events-none bg-[length:100%_4px]"></div>
        </div>

        {/* Quick commands */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {[
            { cmd: "xgh deploy", label: "Deploy" },
            { cmd: "xgh blame", label: "Blame" },
            { cmd: "xgh hotfix", label: "Hotfix" },
            { cmd: "xgh debug", label: "Debug" },
            { cmd: "xgh desculpa", label: t("Desculpa", "Excuse") },
            { cmd: "xgh review", label: "Review" },
          ].map((btn) => (
            <button
              key={btn.cmd}
              onClick={() => {
                if (!loading && !typing) processCommand(btn.cmd);
              }}
              disabled={loading || typing}
              className="px-4 py-2 bg-transparent border border-gray-800 text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] transition-all hover:border-neon-green hover:text-neon-green hover:shadow-[0_0_15px_rgba(57,255,20,0.1)] disabled:opacity-30"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#39ff1405_1px,transparent_1px),linear-gradient(to_bottom,#39ff1405_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(circle_at_center,#000_60%,transparent_100%)]"></div>
    </section>
  );
}
