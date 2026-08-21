import { useMemo } from "react";

const HEARTS = ["❤️", "💕", "💖", "🌸", "💗", "🎀"];

type HeartConfig = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
  opacity: number;
};

/**
 * Soft pink hearts + petals that keep floating up the screen.
 * Purely decorative, so it's pointer-events-none and aria-hidden.
 */
export default function FloatingHearts({ count = 14 }: { count?: number }) {
  const hearts = useMemo<HeartConfig[]>(
    () =>
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        size: 14 + Math.random() * 26,
        duration: 9 + Math.random() * 10,
        delay: Math.random() * 10,
        emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
        opacity: 0.5 + Math.random() * 0.5,
      })),
    [count]
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {hearts.map((h, i) => (
        <span
          key={i}
          className="absolute bottom-[-10vh] animate-floatUp select-none"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.opacity,
            filter: "drop-shadow(0 4px 6px rgba(255,95,162,0.3))",
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
