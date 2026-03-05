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
  isSystem?: boolean;
}

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/* ─── Boot Sequence ─── */
const bootSequence = {
  pt: [
    { text: "XGH-OS v6.6.6 — Inicializando...", delay: 0 },
    { text: "[OK] Carregando kernel gambiarra_core.ko", delay: 400 },
    { text: "[OK] Módulo: cafe_dependency.so (crítico)", delay: 700 },
    { text: "[OK] Módulo: stackoverflow_copypaste.drv", delay: 950 },
    { text: "[WARN] Módulo: testes_unitarios.ko NÃO ENCONTRADO (ignorando)", delay: 1250 },
    { text: "[OK] Módulo: ctrl_c_ctrl_v.sys carregado", delay: 1500 },
    { text: "[OK] Inicializando subsistema de desculpas...", delay: 1800 },
    { text: "[OK] Calibrando gerador de dívida técnica...", delay: 2100 },
    { text: "[WARN] Documentação: 0 arquivos encontrados. Perfeito.", delay: 2400 },
    { text: "[OK] Deploy às cegas habilitado", delay: 2700 },
    { text: "[OK] Nível de pânico do kernel: ESTÁVEL (por enquanto)", delay: 3000 },
    { text: "", delay: 3300 },
    { text: "Sistema pronto. Que Deus tenha piedade.", delay: 3400 },
  ],
  en: [
    { text: "XGH-OS v6.6.6 — Booting...", delay: 0 },
    { text: "[OK] Loading kernel gambiarra_core.ko", delay: 400 },
    { text: "[OK] Module: coffee_dependency.so (critical)", delay: 700 },
    { text: "[OK] Module: stackoverflow_copypaste.drv", delay: 950 },
    { text: "[WARN] Module: unit_tests.ko NOT FOUND (ignoring)", delay: 1250 },
    { text: "[OK] Module: ctrl_c_ctrl_v.sys loaded", delay: 1500 },
    { text: "[OK] Initializing excuse subsystem...", delay: 1800 },
    { text: "[OK] Calibrating tech debt generator...", delay: 2100 },
    { text: "[WARN] Documentation: 0 files found. Perfect.", delay: 2400 },
    { text: "[OK] Blind deploy enabled", delay: 2700 },
    { text: "[OK] Kernel panic level: STABLE (for now)", delay: 3000 },
    { text: "", delay: 3300 },
    { text: "System ready. God have mercy.", delay: 3400 },
  ],
};

/* ─── System Events ─── */
const systemEvents = {
  pt: [
    "WARNING: Vazamento de memória detectado em sentimentos.js",
    "ALERT: Níveis de café CRÍTICOS. Produtividade em queda.",
    "NOTICE: git blame redirecionado para /dev/null por razões legais",
    "WARNING: O estagiário está commitando direto na main",
    "KERNEL PANIC: Resolvido automaticamente. Não pergunte como.",
    "ALERT: Latência do servidor excedeu a paciência humana",
    "WARNING: Variável 'undefined' se identificando como 'feature'",
    "NOTICE: Backup concluído. (Era um echo 'backup' > /dev/null)",
    "WARNING: O deploy de sexta-feira está ganhando senciência",
    "ALERT: Stack Overflow fora do ar. Produtividade nacional: 0%",
  ],
  en: [
    "WARNING: Memory leak detected in feelings.js",
    "ALERT: Coffee levels CRITICAL. Productivity declining.",
    "NOTICE: git blame redirected to /dev/null for legal reasons",
    "WARNING: The intern is committing directly to main",
    "KERNEL PANIC: Self-resolved. Don't ask how.",
    "ALERT: Server latency exceeded human patience",
    "WARNING: Variable 'undefined' identifying as 'feature'",
    "NOTICE: Backup complete. (It was echo 'backup' > /dev/null)",
    "WARNING: Friday deploy is gaining sentience",
    "ALERT: Stack Overflow is down. National productivity: 0%",
  ],
};

/* ─── Command Responses ─── */
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
    audit: [
      `=== AUDITORIA DE SEGURANÇA XGH ===
+-----------------------------+------------+
| Vulnerabilidade             | Severidade |
+-----------------------------+------------+
| SQL injection no login      | FEATURE    |
| Senha hardcoded: 1234       | BAIXA      |
| .env pushado pro GitHub     | COSMÉTICO  |
| Sem HTTPS (caro demais)     | WONTFIX    |
| Painel admin em /admin      | BY DESIGN  |
+-----------------------------+------------+
Resultado: APROVADO (baixamos nossos padrões)`,
      `=== SCAN DE VULNERABILIDADES ===
[████████████████████░] 99%

Encontrados: 847 problemas críticos
Resolvidos:  0
Ignorados:   847
Status:      COMPLIANCE ALCANÇADO (redefinimos compliance)`,
      `=== RELATÓRIO SecOps ===
Firewall:     OFF (atrapalhava o deploy)
Criptografia: ROT13 (dobro de seguro que ROT26)
Auth:         if (password !== "") { allow() }
Pentest:      Cancelado (o pentester chorou)
Veredicto:    SEGURO* (*segundo nossos critérios)`,
    ],
    refactor: [
      "ERRO: 'refactor' não é reconhecido na metodologia XGH. Você quis dizer 'adicionar mais ifs'?",
      "Refatoração negada. O último dev que refatorou nunca mais foi visto.",
      "Impossível refatorar: Código é load-bearing. Não toque em nada.",
      "Refatorar requer testes. Testes requerem documentação. Documentação requer tempo. Tempo requer verba. Requisição negada.",
      "sudo refactor? Boa tentativa. Esse código tem imunidade diplomática.",
    ],
    test: [
      `Rodando XGH Test Suite...
[████████████████████░] 99%

Testes:  0 passou, 0 falhou, 0 total
         (Não escrevemos testes. Escrevemos histórias.)
Tempo:   0.001s (pulamos tudo)
Status:  QUALIDADE BASEADA EM VIBES APROVADA`,
      `Executando testes...
[░░░░░░░░░░░░░░░░░░░░] 0%

ABORTADO: Nenhum teste encontrado.
Sugestão: Considere renomear bugs para "comportamentos alternativos".
Cobertura: NaN% (divisão por zero de testes)`,
      `Suite de Testes XGH:
  ✓ App abre sem explodir (às vezes)
  ✓ Botão existe (não verificamos se funciona)
  ✓ Database retorna algo (não verificamos o quê)
  ✗ Teste de sanidade — FALHOU (sanidade não encontrada)

Resultado: 3/4 passaram. Bom o suficiente.`,
    ],
    standup: [
      `=== DAILY STANDUP ===
Ontem:    Olhei o código. Decidi não tocar.
Hoje:     Vou olhar o código de novo. Talvez adicione um console.log.
Blockers: Crise existencial. E o CI tá quebrado desde março.`,
      `=== DAILY STANDUP ===
Ontem:    Resolvi 1 bug. Criei 3 novos. Saldo: -2.
Hoje:     Vou fingir que o Jira não existe.
Blockers: A IA discorda da minha arquitetura e está certa.`,
      `=== DAILY STANDUP ===
Ontem:    Pair programming com a IA. Eu digitei. Ela julgou.
Hoje:     Vou tentar convencer o PM que "funciona na minha máquina" é critério de aceite.
Blockers: Café acabou. Tudo é blocker agora.`,
    ],
    estimate: [
      "Estimativa: 2 sprints (Fibonacci), mais ou menos 6 meses.",
      "Estimativa completa: Entre 4 horas e a morte térmica do universo.",
      "Fórmula XGH: complexidade × café^(-1) × pânico_do_deadline = NaN dias.",
      "Story points: 13. Dias reais: 89. Fibonacci estava certo o tempo todo.",
      "Estimativa: Pronto até sexta. (Não dissemos qual sexta.)",
    ],
    meeting: [
      `=== RESUMO DA REUNIÃO ===
Duração:      1h (poderia ser um e-mail)
Participantes: 12 (3 acordados)
Decisões:     0
Action items: "Agendar outra reunião para decidir"
Café gasto:   4.7 litros
Slides:       47 (ninguém leu)`,
      `=== ATA DA DAILY ===
09:00 — Daily começa. Ninguém liga a câmera.
09:02 — PM pergunta "quem começa?"
09:03 — Silêncio constrangedor.
09:05 — Alguém diz "tô de mute". Estava.
09:07 — "Ontem mexi no código. Hoje vou mexer mais."
09:08 — Daily acaba. Nada foi resolvido. Perfeito.`,
      `=== REUNIÃO DE PLANNING ===
Sprint Goal:   Entregar tudo (de novo)
Velocidade:    "A mesma de sempre" (ninguém sabe)
Riscos:        Ignorados por unanimidade
Tech Debt:     Mencionada e imediatamente esquecida
Snacks:        Único motivo de comparecimento`,
    ],
    docs: [
      "Documentação gerada: README.md — Conteúdo: 'TODO: escrever README'. Criado em 2019.",
      "Gerando docs... ERRO: Código indecifrável. Nem a IA consegue documentar isso.",
      `=== DOCUMENTAÇÃO DO PROJETO ===
Arquitetura:  "É complicado"
API Docs:     Swagger quebrado desde Q2
Onboarding:   "Pergunta pro João" (João saiu)
Changelog:    git log --oneline (boa sorte)
Comentários:  // TODO: adicionar comentários`,
      "Docs atualizados! Total de páginas: 1. Conteúdo: 'Roda npm start e reza.'",
    ],
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
    audit: [
      `=== XGH SECURITY AUDIT ===
+-----------------------------+----------+
| Vulnerability               | Severity |
+-----------------------------+----------+
| SQL injection in login      | FEATURE  |
| Hardcoded password: 1234    | LOW      |
| .env pushed to GitHub       | COSMETIC |
| No HTTPS (too expensive)    | WONTFIX  |
| Admin panel at /admin       | BY DESIGN|
+-----------------------------+----------+
Result: APPROVED (we lowered our standards)`,
      `=== VULNERABILITY SCAN ===
[████████████████████░] 99%

Found:    847 critical issues
Resolved: 0
Ignored:  847
Status:   COMPLIANCE ACHIEVED (we redefined compliance)`,
      `=== SecOps REPORT ===
Firewall:     OFF (it was blocking deploys)
Encryption:   ROT13 (twice as secure as ROT26)
Auth:         if (password !== "") { allow() }
Pentest:      Cancelled (pentester cried)
Verdict:      SECURE* (*by our standards)`,
    ],
    refactor: [
      "ERROR: 'refactor' is not recognized in XGH methodology. Did you mean 'add more ifs'?",
      "Refactoring denied. The last developer who refactored was never seen again.",
      "Cannot refactor: Code is load-bearing. Touch nothing.",
      "Refactoring requires tests. Tests require documentation. Documentation requires time. Time requires budget. Request denied.",
      "sudo refactor? Nice try. This code has diplomatic immunity.",
    ],
    test: [
      `Running XGH Test Suite...
[████████████████████░] 99%

Tests:  0 passed, 0 failed, 0 total
        (We don't write tests. We write stories.)
Time:   0.001s (we skipped everything)
Status: VIBES-BASED QUALITY ASSURANCE PASSED`,
      `Executing tests...
[░░░░░░░░░░░░░░░░░░░░] 0%

ABORTED: No tests found.
Suggestion: Consider renaming bugs to "alternative behaviors".
Coverage: NaN% (division by zero tests)`,
      `XGH Test Suite:
  ✓ App opens without exploding (sometimes)
  ✓ Button exists (didn't check if it works)
  ✓ Database returns something (didn't check what)
  ✗ Sanity test — FAILED (sanity not found)

Result: 3/4 passed. Good enough.`,
    ],
    standup: [
      `=== DAILY STANDUP ===
Yesterday: Looked at the code. Decided not to touch it.
Today:     Will look at the code again. Might add a console.log.
Blockers:  Existential dread. Also the CI is broken since March.`,
      `=== DAILY STANDUP ===
Yesterday: Fixed 1 bug. Created 3 new ones. Net: -2.
Today:     Will pretend Jira doesn't exist.
Blockers:  The AI disagrees with my architecture and it's right.`,
      `=== DAILY STANDUP ===
Yesterday: Pair programming with AI. I typed. It judged.
Today:     Will try to convince PM that "works on my machine" is acceptance criteria.
Blockers:  Coffee ran out. Everything is a blocker now.`,
    ],
    estimate: [
      "Time estimate: 2 sprints (Fibonacci), give or take 6 months.",
      "Estimation complete: Between 4 hours and heat death of the universe.",
      "XGH formula: complexity * coffee^(-1) * deadline_panic = NaN days.",
      "Story points: 13. Actual days: 89. Fibonacci was right all along.",
      "Estimate: Done by Friday. (We didn't say which Friday.)",
    ],
    meeting: [
      `=== MEETING SUMMARY ===
Duration:      1h (could've been an email)
Participants:  12 (3 awake)
Decisions:     0
Action items:  "Schedule another meeting to decide"
Coffee spent:  4.7 liters
Slides:        47 (nobody read them)`,
      `=== DAILY STANDUP NOTES ===
09:00 — Daily starts. Nobody turns on camera.
09:02 — PM asks "who wants to go first?"
09:03 — Awkward silence.
09:05 — Someone says "I was on mute". They were.
09:07 — "Yesterday I touched the code. Today I'll touch it more."
09:08 — Daily ends. Nothing was resolved. Perfect.`,
      `=== PLANNING MEETING ===
Sprint Goal:   Deliver everything (again)
Velocity:      "Same as always" (nobody knows)
Risks:         Unanimously ignored
Tech Debt:     Mentioned and immediately forgotten
Snacks:        Only reason for attendance`,
    ],
    docs: [
      "Documentation generated: README.md — Content: 'TODO: write README'. Created in 2019.",
      "Generating docs... ERROR: Code is indecipherable. Even the AI can't document this.",
      `=== PROJECT DOCUMENTATION ===
Architecture: "It's complicated"
API Docs:     Swagger broken since Q2
Onboarding:   "Ask João" (João left)
Changelog:    git log --oneline (good luck)
Comments:     // TODO: add comments`,
      "Docs updated! Total pages: 1. Content: 'Run npm start and pray.'",
    ],
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

/* ─── All commands for tab-completion ─── */
const allCommands = [
  "xgh deploy", "xgh blame", "xgh hotfix", "xgh debug",
  "xgh desculpa", "xgh excuse", "xgh review", "xgh audit",
  "xgh refactor", "xgh test", "xgh standup", "xgh estimate",
  "xgh meeting", "xgh docs", "help", "clear", "exit",
];

/* ─── Status bar helpers ─── */
const formatUptime = (s: number) => {
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return `${h}:${m}:${sec}`;
};

export default function GeneratorSection({ lang }: GeneratorProps) {
  const { ref, isVisible } = useScrollReveal();
  const { glitch, error: errorSfx, beep, tick } = useSFX();
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

  // Boot sequence
  const [bootComplete, setBootComplete] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);

  // Status bar
  const [uptime, setUptime] = useState(0);
  const [cmdCount, setCmdCount] = useState(0);
  const [bugsIntroduced, setBugsIntroduced] = useState(0);
  const [panicLevel, setPanicLevel] = useState(0);

  // Glitch effect
  const [glitchActive, setGlitchActive] = useState(false);

  // Tab completion
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // System events timer
  const systemEventTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const glitchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const t = useCallback(
    (pt: string, en: string) => (lang === "pt" ? pt : en),
    [lang]
  );

  // Mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, loading, bootLines]);

  // ─── Boot Sequence ───
  useEffect(() => {
    if (!isMounted) return;

    const sequence = bootSequence[lang];
    const timers: ReturnType<typeof setTimeout>[] = [];

    sequence.forEach((line) => {
      timers.push(
        setTimeout(() => {
          setBootLines((prev) => [...prev, line.text]);
          if (line.text.includes("[WARN]")) errorSfx();
          else if (line.text) tick();
        }, line.delay)
      );
    });

    timers.push(
      setTimeout(() => {
        setBootComplete(true);
        glitch();
      }, 3600)
    );

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  // ─── Uptime Counter ───
  useEffect(() => {
    if (!bootComplete) return;
    const interval = setInterval(() => setUptime((p) => p + 1), 1000);
    return () => clearInterval(interval);
  }, [bootComplete]);

  // ─── Random System Events ───
  const scheduleSystemEvent = useCallback(() => {
    if (systemEventTimer.current) clearTimeout(systemEventTimer.current);
    const delay = 15000 + Math.random() * 30000;
    systemEventTimer.current = setTimeout(() => {
      const msg = pick(systemEvents[lang]);
      const isKernel = msg.includes("KERNEL PANIC");
      if (isKernel) errorSfx();
      else glitch();

      setHistory((prev) => [
        ...prev,
        {
          command: "",
          response: `[SYSTEM] ${msg}`,
          color: isKernel
            ? "text-red-500 animate-pulse"
            : msg.includes("WARNING")
              ? "text-yellow-400"
              : msg.includes("ALERT")
                ? "text-orange-400"
                : "text-gray-500",
          typed: true,
          isSystem: true,
        },
      ]);
      scheduleSystemEvent();
    }, delay);
  }, [lang, errorSfx, glitch]);

  useEffect(() => {
    if (bootComplete) scheduleSystemEvent();
    return () => {
      if (systemEventTimer.current) clearTimeout(systemEventTimer.current);
    };
  }, [bootComplete, scheduleSystemEvent]);

  // ─── Random Glitch Effect ───
  useEffect(() => {
    if (!bootComplete) return;

    const triggerGlitch = () => {
      setGlitchActive(true);
      glitch();
      setTimeout(() => setGlitchActive(false), 300);
    };

    const scheduleNext = () => {
      const delay = 20000 + Math.random() * 40000;
      glitchTimer.current = setTimeout(() => {
        triggerGlitch();
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => {
      if (glitchTimer.current) clearTimeout(glitchTimer.current);
    };
  }, [bootComplete, glitch]);

  // ─── Panic Level Helpers ───
  const getPanicLabel = useCallback(
    (level: number) => {
      if (level < 20) return t("ESTÁVEL", "STABLE");
      if (level < 40) return t("PREOCUPANTE", "CONCERNING");
      if (level < 60) return t("CRÍTICO", "CRITICAL");
      if (level < 80) return t("CATASTRÓFICO", "CATASTROPHIC");
      return t("DEUS_NOS_AJUDE", "GOD_HELP_US");
    },
    [t]
  );

  const getPanicColor = (level: number) => {
    if (level < 20) return "text-neon-green";
    if (level < 40) return "text-yellow-400";
    if (level < 60) return "text-orange-400";
    if (level < 80) return "text-red-400";
    return "text-red-600 animate-pulse";
  };

  // ─── Help Text ───
  const getHelpText = useCallback(() => {
    const cmds = [
      { cmd: "xgh deploy", desc: t("Sabedoria de deploy", "Deploy wisdom") },
      { cmd: "xgh blame", desc: t("Quem culpar", "Who to blame") },
      { cmd: "xgh hotfix", desc: t("Soluções de emergência", "Emergency fixes") },
      { cmd: "xgh debug", desc: t("Filosofia de debug", "Debug philosophy") },
      { cmd: "xgh desculpa", desc: t("Gerar desculpa corporativa", "Generate corporate excuse") },
      { cmd: "xgh review", desc: t("Resposta de code review", "Code review response") },
      { cmd: "xgh audit", desc: t("Auditoria de segurança", "Security audit") },
      { cmd: "xgh refactor", desc: t("Tentar refatorar", "Try to refactor") },
      { cmd: "xgh test", desc: t("Rodar testes", "Run tests") },
      { cmd: "xgh standup", desc: t("Gerar standup", "Generate standup update") },
      { cmd: "xgh estimate", desc: t("Estimar tarefa", "Estimate task") },
      { cmd: "xgh meeting", desc: t("Resumo de reunião", "Meeting summary") },
      { cmd: "xgh docs", desc: t("Gerar documentação", "Generate docs") },
      { cmd: "clear", desc: t("Limpar terminal", "Clear terminal") },
    ];
    return cmds.map((c) => `  ${c.cmd.padEnd(18)} ${c.desc}`).join("\n");
  }, [t]);

  // ─── Process Command ───
  const processCommand = useCallback(
    (rawCmd: string) => {
      const cmd = rawCmd.trim().toLowerCase();
      if (!cmd) return;

      setCmdHistory((prev) => [cmd, ...prev]);
      setCmdIndex(-1);
      setCmdCount((p) => p + 1);
      setBugsIntroduced((p) => p + Math.floor(Math.random() * 5) + 1);
      setPanicLevel((p) => Math.min(p + Math.floor(Math.random() * 8) + 2, 100));

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

      // Easter eggs — instant response, no loading
      let easterEgg: { response: string; color: string } | null = null;

      if (cmd === "exit" || cmd === "quit") {
        easterEgg = {
          response: t(
            "Não existe saída do XGH. Apenas deploy.",
            "There is no exit from XGH. Only deploy."
          ),
          color: "text-yellow-400",
        };
      } else if (cmd === "rm -rf /" || cmd === "rm -rf /*") {
        easterEgg = {
          response: t(
            "Boa tentativa. O código XGH é imortal. Ele vive no Stack Overflow.",
            "Nice try. XGH code is immortal. It lives in Stack Overflow."
          ),
          color: "text-red-400",
        };
      } else if (cmd.startsWith("sudo ")) {
        easterEgg = {
          response: t(
            "Permissão negada. XGH não precisa de permissão. Permissão é burocracia.",
            "Permission denied. XGH doesn't need permission. Permission is bureaucracy."
          ),
          color: "text-red-400",
        };
      }

      if (easterEgg) {
        errorSfx();
        setHistory((prev) => [
          ...prev,
          { command: rawCmd.trim(), response: easterEgg.response, color: easterEgg.color, typed: true },
        ]);
        return;
      }

      // Normal command with loading + typing animation
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
        } else if (cmd === "xgh audit") {
          response = pick(db.audit);
          color = "text-red-400";
        } else if (cmd === "xgh refactor") {
          response = pick(db.refactor);
          color = "text-orange-400";
        } else if (cmd === "xgh test" || cmd === "xgh tests") {
          response = pick(db.test);
          color = "text-cyan-400";
        } else if (cmd === "xgh standup") {
          response = pick(db.standup);
          color = "text-blue-400";
        } else if (cmd === "xgh estimate") {
          response = pick(db.estimate);
          color = "text-yellow-400";
        } else if (cmd === "xgh meeting") {
          response = pick(db.meeting);
          color = "text-purple-400";
        } else if (cmd === "xgh docs" || cmd === "xgh doc") {
          response = pick(db.docs);
          color = "text-gray-400";
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

        // Adaptive typing speed
        const typeSpeed = response.length > 200 ? 8 : response.length > 100 ? 14 : 20;

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
        }, typeSpeed);
      }, 600 + Math.random() * 600);
    },
    [lang, t, getHelpText, glitch, errorSfx, tick]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || typing || !input.trim()) return;
    setSuggestions([]);
    processCommand(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Tab completion
    if (e.key === "Tab") {
      e.preventDefault();
      const val = input.trim().toLowerCase();
      if (!val) return;

      const matches = allCommands.filter((c) => c.startsWith(val));
      if (matches.length === 1) {
        setInput(matches[0]);
        setSuggestions([]);
        beep();
      } else if (matches.length > 1) {
        setSuggestions(matches);
        beep();
        const commonPrefix = matches.reduce((prefix, cmd) => {
          while (!cmd.startsWith(prefix)) prefix = prefix.slice(0, -1);
          return prefix;
        }, matches[0]);
        if (commonPrefix.length > val.length) setInput(commonPrefix);
      } else {
        setSuggestions([]);
      }
      return;
    }

    if (suggestions.length > 0) setSuggestions([]);

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
          className={`bg-[#0a0a0a] rounded-lg border border-gray-800 shadow-[0_20px_60px_rgba(0,0,0,1)] flex flex-col relative overflow-hidden group cursor-text ${
            glitchActive ? "terminal-glitch-active" : ""
          }`}
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
            {/* Boot sequence */}
            {isMounted && !bootComplete && (
              <div className="text-xs space-y-0.5">
                {bootLines.map((line, i) => (
                  <div
                    key={i}
                    className={`font-mono ${
                      line.includes("[WARN]")
                        ? "text-yellow-400"
                        : line.includes("[OK]")
                          ? "text-neon-green/70"
                          : line === ""
                            ? ""
                            : "text-neon-purple"
                    }`}
                  >
                    {line}
                  </div>
                ))}
                <span className="inline-block w-2 h-3 bg-neon-green animate-pulse" />
              </div>
            )}

            {/* After boot */}
            {isMounted && bootComplete && (
              <>
                {/* Kernel status */}
                <div className="text-neon-purple/40 text-xs mb-4 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-neon-purple animate-pulse"></span>
                  {t("KERNEL STATUS: INSTÁVEL", "KERNEL STATUS: UNSTABLE")}
                </div>

                {/* Welcome message */}
                {history.length === 0 && !loading && (
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
                  const showText =
                    isLast && !entry.typed ? displayedText : entry.response;

                  // System event
                  if (entry.isSystem) {
                    return (
                      <div
                        key={i}
                        className={`mb-2 text-[11px] font-mono ${entry.color} border-l-2 border-current pl-3 opacity-70`}
                      >
                        {entry.response}
                      </div>
                    );
                  }

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

                {/* Tab suggestions */}
                {suggestions.length > 0 && (
                  <div className="text-[10px] text-gray-600 pl-5 mb-1 font-mono">
                    {suggestions.join("  ")}
                  </div>
                )}

                {/* Input line */}
                {!loading && !typing && (
                  <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-2 text-sm"
                  >
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
              </>
            )}

            {!isMounted && (
              <span className="text-gray-800 text-sm">Booting...</span>
            )}
          </div>

          {/* Status bar */}
          {bootComplete && (
            <div className="flex items-center justify-between px-5 py-2 bg-[#080808] border-t border-gray-800/50 font-mono text-[9px] uppercase tracking-wider relative z-10 shrink-0">
              <span className="text-gray-600">
                Uptime:{" "}
                <span className="text-gray-400">{formatUptime(uptime)}</span>
              </span>
              <span className="text-gray-600">
                Cmds: <span className="text-neon-green">{cmdCount}</span>
              </span>
              <span className="text-gray-600">
                Bugs: <span className="text-neon-purple">{bugsIntroduced}</span>
              </span>
              <span className="text-gray-600">
                Panic:{" "}
                <span className={getPanicColor(panicLevel)}>
                  {getPanicLabel(panicLevel)}
                </span>
              </span>
            </div>
          )}

          {/* Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-20 pointer-events-none bg-[length:100%_4px]"></div>
        </div>

        {/* Quick commands */}
        <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {[
            { cmd: "xgh deploy", label: "Deploy" },
            { cmd: "xgh blame", label: "Blame" },
            { cmd: "xgh hotfix", label: "Hotfix" },
            { cmd: "xgh debug", label: "Debug" },
            { cmd: "xgh desculpa", label: t("Desculpa", "Excuse") },
            { cmd: "xgh review", label: "Review" },
            { cmd: "xgh audit", label: "Audit" },
            { cmd: "xgh test", label: "Test" },
            { cmd: "xgh standup", label: "Standup" },
            { cmd: "xgh estimate", label: "Estimate" },
            { cmd: "xgh meeting", label: "Meeting" },
            { cmd: "xgh docs", label: "Docs" },
          ].map((btn) => (
            <button
              key={btn.cmd}
              onClick={() => {
                if (!loading && !typing && bootComplete) processCommand(btn.cmd);
              }}
              disabled={loading || typing || !bootComplete}
              className="py-2 bg-transparent border border-gray-800 text-gray-500 font-mono text-[10px] uppercase tracking-[0.2em] transition-all hover:border-neon-green hover:text-neon-green hover:shadow-[0_0_15px_rgba(57,255,20,0.1)] disabled:opacity-30"
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
