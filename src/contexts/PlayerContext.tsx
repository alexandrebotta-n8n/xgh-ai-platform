"use client";

import { createContext, useContext, useState, useRef, useCallback, type ReactNode } from "react";

interface PlayerState {
  isPlaying: boolean;
  currentTrackIndex: number;
}

type TimeListener = (time: number) => void;

interface PlayerContextValue {
  // State
  isPlaying: boolean;
  currentTrackIndex: number;

  // State setters (called by CyberPlayer)
  setPlayerState: (state: Partial<PlayerState>) => void;

  // Actions (called by consumers like DiscographySection, MiniPlayer)
  forcePlay: () => void;
  forcePlayTrack: (trackId: number) => void;
  togglePlay: () => void;

  // Time subscription (avoids re-renders at 60fps)
  subscribeTime: (listener: TimeListener) => () => void;
  emitTime: (time: number) => void;

  // Event listeners (registered by CyberPlayer)
  onForcePlay: (listener: () => void) => () => void;
  onForcePlayTrack: (listener: (trackId: number) => void) => () => void;
  onTogglePlay: (listener: () => void) => () => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Listener refs (avoid re-renders)
  const timeListeners = useRef<Set<TimeListener>>(new Set());
  const forcePlayListeners = useRef<Set<() => void>>(new Set());
  const forcePlayTrackListeners = useRef<Set<(trackId: number) => void>>(new Set());
  const togglePlayListeners = useRef<Set<() => void>>(new Set());

  const setPlayerState = useCallback((state: Partial<PlayerState>) => {
    if (typeof state.isPlaying !== "undefined") setIsPlaying(state.isPlaying);
    if (typeof state.currentTrackIndex !== "undefined") setCurrentTrackIndex(state.currentTrackIndex);
  }, []);

  const subscribeTime = useCallback((listener: TimeListener) => {
    timeListeners.current.add(listener);
    return () => { timeListeners.current.delete(listener); };
  }, []);

  const emitTime = useCallback((time: number) => {
    timeListeners.current.forEach((fn) => fn(time));
  }, []);

  const forcePlay = useCallback(() => {
    forcePlayListeners.current.forEach((fn) => fn());
  }, []);

  const forcePlayTrack = useCallback((trackId: number) => {
    forcePlayTrackListeners.current.forEach((fn) => fn(trackId));
  }, []);

  const togglePlay = useCallback(() => {
    togglePlayListeners.current.forEach((fn) => fn());
  }, []);

  const onForcePlay = useCallback((listener: () => void) => {
    forcePlayListeners.current.add(listener);
    return () => { forcePlayListeners.current.delete(listener); };
  }, []);

  const onForcePlayTrack = useCallback((listener: (trackId: number) => void) => {
    forcePlayTrackListeners.current.add(listener);
    return () => { forcePlayTrackListeners.current.delete(listener); };
  }, []);

  const onTogglePlay = useCallback((listener: () => void) => {
    togglePlayListeners.current.add(listener);
    return () => { togglePlayListeners.current.delete(listener); };
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        currentTrackIndex,
        setPlayerState,
        forcePlay,
        forcePlayTrack,
        togglePlay,
        subscribeTime,
        emitTime,
        onForcePlay,
        onForcePlayTrack,
        onTogglePlay,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}
