import { useCallback, useRef } from "react";

type Ctx = AudioContext | null;

/**
 * Som curto e agradável (síntese via WebAudio, sem arquivos externos).
 * Um "pop" de duas notas ascendentes — leve e rápido.
 */
export function useClickSound() {
  const ctxRef = useRef<Ctx>(null);

  return useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      const AC =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return;

      if (!ctxRef.current) ctxRef.current = new AC();
      const ctx = ctxRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") void ctx.resume();

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.gain.value = 0.12;
      master.connect(ctx.destination);

      [
        { f: 620, t: 0, d: 0.09 },
        { f: 930, t: 0.055, d: 0.13 },
      ].forEach(({ f, t, d }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, now + t);
        gain.gain.setValueAtTime(0.0001, now + t);
        gain.gain.exponentialRampToValueAtTime(1, now + t + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + t + d);
        osc.connect(gain);
        gain.connect(master);
        osc.start(now + t);
        osc.stop(now + t + d + 0.02);
      });
    } catch {
      /* áudio indisponível — ignora silenciosamente */
    }
  }, []);
}
