"use client";

import { useLyricsSync } from "@/hooks/useLyricsSync";

export default function LyricsDisplay() {
  const { currentLineIndex, lines, isPlaying, hasLyrics } = useLyricsSync();

  // Don't render if track has no lyrics
  if (!hasLyrics) return null;

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

  // Get the lines to display: prev, current, next
  const prevLine = currentLineIndex > 0 ? lines[currentLineIndex - 1] : null;
  const currentLine = currentLineIndex >= 0 ? lines[currentLineIndex] : null;
  const nextLine = currentLineIndex + 1 < lines.length ? lines[currentLineIndex + 1] : null;

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

      {/* Lyrics area — fixed, no scroll */}
      <div className="h-[72px] flex flex-col items-center justify-center px-4 gap-0.5 overflow-hidden">
        {/* Previous line */}
        <div className="text-[9px] font-mono text-gray-600 opacity-40 text-center truncate w-full transition-all duration-500">
          {prevLine?.text || ""}
        </div>

        {/* Current line */}
        <div className="text-[11px] font-mono font-bold text-neon-green text-center w-full transition-all duration-500 drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]">
          {currentLine?.text || "..."}
        </div>

        {/* Next line */}
        <div className="text-[9px] font-mono text-gray-600 opacity-40 text-center truncate w-full transition-all duration-500">
          {nextLine?.text || ""}
        </div>
      </div>
    </div>
  );
}
