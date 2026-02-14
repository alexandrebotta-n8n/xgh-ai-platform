"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Mantenha a playlist fora do componente para que a referência seja estável
const playlist = [
  { id: 1, title: "I don't think, I just hit the keys", artist: "XGH Band", duration: "03:42" },
  { id: 2, title: "The Hallucination Honey (Indie)", artist: "Green Robot", duration: "02:55" },
  { id: 3, title: "Lawless Lines", artist: "Morgan GPT", duration: "03:10" },
  { id: 4, title: "The Hallucination Honey (Upbeat)", artist: "Dua IPA", duration: "02:45" },
  { id: 5, title: "The silence is loud in the office tonigh", artist: "Crazy Model", duration: "04:12" },
  { id: 6, title: "Silicon Tumbleweeds", artist: "NullPointer Cowboys", duration: "03:30" }
];

function DiscographyContent({ lang }: { lang: "pt" | "en" }) {
  const searchParams = useSearchParams();
  const [isPlayerPlaying, setIsPlayerPlaying] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

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
      <div className="max-h-[250px] overflow-y-auto custom-scrollbar bg-gradient-to-b from-black to-[#050505]">
        {playlist.map((track) => {
          const isActive = activeTrackId === track.id.toString();
          return (
            <button
              key={track.id}
              onClick={() => handleTrackSelect(track.id)}
              className={`group w-full flex items-center justify-between px-4 py-2.5 transition-all border-b border-gray-800/20 last:border-0 text-left ${
                isActive ? "bg-neon-green/5 text-neon-green" : "hover:bg-white/[0.02] text-gray-500 hover:text-gray-300"
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
                <div 
                  onClick={(e) => copyTrackLink(e, track.id)}
                  className={`p-1.5 cursor-pointer transition-all ${copiedId === track.id ? 'text-neon-green scale-110' : 'text-gray-700 hover:text-neon-purple opacity-40 hover:opacity-100'}`}
                >
                  <i className={`fa-solid ${copiedId === track.id ? 'fa-check' : 'fa-link'} text-[10px]`}></i>
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