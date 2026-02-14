"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const playlist = [
  { id: 1, title: "I don't think, I just hit the keys", artist: "XGH Band", src: "/music/I dont think, I just hit the keys.mp3" },
  { id: 2, title: "The Hallucination Honey (Indie)", artist: "Green Robot", src: "/music/The Hallucination Honey (Indie).mp3" },
  { id: 3, title: "Lawless Lines", artist: "Morgan GPT", src: "/music/Lawless Lines.mp3" },
  { id: 4, title: "The Hallucination Honey (Upbeat)", artist: "Dua IPA", src: "/music/The Hallucination Honey (Upbeat).mp3" },
  { id: 5, title: "The silence is loud in the office tonigh", artist: "Crazy Model", src: "/music/The silence is loud in the office tonigh.mp3" },
  { id: 6, title: "Silicon Tumbleweeds", artist: "NullPointer Cowboys", src: "/music/Silicon Tumbleweeds.mp3" }
];

function PlayerContent() {
  const searchParams = useSearchParams();
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMounted, setIsMounted] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const currentTrack = playlist[currentTrackIndex];

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const dispatchPlayerState = (playing: boolean) => {
    window.dispatchEvent(new CustomEvent('xgh-player-state', { 
      detail: { playing, trackIndex: currentTrackIndex } 
    }));
  };

  // Função restaurada para atualizar o progresso
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const cur = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      setCurrentTime(cur);
      setProgress((cur / dur) * 100);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const trackParam = searchParams.get("track");
    
    if (trackParam) {
      const index = parseInt(trackParam) - 1;
      if (index >= 0 && index < playlist.length) {
        setCurrentTrackIndex(index);
        setIsFirstLoad(false); 

        const startDeepLink = async () => {
          if (audioRef.current) {
            try {
              audioRef.current.load();
              await audioRef.current.play();
              setIsPlaying(true);
              dispatchPlayerState(true);
              window.history.replaceState({}, '', window.location.pathname);
            } catch (err) {
              console.log("Autoplay bloqueado pelo navegador.");
            }
          }
        };
        startDeepLink();
      }
    }

    const handleForcePlay = () => {
      audioRef.current?.play().then(() => {
        setIsPlaying(true);
        dispatchPlayerState(true);
      });
    };

    const handleTrackChange = (e: any) => {
      if (e.detail && e.detail.id) {
        setIsFirstLoad(false);
        setCurrentTrackIndex(e.detail.id - 1);
      }
    };

    window.addEventListener('xgh-force-play', handleForcePlay);
    window.addEventListener('xgh-force-play-track', handleTrackChange);

    return () => {
      window.removeEventListener('xgh-force-play', handleForcePlay);
      window.removeEventListener('xgh-force-play-track', handleTrackChange);
    };
  }, []); 

  const updateTrack = (newIndex: number) => {
    setIsFirstLoad(false);
    setCurrentTrackIndex(newIndex);
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const togglePlay = () => {
    setIsFirstLoad(false);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        dispatchPlayerState(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          dispatchPlayerState(true);
        }).catch(() => {});
      }
    }
  };

  useEffect(() => {
    if (audioRef.current && isMounted && !isFirstLoad) {
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        dispatchPlayerState(true);
      }).catch(() => {
        setIsPlaying(false);
        dispatchPlayerState(false);
      });
    }
  }, [currentTrackIndex, isMounted]);

  const timeLeft = duration - currentTime;

  return (
    <div className="w-full relative">
      <div className="relative bg-black border-2 border-gray-800 rounded-t-lg rounded-b-none border-b-0 overflow-hidden shadow-2xl">
        
        {/* Header Superior */}
        <div className="bg-gray-900 px-4 py-1.5 flex justify-between items-center border-b border-gray-800">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.2em]">XGH_UNIT.01</span>
            <div className="flex items-end gap-[2px] h-3">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`w-[2px] bg-neon-purple ${isPlaying ? 'animate-bounce' : 'h-[2px]'}`} 
                         style={{ 
                            height: isPlaying ? `${Math.floor(Math.random() * 80) + 20}%` : '20%', 
                            animationDuration: `${(i * 0.1) + 0.2}s` 
                         }}>
                    </div>
                ))}
            </div>
        </div>

        {/* Deck de Fita */}
        <div className="h-24 bg-[#050505] flex items-center justify-center gap-10 relative overflow-hidden border-b border-gray-900/50">
            <div className={`relative w-16 h-16 rounded-full border-2 border-gray-800 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
                <div className="w-full h-[1px] bg-gray-900 absolute rotate-45"></div>
                <div className="w-full h-[1px] bg-gray-900 absolute -rotate-45"></div>
                <div className="w-10 h-10 rounded-full border border-neon-purple/10 bg-black flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neon-green/60 shadow-[0_0_8px_#39ff14]"></div>
                </div>
            </div>
            <div className={`relative w-16 h-16 rounded-full border-2 border-gray-800 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
                <div className="w-full h-[1px] bg-gray-900 absolute rotate-45"></div>
                <div className="w-full h-[1px] bg-gray-900 absolute -rotate-45"></div>
                <div className="w-10 h-10 rounded-full border border-neon-purple/10 bg-black flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-neon-green/60 shadow-[0_0_8px_#39ff14]"></div>
                </div>
            </div>
        </div>

        {/* BARRA DE CONTROLE UNIFICADA */}
        <div className="bg-black px-4 py-3 flex items-center justify-between gap-4 border-b border-gray-900">
          <div className="flex items-center gap-3">
            <button onClick={() => updateTrack(currentTrackIndex > 0 ? currentTrackIndex - 1 : playlist.length - 1)} className="text-gray-600 hover:text-neon-green transition-colors">
              <i className="fa-solid fa-backward-step text-xs"></i>
            </button>
            <button onClick={togglePlay} className="w-8 h-8 rounded-full border border-neon-green/50 flex items-center justify-center text-neon-green hover:bg-neon-green hover:text-black transition-all">
              <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-xs ${!isPlaying && 'ml-0.5'}`}></i>
            </button>
            <button onClick={() => updateTrack((currentTrackIndex + 1) % playlist.length)} className="text-gray-600 hover:text-neon-green transition-colors">
              <i className="fa-solid fa-forward-step text-xs"></i>
            </button>
          </div>

          <div className="flex-1 min-w-0 text-center">
            <h3 className="text-white text-[10px] font-bold truncate tracking-tight uppercase">{currentTrack.title}</h3>
            <p className="text-neon-green text-[7px] font-mono tracking-[0.2em] opacity-60 uppercase">{currentTrack.artist}</p>
          </div>

          <div className="flex items-center gap-2 border-l border-gray-800 pl-4">
            <i className={`fa-solid ${volume === 0 ? 'fa-volume-mute text-red-500' : 'fa-volume-low text-gray-600'} text-[10px]`}></i>
            <input 
              type="range" min="0" max="1" step="0.01" value={volume} 
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setVolume(val);
                if(audioRef.current) audioRef.current.volume = val;
              }} 
              className="w-16 h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-neon-green"
            />
          </div>
        </div>

        {/* Barra de Progresso */}
        <div className="w-full bg-black group/progress relative h-1.5">
            <div className="absolute inset-0 bg-gray-900 cursor-pointer" onClick={(e) => {
                if(audioRef.current) {
                  setIsFirstLoad(false);
                  audioRef.current.currentTime = (e.nativeEvent.offsetX / e.currentTarget.clientWidth) * audioRef.current.duration;
                }
            }}></div>
            <div className="h-full bg-neon-green shadow-[0_0_10px_#39ff14] relative pointer-events-none" style={{ width: `${progress}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#fff] opacity-0 group-hover/progress:opacity-100"></div>
            </div>
        </div>

        {/* Footer com Timers */}
        <div className="flex justify-between px-4 py-1.5 bg-black font-mono text-[8px] tracking-widest text-gray-600">
            <span>{formatTime(currentTime)}</span>
            <span className={timeLeft < 10 && isPlaying ? 'text-red-500 animate-pulse' : 'text-neon-purple opacity-40'}>
              {formatTime(duration)}
            </span>
        </div>
        
        <audio 
            ref={audioRef} 
            src={currentTrack.src} 
            onTimeUpdate={handleTimeUpdate} 
            onLoadedMetadata={onLoadedMetadata}
            onEnded={() => updateTrack((currentTrackIndex + 1) % playlist.length)} 
        />
      </div>
    </div>
  );
}

export default function CyberPlayer() {
  return <Suspense fallback={null}><PlayerContent /></Suspense>;
}