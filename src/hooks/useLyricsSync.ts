"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { lyricsData, LyricLine } from "@/data/lyrics";
import { usePlayer } from "@/contexts/PlayerContext";

interface LyricsSyncState {
  currentLineIndex: number;
  lines: LyricLine[];
  trackId: number;
  isPlaying: boolean;
  hasLyrics: boolean;
}

export function useLyricsSync(): LyricsSyncState {
  const { isPlaying, currentTrackIndex, subscribeTime } = usePlayer();
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const currentTimeRef = useRef(0);
  const linesRef = useRef<LyricLine[]>([]);

  // Subscribe to time updates (ref-based, no re-renders)
  useEffect(() => {
    return subscribeTime((time: number) => {
      currentTimeRef.current = time;
    });
  }, [subscribeTime]);

  // Reset on track change
  useEffect(() => {
    setCurrentLineIndex(-1);
  }, [currentTrackIndex]);

  // Resolve lyrics for current track (trackIndex is 0-based, trackId is 1-based)
  const trackId = currentTrackIndex + 1;
  const trackLyrics = lyricsData[trackId];
  const lines = trackLyrics?.lines || [];
  linesRef.current = lines;

  // Binary search: find the last line whose time <= currentTime
  const findLineIndex = useCallback((time: number, arr: LyricLine[]): number => {
    if (arr.length === 0) return -1;
    let low = 0;
    let high = arr.length - 1;
    let result = -1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (arr[mid].time <= time) {
        result = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return result;
  }, []);

  // RAF loop — only runs when playing and lyrics exist
  useEffect(() => {
    if (!isPlaying || lines.length === 0) return;

    let rafId: number;
    const tick = () => {
      const idx = findLineIndex(currentTimeRef.current, linesRef.current);
      setCurrentLineIndex((prev) => (prev !== idx ? idx : prev));
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, lines.length, findLineIndex]);

  return {
    currentLineIndex,
    lines,
    trackId,
    isPlaying,
    hasLyrics: lines.length > 0,
  };
}
