"use client";

import { useState, useRef, useEffect } from "react";

// --- PLAYLIST EXCLUSIVA SUNO ---
const playlist = [
  {
    title: "I don't think, I just hit the keys",
    artist: "XGH Band",
    src: "/music/I dont think, I just hit the keys.mp3",
  },
  {
    title: "The Hallucination Honey (Indie)",
    artist: "Green Robot",
    src: "/music/The Hallucination Honey (Indie).mp3",
  },
  {
    title: "Lawless Lines",
    artist: "Morgan GPT",
    src: "/music/Lawless Lines.mp3",
  },
  {
    title: "The Hallucination Honey (Upbeat)",
    artist: "Dua IPA",
    src: "/music/The Hallucination Honey (Upbeat).mp3",
  },
  {
    title: "The silence is loud in the office tonigh",
    artist: "Crazy Model",
    src: "/music/The silence is loud in the office tonigh.mp3",
  },
  {
    title: "Silicon Tumbleweeds",
    artist: "NullPointer Cowboys",
    src: "/music/Silicon Tumbleweeds.mp3",
  }
];

export default function CyberPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  
  // Correção de Hidratação: Garantir que valores randômicos só existam no cliente
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentTrack = playlist[currentTrackIndex];

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    let newIndex = currentTrackIndex + 1;
    if (newIndex >= playlist.length) newIndex = 0;
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    let newIndex = currentTrackIndex - 1;
    if (newIndex < 0) newIndex = playlist.length - 1;
    setCurrentTrackIndex(newIndex);
    setIsPlaying(true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Autoplay blocked"));
      }
    }
  }, [currentTrackIndex]);

  return (
    <div className="w-full max-w-md mx-auto my-8 relative group z-20">
      
      {/* Background Glow */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-neon-green to-neon-purple blur-lg transition duration-1000 ${isPlaying ? 'opacity-60 animate-pulse' : 'opacity-20'}`}></div>

      <div className="relative bg-black border-2 border-gray-800 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
        
        {/* Header do Player */}
        <div className="bg-gray-900 px-4 py-2 flex justify-between items-center border-b border-gray-800">
            <div className="flex items-center gap-2">
                <i className="fa-solid fa-music text-neon-green text-xs"></i>
                <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">XGH_AMP v1.0</span>
            </div>
            {/* Equalizer Bars - Hidratação corrigida */}
            <div className="flex items-end gap-[2px] h-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                        key={i} 
                        className={`w-1 bg-neon-purple transition-all duration-100 ${isPlaying ? 'animate-bounce' : 'h-1'}`}
                        style={{ 
                            // Determinístico no Server, Randômico no Client após mount
                            height: isPlaying && isMounted ? `${Math.floor(Math.random() * 80) + 20}%` : '20%', 
                            animationDuration: isMounted ? `${(i * 0.15) + 0.2}s` : '0.5s' 
                        }}
                    ></div>
                ))}
            </div>
        </div>

        {/* Info da Faixa */}
        <div className="p-6 text-center bg-black relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <h3 className="text-white font-bold text-lg tracking-tight truncate relative z-10">{currentTrack.title}</h3>
            <p className="text-neon-green text-[10px] font-mono uppercase tracking-[0.3em] mt-2 relative z-10">{currentTrack.artist}</p>
        </div>

        {/* Barra de Progresso */}
        <div className="w-full h-1.5 bg-gray-900 cursor-pointer relative group/progress" onClick={(e) => {
            const width = e.currentTarget.clientWidth;
            const clickX = e.nativeEvent.offsetX;
            const duration = audioRef.current?.duration || 0;
            if(audioRef.current) audioRef.current.currentTime = (clickX / width) * duration;
        }}>
            <div 
                className="h-full bg-neon-green shadow-[0_0_15px_#39ff14] relative transition-all duration-100" 
                style={{ width: `${progress}%` }}
            >
                <div className="absolute right-0 -top-1 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 shadow-[0_0_10px_white] transition-opacity"></div>
            </div>
        </div>

        {/* Controles */}
        <div className="bg-black p-5 flex flex-col gap-5">
            
            <div className="flex justify-center items-center gap-8">
                <button onClick={prevTrack} className="text-gray-500 hover:text-neon-green transition-all hover:scale-110">
                    <i className="fa-solid fa-backward-step text-xl"></i>
                </button>
                
                <button 
                    onClick={togglePlay} 
                    className="w-14 h-14 rounded-full border-2 border-neon-green flex items-center justify-center text-neon-green hover:bg-neon-green hover:text-black hover:shadow-[0_0_25px_#39ff14] transition-all active:scale-90"
                >
                    <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'} text-2xl ${!isPlaying ? 'ml-1' : ''}`}></i>
                </button>
                
                <button onClick={nextTrack} className="text-gray-500 hover:text-neon-green transition-all hover:scale-110">
                    <i className="fa-solid fa-forward-step text-xl"></i>
                </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-4 px-2">
                <i className="fa-solid fa-volume-off text-gray-600 text-[10px]"></i>
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume} 
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-neon-purple"
                />
                <i className="fa-solid fa-volume-high text-gray-600 text-[10px]"></i>
            </div>
        </div>

        <audio 
            ref={audioRef} 
            src={currentTrack.src} 
            onTimeUpdate={handleTimeUpdate}
            onEnded={nextTrack}
        />
      </div>
    </div>
  );
}