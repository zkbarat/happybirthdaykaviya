import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// "Happy Birthday to You" melody (public domain since 2016).
// Each entry is [frequency in Hz, length in beats].
const N = {
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  Bb4: 466.16,
  C5: 523.25,
};

const MELODY: [number, number][] = [
  [N.C4, 0.75], [N.C4, 0.25], [N.D4, 1], [N.C4, 1], [N.F4, 1], [N.E4, 2],
  [N.C4, 0.75], [N.C4, 0.25], [N.D4, 1], [N.C4, 1], [N.G4, 1], [N.F4, 2],
  [N.C4, 0.75], [N.C4, 0.25], [N.C5, 1], [N.A4, 1], [N.F4, 1], [N.E4, 1], [N.D4, 2],
  [N.Bb4, 0.75], [N.Bb4, 0.25], [N.A4, 1], [N.F4, 1], [N.G4, 1], [N.F4, 2],
];

const BEAT = 0.5; // seconds per beat
const LOOP_GAP = 1.2; // seconds of silence between loops

type Props = { name: string };

/**
 * Plays a soft, synthesized "Happy Birthday" tune (no audio file needed) and
 * speaks "Happy Birthday <name>!" the first time it starts. Audio can't
 * autoplay on mobile, so it kicks off on the first tap anywhere and can be
 * toggled with the floating button.
 */
export default function BirthdayMusic({ name }: Props) {
  const ctxRef = useRef<AudioContext | null>(null);
  const timersRef = useRef<number[]>([]);
  const playingRef = useRef(false);
  const spokenRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const playNote = useCallback(
    (ctx: AudioContext, freq: number, start: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;

      const peak = 0.22;
      const end = start + dur;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(peak, start + 0.03);
      gain.gain.setValueAtTime(peak, end - 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, end);

      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(end + 0.02);
    },
    []
  );

  const scheduleLoop = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx || !playingRef.current) return;

    let t = ctx.currentTime + 0.1;
    for (const [freq, beats] of MELODY) {
      const dur = beats * BEAT;
      playNote(ctx, freq, t, dur * 0.92);
      t += dur;
    }

    const totalMs = (t - ctx.currentTime + LOOP_GAP) * 1000;
    const id = window.setTimeout(scheduleLoop, totalMs);
    timersRef.current.push(id);
  }, [playNote]);

  const speakName = useCallback(() => {
    if (spokenRef.current) return;
    spokenRef.current = true;
    try {
      const synth = window.speechSynthesis;
      if (!synth) return;
      const u = new SpeechSynthesisUtterance(`Happy Birthday ${name}!`);
      u.rate = 0.9;
      u.pitch = 1.2;
      synth.speak(u);
    } catch {
      // speechSynthesis unsupported — no problem, the tune still plays.
    }
  }, [name]);

  const start = useCallback(async () => {
    if (playingRef.current) return;
    try {
      if (!ctxRef.current) {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        ctxRef.current = new Ctx();
      }
      await ctxRef.current.resume();
      playingRef.current = true;
      setPlaying(true);
      speakName();
      scheduleLoop();
    } catch {
      playingRef.current = false;
      setPlaying(false);
    }
  }, [scheduleLoop, speakName]);

  const stop = useCallback(() => {
    playingRef.current = false;
    setPlaying(false);
    clearTimers();
    try {
      window.speechSynthesis?.cancel();
    } catch {
      // ignore
    }
    ctxRef.current?.suspend().catch(() => {});
  }, []);

  const toggle = () => {
    if (playingRef.current) stop();
    else void start();
  };

  // Auto-start on the very first user gesture (taps satisfy autoplay policies).
  useEffect(() => {
    const onFirstGesture = () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      if (!playingRef.current) void start();
    };
    window.addEventListener("pointerdown", onFirstGesture, { once: true });
    return () => window.removeEventListener("pointerdown", onFirstGesture);
  }, [start]);

  useEffect(() => {
    return () => {
      clearTimers();
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.06 }}
      aria-label={playing ? "Pause birthday music" : "Play birthday music"}
      style={{
        top: "calc(env(safe-area-inset-top, 0px) + 12px)",
        right: "calc(env(safe-area-inset-right, 0px) + 12px)",
      }}
      className="fixed z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-xl shadow-soft backdrop-blur-md ring-1 ring-rose-soft"
    >
      <span className={playing ? "animate-pulse" : ""}>
        {playing ? "🎵" : "🔇"}
      </span>
    </motion.button>
  );
}
