import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Floating play/mute button for optional background music.
 * Audio NEVER autoplays — it only starts on the first user tap,
 * which keeps mobile Safari / Chrome happy.
 */
export default function MusicButton({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch {
      // Autoplay blocked or file missing — just stay muted silently.
      setPlaying(false);
    }
  };

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.06 }}
      aria-label={playing ? "Mute music" : "Play music"}
      style={{
        top: "calc(env(safe-area-inset-top, 0px) + 12px)",
        right: "calc(env(safe-area-inset-right, 0px) + 12px)",
      }}
      className="fixed z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-xl shadow-soft backdrop-blur-md ring-1 ring-rose-soft"
    >
      <span className={playing ? "animate-pulse" : ""}>
        {playing ? "🔊" : "🔇"}
      </span>
    </motion.button>
  );
}
