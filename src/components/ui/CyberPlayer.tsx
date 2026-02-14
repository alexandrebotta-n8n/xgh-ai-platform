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

  useEffect(() => {
    setIsMounted(true);
    const trackParam = searchParams.get("track");
    
    // TRATAMENTO DE DEEP LINK
    if (trackParam) {
      const index = parseInt(trackParam) - 1;
      if (index >= 0 && index < playlist.length) {
        setCurrentTrackIndex(index);
        setIsFirstLoad(false); 

        // Aguarda o elemento de áudio estar pronto para tocar e limpar a URL
        const startDeepLink = async () => {
          if (audioRef.current) {
            try {
              audioRef.current.load();
              await audioRef.current.play();
              setIsPlaying(true);
              dispatchPlayerState(true);
              // SÓ LIMPA A URL APÓS O PLAY TER SUCESSO
              window.history.replaceState({}, '', window.location.pathname);
            } catch (err) {
              console.log("Autoplay bloqueado. Aguardando interação.");
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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const cur = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      setCurrentTime(cur);
      setProgress((cur / dur) * 100);
    }
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
      <div className="relative bg-black border-2 border-gray-800 rounded-t-lg rounded-b-none border-b-0 overflow-hidden">
        {/* Header do Rack */}
        <div className="bg-gray-900 px-4 py-2 flex justify-between items-center border-b border-gray-800">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">XGH_AMP v1.0</span>
            <div className="flex items-end gap-[2px] h-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`w-1 bg-neon-purple ${isPlaying ? 'animate-bounce' : 'h-1'}`} style={{ height: isPlaying && isMounted ? `${Math.floor(Math.random() * 80) + 20}%` : '20%', animationDuration: `${(i * 0.15) + 0.2}s` }}></div>
                ))}
            </div>
        </div>

        {/* Deck de Fita */}
        <div className="h-28 bg-[#0a0a0a] border-b border-gray-900 flex items-center justify-center gap-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(90deg,transparent_0%,#39ff14_50%,transparent_100%)] bg-[length:200%_100%]"></div>
            <div className={`relative w-20 h-20 rounded-full border-4 border-gray-800 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
                <div className="w-full h-[1px] bg-gray-800 absolute rotate-0"></div>
                <div className="w-full h-[1px] bg-gray-800 absolute rotate-45"></div>
                <div className="w-full h-[1px] bg-gray-800 absolute rotate-90"></div>
                <div className="w-14 h-14 rounded-full border border-neon-purple/20 bg-black flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-neon-green/80 shadow-[0_0_10px_#39ff14]"></div>
                </div>
            </div>
            <div className={`relative w-20 h-20 rounded-full border-4 border-gray-800 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
                <div className="w-full h-[1px] bg-gray-800 absolute rotate-0"></div>
                <div className="w-full h-[1px] bg-gray-800 absolute rotate-45"></div>
                <div className="w-full h-[1px] bg-gray-800 absolute rotate-90"></div>
                <div className="w-14 h-14 rounded-full border border-neon-purple/20 bg-black flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-neon-green/80 shadow-[0_0_10px_#39ff14]"></div>
                </div>
            </div>
        </div>
        
        {/* Info da Música */}
        <div className="p-4 text-center bg-black border-t border-gray-900/50">
            <h3 className="text-white font-bold truncate text-sm tracking-tight">{currentTrack.title}</h3>
            <p className="text-neon-green text-[9px] font-mono mt-1 uppercase tracking-widest opacity-80">{currentTrack.artist}</p>
        </div>

        {/* Progresso */}
        <div className="w-full bg-black">
            <div className="flex justify-between px-4 py-1 font-mono text-[9px] uppercase tracking-tighter text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span className={`${timeLeft < 10 && isPlaying ? 'text-red-500 animate-pulse' : 'text-neon-purple'}`}>
                    -{formatTime(timeLeft)}
                </span>
            </div>
            <div className="w-full h-1.5 bg-gray-900 cursor-pointer relative" onClick={(e) => {
                if(audioRef.current) {
                  setIsFirstLoad(false);
                  audioRef.current.currentTime = (e.nativeEvent.offsetX / e.currentTarget.clientWidth) * audioRef.current.duration;
                }
            }}>
                <div className="h-full bg-neon-green shadow-[0_0_10px_#39ff14]" style={{ width: `${progress}%` }}></div>
            </div>
        </div>

        {/* CONTROLES */}
        <div className="bg-black p-5 flex items-center justify-between">
            <div className="w-12 hidden md:block"></div>
            <div className="flex items-center gap-8 justify-center flex-1">
                <button onClick={() => updateTrack(currentTrackIndex > 0 ? currentTrackIndex - 1 : playlist.length - 1)} className="text-gray-500 hover:text-neon-green transition-colors">
                    <i className="fa-solid fa-backward-step text-xl"></i>
                </button>
                <button onClick={togglePlay} className="w-14 h-14 rounded-full border-2 border-neon-green flex items-center justify-center text-neon-green hover:bg-neon-green hover:text-black hover:shadow-[0_0_20px_#39ff14] transition-all relative z-10">
                    <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-2xl`}></i>
                </button>
                <button onClick={() => updateTrack((currentTrackIndex + 1) % playlist.length)} className="text-gray-500 hover:text-neon-green transition-colors">
                    <i className="fa-solid fa-forward-step text-xl"></i>
                </button>
            </div>
            <div className="flex flex-col items-center gap-2 border-l border-gray-800 pl-4">
                <div className="relative h-20 flex items-center">
                    <input 
                        type="range" 
                        min="0" max="1" step="0.01" 
                        value={volume} 
                        onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setVolume(val);
                            if(audioRef.current) audioRef.current.volume = val;
                        }} 
                        className="volume-slider-vertical cursor-pointer" 
                    />
                </div>
                <i className={`fa-solid ${volume === 0 ? 'fa-volume-mute text-red-500' : 'fa-volume-high text-gray-500'} text-[10px]`}></i>
            </div>
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