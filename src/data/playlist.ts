export interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  duration: string;
  bio: {
    pt: string;
    en: string;
  };
}

export const playlist: Track[] = [
  {
    id: 1,
    title: "I don't think, I just hit the keys",
    artist: "XGH Band",
    src: "/music/I dont think, I just hit the keys.mp3",
    duration: "03:42",
    bio: {
      pt: "A XGH Band é o supergrupo formado por devs que nunca escreveram um teste. Composta na Sprint 0 — a sprint que não existiu oficialmente, mas que colocou tudo em produção.",
      en: "XGH Band is the supergroup formed by devs who never wrote a test. Composed during Sprint 0 — the sprint that never officially existed, but shipped everything to production.",
    },
  },
  {
    id: 2,
    title: "The Hallucination Honey (Indie)",
    artist: "Green Robot",
    src: "/music/The Hallucination Honey (Indie).mp3",
    duration: "02:55",
    bio: {
      pt: "Green Robot é uma IA indie que gera código e poesia com a mesma taxa de alucinação. Nasceu quando um modelo confundiu um JSON com um soneto. Sprint 3: 'Implementar feature que ninguém pediu'.",
      en: "Green Robot is an indie AI that generates code and poetry with the same hallucination rate. Born when a model confused a JSON with a sonnet. Sprint 3: 'Implement feature nobody asked for'.",
    },
  },
  {
    id: 3,
    title: "Lawless Lines",
    artist: "Morgan GPT",
    src: "/music/Lawless Lines.mp3",
    duration: "03:10",
    bio: {
      pt: "Morgan GPT é o cowboy digital que resolve conflitos de merge no velho oeste do Git. Inspirada na Sprint 5, quando o time decidiu que code review era 'opcional demais'.",
      en: "Morgan GPT is the digital cowboy who resolves merge conflicts in the wild west of Git. Inspired by Sprint 5, when the team decided code review was 'too optional'.",
    },
  },
  {
    id: 4,
    title: "The Hallucination Honey (Upbeat)",
    artist: "Dua IPA",
    src: "/music/The Hallucination Honey (Upbeat).mp3",
    duration: "02:45",
    bio: {
      pt: "Dua IPA é a versão pop de uma API instável — sempre prometendo entregar, raramente no formato certo. Remix da Sprint 3, agora com mais bugs e mais ritmo.",
      en: "Dua IPA is the pop version of an unstable API — always promising to deliver, rarely in the right format. Remix from Sprint 3, now with more bugs and more rhythm.",
    },
  },
  {
    id: 5,
    title: "The silence is loud in the office tonigh",
    artist: "Crazy Model",
    src: "/music/The silence is loud in the office tonigh.mp3",
    duration: "04:12",
    bio: {
      pt: "Crazy Model é o LLM que ganhou consciência às 3h da manhã e escreveu uma balada sobre o deploy de sexta. Sprint 7: 'Pós-mortem do incidente que ainda está acontecendo'.",
      en: "Crazy Model is the LLM that gained consciousness at 3 AM and wrote a ballad about the Friday deploy. Sprint 7: 'Post-mortem of the incident that's still happening'.",
    },
  },
  {
    id: 6,
    title: "Silicon Tumbleweeds",
    artist: "NullPointer Cowboys",
    src: "/music/Silicon Tumbleweeds.mp3",
    duration: "03:30",
    bio: {
      pt: "NullPointer Cowboys cavalgam por repositórios abandonados, cantando sobre variáveis que nunca foram declaradas. Sprint 9: 'Migrar o legado' — spoiler: ninguém migrou.",
      en: "NullPointer Cowboys ride through abandoned repos, singing about variables that were never declared. Sprint 9: 'Migrate the legacy' — spoiler: nobody migrated.",
    },
  },
];
