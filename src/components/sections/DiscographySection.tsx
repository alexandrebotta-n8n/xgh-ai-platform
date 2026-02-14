"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const playlist = [
  { id: 1, title: "I don't think, I just hit the keys", artist: "XGH Band", duration: "03:42" },
  { id: 2, title: "The Hallucination Honey (Indie)", artist: "Green Robot", duration: "02:55" },
  { id: 3, title: "Lawless Lines", artist: "Morgan GPT", duration: "03:10" },
  { id: 4, title: "The Hallucination Honey (Upbeat)", artist: "Dua IPA", duration: "02:45" },
  { id: 5, title: "The silence is loud in the office tonigh", artist: "Crazy Model", duration: "04:12" },
  { id: 6, title: "Silicon Tumbleweeds", artist: "NullPointer Cowboys", duration: "03:30" }
];

function DiscographyContent({ lang }: { lang: "pt" | "en" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // A 'fonte da verdade' é a URL. Se o player mudar a URL, isso aqui muda sozinho.
  const currentTrackId = searchParams.get("track") || "1";

  const handleTrackSelect = (id: number) => {
    // 1. Atualiza a URL (O player vai reagir a isso no useEffect dele)
    router.push(`?track=${id}`, { scroll: false });
    
    // 2. Dispara o evento de play imediato
    setTimeout(() => {
        window.dispatchEvent(new CustomEvent('xgh-force-play'));
    }, 50);
  };

  return (
    /* border-t-0 garante que não haja uma linha dupla entre o player e a lista */
    <div className="w-full bg-[#050505] border-x-2 border-b-2 border-t-0 border-gray-800 rounded-b-lg overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
      
      {/* Header Integrado */}
      <div className="px-4 py-1.5 bg-gray-900/30 border-b border-gray-800/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-neon-purple rounded-full animate-pulse"></div>
            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-[0.2em]">
                {lang === "pt" ? "Playlist_Expandida" : "Expanded_Playlist"}
            </span>
        </div>
        <span className="text-[8px] font-mono text-gray-700">MOD_01 // TRACK_LIST</span>
      </div>

      {/* Lista Compacta */}
      <div className="max-h-[250px] overflow-y-auto custom-scrollbar bg-gradient-to-b from-black to-[#050505]">
        {playlist.map((track) => {
          const isActive = currentTrackId === track.id.toString();
          return (
            <button
              key={track.id}
              onClick={() => handleTrackSelect(track.id)}
              className={`group w-full flex items-center justify-between px-4 py-2.5 transition-all border-b border-gray-900/50 last:border-0 text-left ${
                isActive 
                ? "bg-neon-green/5 text-neon-green" 
                : "hover:bg-white/[0.02] text-gray-500 hover:text-gray-300"
              }`}
            >
              <div className="flex items-center gap-4 truncate">
                <span className={`font-mono text-[9px] w-4 ${isActive ? "text-neon-green" : "opacity-30"}`}>
                  {isActive ? "»" : track.id.toString().padStart(2, '0')}
                </span>
                <div className="truncate">
                  <h4 className={`text-[11px] font-bold truncate leading-tight ${isActive ? "text-neon-green" : "text-gray-400"}`}>
                    {track.title}
                  </h4>
                  <p className="text-[7px] font-mono opacity-40 uppercase tracking-tighter">
                    {track.artist}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[8px] font-mono opacity-20">{track.duration}</span>
                {isActive && (
                    /* Mini equalizador animado na lista */
                    <div className="flex gap-[1.5px] h-3 items-end">
                        <div className="w-[1.5px] bg-neon-green animate-[bounce_0.8s_infinite] h-full"></div>
                        <div className="w-[1.5px] bg-neon-green animate-[bounce_1.1s_infinite] h-3/4"></div>
                        <div className="w-[1.5px] bg-neon-green animate-[bounce_0.9s_infinite] h-1/2"></div>
                    </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Rack Handle */}
      <div className="h-4 bg-gray-900/20 flex items-center justify-center border-t border-gray-800/30">
        <div className="flex gap-1.5">
            {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-gray-800"></div>)}
        </div>
      </div>
    </div>
  );
}

export default function DiscographySection({ lang }: { lang: "pt" | "en" }) {
  return <Suspense fallback={null}><DiscographyContent lang={lang} /></Suspense>;
}