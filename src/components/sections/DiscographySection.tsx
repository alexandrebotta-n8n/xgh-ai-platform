"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faLink, faChevronDown } from "@fortawesome/free-solid-svg-icons";

// Mantenha a playlist fora do componente para que a referência seja estável
const playlist = [
  {
    id: 1,
    title: "I don't think, I just hit the keys",
    artist: "XGH Band",
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
    duration: "03:30",
    bio: {
      pt: "NullPointer Cowboys cavalgam por repositórios abandonados, cantando sobre variáveis que nunca foram declaradas. Sprint 9: 'Migrar o legado' — spoiler: ninguém migrou.",
      en: "NullPointer Cowboys ride through abandoned repos, singing about variables that were never declared. Sprint 9: 'Migrate the legacy' — spoiler: nobody migrated.",
    },
  },
];

function DiscographyContent({ lang }: { lang: "pt" | "en" }) {
  const searchParams = useSearchParams();
  const [isPlayerPlaying, setIsPlayerPlaying] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedBio, setExpandedBio] = useState<number | null>(null);

  // 1. CAPTURA DO DEEP LINK
  // Usamos searchParams como dependência estável. 
  // O React exige que se você usa searchParams dentro, ele deve estar no array.
  useEffect(() => {
    const trackParam = searchParams.get("track");
    if (trackParam) {
      setActiveTrackId(trackParam);
    }
  }, [searchParams]); 

  // 2. SINCRONIZAÇÃO COM O PLAYER
  useEffect(() => {
    const handleStateChange = (e: any) => {
      if (e.detail) {
        if (typeof e.detail.playing !== 'undefined') {
          setIsPlayerPlaying(e.detail.playing);
        }
        if (e.detail.trackIndex !== undefined) {
          setActiveTrackId((e.detail.trackIndex + 1).toString());
        }
      }
    };

    window.addEventListener('xgh-player-state', handleStateChange);
    return () => window.removeEventListener('xgh-player-state', handleStateChange);
  }, []); // Array vazio é constante aqui, sem problemas.

  const handleTrackSelect = (id: number) => {
    setActiveTrackId(id.toString());
    window.dispatchEvent(new CustomEvent('xgh-force-play-track', { detail: { id } }));
  };

  const copyTrackLink = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}?track=${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="w-full bg-[#050505] border-x-2 border-b-2 border-t-0 border-gray-800 rounded-b-lg overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
      {/* Header */}
      <div className="px-4 py-1.5 bg-gray-900/30 border-b border-gray-800/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className={`w-1 h-1 rounded-full transition-all duration-500 ${activeTrackId && isPlayerPlaying ? 'bg-neon-green shadow-[0_0_8px_#39ff14] animate-pulse' : 'bg-gray-700'}`}></div>
            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-[0.2em]">
                {lang === "pt" ? "Playlist_Expandida" : "Expanded_Playlist"}
            </span>
        </div>
        <span className="text-[8px] font-mono text-gray-700 uppercase">
          {activeTrackId ? (isPlayerPlaying ? `STREAMING_TRACK_0${activeTrackId}` : `PAUSED_TRACK_0${activeTrackId}`) : 'SYSTEM_STANDBY'}
        </span>
      </div>

      {/* Lista */}
      <div className="max-h-[320px] overflow-y-auto custom-scrollbar bg-gradient-to-b from-black to-[#050505]">
        {playlist.map((track) => {
          const isActive = activeTrackId === track.id.toString();
          const isBioOpen = expandedBio === track.id;
          return (
            <div key={track.id} className={`border-b border-gray-800/20 last:border-0 ${isActive ? "bg-neon-green/5" : ""}`}>
              <button
                onClick={() => handleTrackSelect(track.id)}
                className={`group w-full flex items-center justify-between px-4 py-2.5 transition-all text-left ${
                  isActive ? "text-neon-green" : "hover:bg-white/[0.02] text-gray-500 hover:text-gray-300"
                }`}
              >
                <div className="flex items-center gap-4 truncate">
                  <span className={`font-mono text-[9px] w-4 ${isActive ? "text-neon-green font-bold" : "opacity-30 text-gray-600"}`}>
                    {isActive ? "»" : track.id.toString().padStart(2, '0')}
                  </span>
                  <div className="truncate">
                    <h4 className={`text-[11px] font-bold truncate leading-tight ${isActive ? "text-neon-green" : "text-gray-400"}`}>
                      {track.title}
                    </h4>
                    <p className="text-[7px] font-mono opacity-40 uppercase tracking-tighter">{track.artist}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {/* Bio toggle */}
                  <div
                    onClick={(e) => { e.stopPropagation(); setExpandedBio(isBioOpen ? null : track.id); }}
                    className={`p-1.5 cursor-pointer transition-all ${isBioOpen ? 'text-neon-purple opacity-100' : 'text-gray-700 hover:text-neon-purple opacity-30 hover:opacity-100'}`}
                    title={lang === "pt" ? "Sobre o artista" : "About the artist"}
                  >
                    <FontAwesomeIcon icon={faChevronDown} className={`text-[8px] transition-transform duration-300 ${isBioOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <div
                    onClick={(e) => copyTrackLink(e, track.id)}
                    className={`p-1.5 cursor-pointer transition-all ${copiedId === track.id ? 'text-neon-green scale-110' : 'text-gray-700 hover:text-neon-purple opacity-40 hover:opacity-100'}`}
                  >
                    <FontAwesomeIcon icon={copiedId === track.id ? faCheck : faLink} className="text-[10px]" />
                  </div>
                  <span className="text-[8px] font-mono opacity-20">{track.duration}</span>
                  {isActive && (
                    <div className="flex gap-[1.5px] h-3 items-end w-4 justify-end">
                      <div className={`w-[1.5px] bg-neon-green transition-all ${isPlayerPlaying ? 'animate-[bounce_0.8s_infinite] h-full' : 'h-[30%]'}`}></div>
                      <div className={`w-[1.5px] bg-neon-green transition-all ${isPlayerPlaying ? 'animate-[bounce_1.1s_infinite] h-3/4' : 'h-[60%]'}`}></div>
                      <div className={`w-[1.5px] bg-neon-green transition-all ${isPlayerPlaying ? 'animate-[bounce_0.9s_infinite] h-1/2' : 'h-[20%]'}`}></div>
                    </div>
                  )}
                </div>
              </button>

              {/* Bio Panel */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isBioOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 pb-3 pl-12">
                  <div className="border-l border-neon-purple/30 pl-3 py-1">
                    <p className="text-[9px] font-mono text-gray-500 leading-relaxed">
                      {track.bio[lang]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DiscographySection({ lang }: { lang: "pt" | "en" }) {
  return (
    <Suspense fallback={<div className="h-[250px] bg-black border border-gray-800 rounded-b-lg animate-pulse" />}>
      <DiscographyContent lang={lang} />
    </Suspense>
  );
}