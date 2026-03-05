"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep, faForwardStep, faPause, faPlay, faVolumeXmark, faVolumeLow } from "@fortawesome/free-solid-svg-icons";

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
              setIsPlaying(false);
              dispatchPlayerState(false);
            }
          }
        };
        startDeepLink();
      }
    }

    const handleForcePlay = () => {
      if (audioRef.current) {
         const playPromise = audioRef.current.play();
         if (playPromise !== undefined) {
             playPromise.then(() => {
                 setIsPlaying(true);
                 dispatchPlayerState(true);
             }).catch(err => {
                 console.log("Android ForcePlay block:", err);
                 setIsPlaying(false);
                 dispatchPlayerState(false);
             });
         }
      }
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
        const playPromise = audioRef.current.play();
        
        // Tratamento XGH para Android
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            dispatchPlayerState(true);
          }).catch(error => {
            console.warn("Autoplay bloqueado (Android Policy):", error);
            // Reverte o estado visual para manter sincronia
            setIsPlaying(false);
            dispatchPlayerState(false);
          });
        }
      }
    }
  };

  useEffect(() => {
    if (audioRef.current && isMounted && !isFirstLoad) {
      audioRef.current.load();
      const playPromise = audioRef.current.play();
      
      // Tratamento XGH para Android na troca de música
      if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            dispatchPlayerState(true);
          }).catch((error) => {
            console.warn("Autoplay bloqueado ao trocar faixa:", error);
            setIsPlaying(false);
            dispatchPlayerState(false);
          });
      }
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

        {/* Deck de Fita Cassete — 80s Style */}
        <div className="h-28 bg-[#050505] flex items-center justify-center relative overflow-hidden border-b border-gray-900/50">
            {/* Janela transparente do cassete */}
            <div className="absolute inset-x-8 inset-y-2 rounded-lg border border-gray-800/40 bg-gray-950/50" />

            {/* Fita conectando os dois rolos */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[52px]">
              {/* Trilha superior da fita */}
              <div className="absolute top-0 left-[10px] right-[10px] h-[1px] bg-gradient-to-r from-amber-900/60 via-amber-800/40 to-amber-900/60" />
              {/* Trilha inferior da fita */}
              <div className="absolute bottom-0 left-[10px] right-[10px] h-[1px] bg-gradient-to-r from-amber-900/60 via-amber-800/40 to-amber-900/60" />
              {/* Corpo da fita (preenchimento sutil) */}
              <div className="absolute inset-0 mx-[10px] bg-gradient-to-b from-amber-950/10 via-amber-900/5 to-amber-950/10" />
            </div>

            {/* Rolo esquerdo (supply — mais fita) */}
            <div className="relative z-10 mr-14">
              {/* Anel externo — simulando a fita enrolada */}
              <div className={`relative w-[72px] h-[72px] rounded-full border-[3px] border-amber-900/30 bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] ${isPlaying ? 'animate-spin-slow' : ''}`}>
                {/* Trilhas concêntricas da fita magnética */}
                <div className="absolute inset-[4px] rounded-full border border-amber-900/15" />
                <div className="absolute inset-[8px] rounded-full border border-amber-900/10" />
                <div className="absolute inset-[12px] rounded-full border border-amber-900/8" />
                {/* Hub central */}
                <div className="w-8 h-8 rounded-full border-2 border-gray-700 bg-black flex items-center justify-center relative">
                  {/* Spokes do hub (6 raios) */}
                  <div className="absolute w-full h-[1px] bg-gray-700/80" />
                  <div className="absolute w-full h-[1px] bg-gray-700/80 rotate-60" style={{ transform: 'rotate(60deg)' }} />
                  <div className="absolute w-full h-[1px] bg-gray-700/80 rotate-120" style={{ transform: 'rotate(120deg)' }} />
                  {/* Centro */}
                  <div className="w-2.5 h-2.5 rounded-full bg-neon-green/70 shadow-[0_0_10px_#39ff14,0_0_3px_#39ff14] z-10" />
                </div>
              </div>
            </div>

            {/* Rolo direito (take-up — menos fita) */}
            <div className="relative z-10 ml-14">
              <div className={`relative w-[72px] h-[72px] rounded-full border-[3px] border-amber-900/20 bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] ${isPlaying ? 'animate-spin-slower' : ''}`}>
                {/* Menos trilhas (menos fita nesse rolo) */}
                <div className="absolute inset-[6px] rounded-full border border-amber-900/10" />
                <div className="absolute inset-[12px] rounded-full border border-amber-900/8" />
                {/* Hub central */}
                <div className="w-8 h-8 rounded-full border-2 border-gray-700 bg-black flex items-center justify-center relative">
                  {/* Spokes do hub */}
                  <div className="absolute w-full h-[1px] bg-gray-700/80" />
                  <div className="absolute w-full h-[1px] bg-gray-700/80" style={{ transform: 'rotate(60deg)' }} />
                  <div className="absolute w-full h-[1px] bg-gray-700/80" style={{ transform: 'rotate(120deg)' }} />
                  {/* Centro */}
                  <div className="w-2.5 h-2.5 rounded-full bg-neon-green/70 shadow-[0_0_10px_#39ff14,0_0_3px_#39ff14] z-10" />
                </div>
              </div>
            </div>

            {/* Guias da fita (pinos laterais) */}
            <div className="absolute left-[52px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-600 border border-gray-500 shadow-[0_0_3px_rgba(255,255,255,0.1)]" />
            <div className="absolute right-[52px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-600 border border-gray-500 shadow-[0_0_3px_rgba(255,255,255,0.1)]" />

            {/* Cantos decorativos do deck */}
            <div className="absolute top-2 left-3 w-1 h-1 rounded-full bg-gray-800" />
            <div className="absolute top-2 right-3 w-1 h-1 rounded-full bg-gray-800" />
            <div className="absolute bottom-2 left-3 w-1 h-1 rounded-full bg-gray-800" />
            <div className="absolute bottom-2 right-3 w-1 h-1 rounded-full bg-gray-800" />
        </div>

        {/* BARRA DE CONTROLE UNIFICADA */}
        <div className="bg-black px-4 py-3 flex items-center justify-between gap-4 border-b border-gray-900">
          <div className="flex items-center gap-3">
            <button onClick={() => updateTrack(currentTrackIndex > 0 ? currentTrackIndex - 1 : playlist.length - 1)} className="text-gray-600 hover:text-neon-green transition-colors" aria-label="Previous track">
              <FontAwesomeIcon icon={faBackwardStep} className="text-xs" />
            </button>
            <button onClick={togglePlay} className="w-8 h-8 rounded-full border border-neon-green/50 flex items-center justify-center text-neon-green hover:bg-neon-green hover:text-black transition-all" aria-label={isPlaying ? "Pause" : "Play"}>
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className={`text-xs ${!isPlaying ? 'ml-0.5' : ''}`} />
            </button>
            <button onClick={() => updateTrack((currentTrackIndex + 1) % playlist.length)} className="text-gray-600 hover:text-neon-green transition-colors" aria-label="Next track">
              <FontAwesomeIcon icon={faForwardStep} className="text-xs" />
            </button>
          </div>

          <div className="flex-1 min-w-0 text-center">
            <h3 className="text-white text-[10px] font-bold truncate tracking-tight uppercase">{currentTrack.title}</h3>
            <p className="text-neon-green text-[7px] font-mono tracking-[0.2em] opacity-60 uppercase">{currentTrack.artist}</p>
          </div>

          <div className="flex items-center gap-2 border-l border-gray-800 pl-4">
            <FontAwesomeIcon icon={volume === 0 ? faVolumeXmark : faVolumeLow} className={`text-[10px] ${volume === 0 ? 'text-red-500' : 'text-gray-600'}`} />
            <input
              type="range" min="0" max="1" step="0.01" value={volume}
              aria-label="Volume"
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
        
        {/* === A MÁGICA DO ANDROID ESTÁ AQUI === */}
        <audio 
            ref={audioRef} 
            src={currentTrack.src} 
            onTimeUpdate={handleTimeUpdate} 
            onLoadedMetadata={onLoadedMetadata}
            onEnded={() => updateTrack((currentTrackIndex + 1) % playlist.length)} 
            preload="auto"
            playsInline
        />
      </div>
    </div>
  );
}

export default function CyberPlayer() {
  return <Suspense fallback={null}><PlayerContent /></Suspense>;
}