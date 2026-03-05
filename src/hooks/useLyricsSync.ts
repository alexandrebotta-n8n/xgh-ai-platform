"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { lyricsData, LyricLine } from "@/data/lyrics";

interface LyricsSyncState {
  currentLineIndex: number;
  lines: LyricLine[];
  trackId: number | null;
  isPlaying: boolean;
  hasLyrics: boolean;
}

export function useLyricsSync(): LyricsSyncState {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const currentTimeRef = useRef(0);
  const linesRef = useRef<LyricLine[]>([]);

  // Listen for track/play state changes
  useEffect(() => {
    const handleState = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        if (typeof detail.playing !== "undefined") setIsPlaying(detail.playing);
        if (typeof detail.trackIndex !== "undefined") {
          setTrackIndex(detail.trackIndex);
          setCurrentLineIndex(-1); // reset on track change
        }
      }
    };
    window.addEventListener("xgh-player-state", handleState);
    return () => window.removeEventListener("xgh-player-state", handleState);
  }, []);

  // Listen for time updates (stored in ref — no re-renders)
  useEffect(() => {
    const handleTime = (e: Event) => {
      const { currentTime } = (e as CustomEvent).detail;
      currentTimeRef.current = currentTime;
    };
    window.addEventListener("xgh-player-time", handleTime);
    return () => window.removeEventListener("xgh-player-time", handleTime);
  }, []);

  // Resolve lyrics for current track (trackIndex is 0-based, trackId is 1-based)
  const trackId = trackIndex + 1;
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
