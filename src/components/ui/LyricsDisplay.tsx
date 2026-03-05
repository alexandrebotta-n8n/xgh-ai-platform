"use client";

import { useRef, useEffect } from "react";
import { useLyricsSync } from "@/hooks/useLyricsSync";

export default function LyricsDisplay() {
  const { currentLineIndex, lines, isPlaying, hasLyrics } = useLyricsSync();
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-scroll to center the current line
  useEffect(() => {
    if (currentLineIndex < 0 || !containerRef.current) return;
    const lineEl = lineRefs.current[currentLineIndex];
    if (!lineEl) return;
    lineEl.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentLineIndex]);

  // Don't render if track has no lyrics
  if (!hasLyrics) return null;

  const VISIBLE_RANGE = 3;

  // Idle / paused state
  if (!isPlaying && currentLineIndex <= 0) {
    return (
      <div className="w-full bg-[#050505] border-x-2 border-gray-800">
        <div className="px-4 py-1 flex items-center gap-2 border-b border-gray-800/50">
          <div className="w-1 h-1 rounded-full bg-gray-700" />
          <span className="text-[7px] font-mono text-gray-600 uppercase tracking-[0.2em]">
            LYRICS_STREAM
          </span>
        </div>
        <div className="h-20 flex items-center justify-center">
          <span className="text-[9px] font-mono text-gray-700 animate-pulse">
            {">"} AWAITING_PLAYBACK...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#050505] border-x-2 border-gray-800">
      {/* Header */}
      <div className="px-4 py-1 flex items-center justify-between border-b border-gray-800/50">
        <div className="flex items-center gap-2">
          <div
            className={`w-1 h-1 rounded-full transition-all duration-500 ${
              isPlaying
                ? "bg-neon-green shadow-[0_0_4px_#39ff14] animate-pulse"
                : "bg-gray-700"
            }`}
          />
          <span className="text-[7px] font-mono text-gray-600 uppercase tracking-[0.2em]">
            LYRICS_STREAM
          </span>
        </div>
        <span className="text-[6px] font-mono text-gray-700 uppercase">
          {currentLineIndex >= 0
            ? `LINE_${(currentLineIndex + 1).toString().padStart(3, "0")}`
            : "---"}
        </span>
      </div>

      {/* Scrollable lyrics area */}
      <div
        ref={containerRef}
        className="h-24 overflow-y-auto custom-scrollbar relative"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Top fade */}
        <div className="sticky top-0 left-0 right-0 h-4 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

        <div className="px-4 py-1">
          {lines.map((line, i) => {
            const isCurrent = i === currentLineIndex;
            const distance =
              currentLineIndex >= 0 ? Math.abs(i - currentLineIndex) : Infinity;
            const isPast = i < currentLineIndex;

            let opacity = "opacity-[0.12]";
            if (isCurrent) opacity = "opacity-100";
            else if (distance <= VISIBLE_RANGE)
              opacity = isPast ? "opacity-30" : "opacity-40";
            else if (distance <= VISIBLE_RANGE + 2) opacity = "opacity-[0.15]";

            return (
              <div
                key={i}
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className={`
                  py-0.5 text-center font-mono transition-all duration-500 ease-out
                  ${
                    isCurrent
                      ? "text-neon-green text-[11px] font-bold scale-105 drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]"
                      : `text-[9px] text-gray-500 ${opacity}`
                  }
                  ${line.text === "" ? "h-3" : ""}
                `}
              >
                {line.text || (isCurrent ? "..." : "")}
              </div>
            );
          })}
        </div>

        {/* Bottom fade */}
        <div className="sticky bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
}
