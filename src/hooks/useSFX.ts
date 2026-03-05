"use client";

import { useCallback, useRef } from "react";

export function useSFX() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  /** Short glitch/digital noise burst */
  const glitch = useCallback(() => {
    try {
      const ctx = getCtx();
      const duration = 0.12;
      const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.15;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 2000;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      source.connect(filter).connect(gain).connect(ctx.destination);
      source.start();
    } catch { /* silent fail on unsupported browsers */ }
  }, [getCtx]);

  /** Error/alarm beep */
  const error = useCallback(() => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(180, ctx.currentTime + 0.08);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch { /* silent fail */ }
  }, [getCtx]);

  /** Soft click/beep for UI confirmations */
  const beep = useCallback(() => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 880;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch { /* silent fail */ }
  }, [getCtx]);

  /** Terminal keypress-style tick */
  const tick = useCallback(() => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.value = 1200 + Math.random() * 400;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch { /* silent fail */ }
  }, [getCtx]);

  return { glitch, error, beep, tick };
}
