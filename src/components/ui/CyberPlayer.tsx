"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep, faForwardStep, faPause, faPlay, faVolumeXmark, faVolumeLow } from "@fortawesome/free-solid-svg-icons";
import { playlist } from "@/data/playlist";
import { FFT_SIZE, FFT_SMOOTHING, SPECTRUM_COLOR_START, SPECTRUM_COLOR_END, SPECTRUM_ALPHA_MIN, SPECTRUM_REFLECTION_OPACITY, SPECTRUM_BAR_GAP, DEFAULT_VOLUME, TIME_WARNING_THRESHOLD } from "@/constants/player";
import { usePlayer } from "@/contexts/PlayerContext";

function PlayerContent() {
  const searchParams = useSearchParams();
  const audioRef = useRef<HTMLAudioElement>(null);
  const { setPlayerState, emitTime, onForcePlay, onForcePlayTrack, onTogglePlay } = usePlayer();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [isMounted, setIsMounted] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Web Audio API — Espectrograma
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rafRef = useRef<number>(0);

  const currentTrack = playlist[currentTrackIndex];

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const syncPlayerState = useCallback((playing: boolean, trackIndex?: number) => {
    setPlayerState({ isPlaying: playing, currentTrackIndex: trackIndex ?? currentTrackIndex });
  }, [setPlayerState, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const cur = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      setCurrentTime(cur);
      setProgress((cur / dur) * 100);
      emitTime(cur);
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
              syncPlayerState(true, index);
              window.history.replaceState({}, '', window.location.pathname);
            } catch {
              setIsPlaying(false);
              syncPlayerState(false, index);
            }
          }
        };
        startDeepLink();
      }
    }

    const unsubForcePlay = onForcePlay(() => {
      if (audioRef.current) {
         const playPromise = audioRef.current.play();
         if (playPromise !== undefined) {
             playPromise.then(() => {
                 setIsPlaying(true);
                 syncPlayerState(true);
             }).catch(() => {
                 setIsPlaying(false);
                 syncPlayerState(false);
             });
         }
      }
    });

    const unsubForcePlayTrack = onForcePlayTrack((trackId: number) => {
      setIsFirstLoad(false);
      setCurrentTrackIndex(trackId - 1);
    });

    const unsubTogglePlay = onTogglePlay(() => {
      if (audioRef.current) {
        if (audioRef.current.paused) {
          const p = audioRef.current.play();
          if (p) {
            p.then(() => { setIsPlaying(true); syncPlayerState(true); })
             .catch(() => { setIsPlaying(false); syncPlayerState(false); });
          }
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
          syncPlayerState(false);
        }
      }
    });

    return () => {
      unsubForcePlay();
      unsubForcePlayTrack();
      unsubTogglePlay();
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
        syncPlayerState(false);
      } else {
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            syncPlayerState(true);
          }).catch(() => {
            setIsPlaying(false);
            syncPlayerState(false);
          });
        }
      }
    }
  };

  useEffect(() => {
    if (audioRef.current && isMounted && !isFirstLoad) {
      audioRef.current.load();
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            syncPlayerState(true);
          }).catch(() => {
            setIsPlaying(false);
            syncPlayerState(false);
          });
      }
    }
  }, [currentTrackIndex, isMounted]);

  const timeLeft = duration - currentTime;

  // Inicializar AudioContext + Analyser na primeira interação
  const initAnalyser = useCallback(() => {
    if (audioCtxRef.current || !audioRef.current) return;
    try {
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = FFT_SIZE;
      analyser.smoothingTimeConstant = FFT_SMOOTHING;
      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = source;
    } catch (e) {
      // Fallback silencioso se Web Audio não disponível
    }
  }, []);

  // Desenhar espectrograma no canvas
  const drawSpectrum = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) {
      rafRef.current = requestAnimationFrame(drawSpectrum);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);

    const barCount = bufferLength;
    const barWidth = (w - SPECTRUM_BAR_GAP * (barCount - 1)) / barCount;

    for (let i = 0; i < barCount; i++) {
      const value = dataArray[i] / 255;
      const barHeight = value * h;

      const ratio = i / barCount;
      const r = Math.floor(SPECTRUM_COLOR_START.r + ratio * (SPECTRUM_COLOR_END.r - SPECTRUM_COLOR_START.r));
      const g = Math.floor(SPECTRUM_COLOR_START.g + ratio * (SPECTRUM_COLOR_END.g - SPECTRUM_COLOR_START.g));
      const b = Math.floor(SPECTRUM_COLOR_START.b + ratio * (SPECTRUM_COLOR_END.b - SPECTRUM_COLOR_START.b));
      const alpha = SPECTRUM_ALPHA_MIN + value * (1 - SPECTRUM_ALPHA_MIN);

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      ctx.fillRect(
        i * (barWidth + SPECTRUM_BAR_GAP),
        h - barHeight,
        barWidth,
        barHeight
      );

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * SPECTRUM_REFLECTION_OPACITY})`;
      ctx.fillRect(
        i * (barWidth + SPECTRUM_BAR_GAP),
        h,
        barWidth,
        barHeight * 0.3
      );
    }

    rafRef.current = requestAnimationFrame(drawSpectrum);
  }, []);

  // Iniciar/parar loop de renderização (pausa quando tab em background)
  useEffect(() => {
    if (!isPlaying) return;

    initAnalyser();
    rafRef.current = requestAnimationFrame(drawSpectrum);

    const handleVisibility = () => {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      } else {
        rafRef.current = requestAnimationFrame(drawSpectrum);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isPlaying, initAnalyser, drawSpectrum]);

  return (
    <div className="w-full relative">
      <div className="relative bg-black border-2 border-gray-800 rounded-t-lg rounded-b-none border-b-0 overflow-hidden shadow-2xl">
        
        {/* Header Superior */}
        <div className="bg-gray-900 px-4 py-1.5 flex justify-between items-center border-b border-gray-800">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.2em]">XGH_UNIT.01</span>
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${isPlaying ? 'bg-neon-green shadow-[0_0_6px_#39ff14] animate-pulse' : 'bg-gray-700'}`} />
              <span className="text-[7px] font-mono text-gray-600 uppercase">{isPlaying ? 'REC' : 'IDLE'}</span>
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
            <span className={timeLeft < TIME_WARNING_THRESHOLD && isPlaying ? 'text-red-500 animate-pulse' : 'text-neon-purple opacity-40'}>
              {formatTime(duration)}
            </span>
        </div>

        {/* Espectrograma */}
        <div className="relative bg-black border-t border-gray-900/30">
          <canvas
            ref={canvasRef}
            className="w-full h-10 block"
          />
          {/* Linha de base neon */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-green/30 to-transparent" />
          {/* Label */}
          <div className="absolute top-0.5 right-2 text-[6px] font-mono text-gray-700 uppercase tracking-widest">
            FFT_64
          </div>
        </div>

        {/* === A MÁGICA DO ANDROID ESTÁ AQUI === */}
        <audio 
            ref={audioRef} 
            src={currentTrack.src} 
            onTimeUpdate={handleTimeUpdate} 
            onLoadedMetadata={onLoadedMetadata}
            onEnded={() => updateTrack((currentTrackIndex + 1) % playlist.length)} 
            preload="none"
            playsInline
        />
      </div>
    </div>
  );
}

export default function CyberPlayer() {
  return <Suspense fallback={null}><PlayerContent /></Suspense>;
}