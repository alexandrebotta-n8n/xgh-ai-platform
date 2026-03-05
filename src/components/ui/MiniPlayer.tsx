"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { playlist } from "@/data/playlist";
import { usePlayer } from "@/contexts/PlayerContext";

export default function MiniPlayer() {
  const { isPlaying, currentTrackIndex, togglePlay, subscribeTime } = usePlayer();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentTrack = playlist[currentTrackIndex];

  // Track progress via time subscription
  useEffect(() => {
    return subscribeTime((time: number) => {
      const audio = document.querySelector("audio");
      if (audio && audio.duration) {
        setProgress((time / audio.duration) * 100);
      }
    });
  }, [subscribeTime]);

  // Show when main player is scrolled out of viewport AND music is playing
  useEffect(() => {
    const check = () => {
      const rack = document.querySelector("[data-player-rack]");
      if (!rack) { setVisible(false); return; }
      const rect = rack.getBoundingClientRect();
      setVisible(rect.bottom < 0 && isPlaying);
    };

    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, [isPlaying]);

  if (!visible) return null;

  const scrollToPlayer = () => {
    document.querySelector("[data-player-rack]")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Progress bar */}
      <div className="h-0.5 bg-gray-900 w-full">
        <div
          className="h-full bg-neon-green shadow-[0_0_6px_#39ff14]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="bg-black/95 backdrop-blur-md border-t border-gray-800 px-4 py-2 flex items-center justify-between gap-3">
        {/* Track info */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-mono text-white font-bold truncate uppercase tracking-tight">
            {currentTrack?.title}
          </p>
          <p className="text-[7px] font-mono text-neon-green/60 uppercase tracking-widest">
            {currentTrack?.artist}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="w-7 h-7 rounded-full border border-neon-green/40 flex items-center justify-center text-neon-green hover:bg-neon-green hover:text-black transition-all"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="text-[9px]" />
          </button>

          <button
            onClick={scrollToPlayer}
            className="text-gray-500 hover:text-neon-green transition-colors"
            aria-label="Scroll to player"
          >
            <FontAwesomeIcon icon={faChevronUp} className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
}
