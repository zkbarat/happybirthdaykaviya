import { useMemo } from "react";

type Spark = {
  top: number;
  left: number;
  size: number;
  delay: number;
};

/** Tiny twinkling glow dots scattered across the screen. */
export default function Sparkles({ count = 22 }: { count?: number }) {
  const sparks = useMemo<Spark[]>(
    () =>
      Array.from({ length: count }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 3 + Math.random() * 5,
        delay: Math.random() * 3,
      })),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {sparks.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-sparkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            background:
              "radial-gradient(circle, #ffffff 0%, #ffd1e3 60%, transparent 70%)",
            boxShadow: "0 0 8px 2px rgba(255,255,255,0.7)",
          }}
        />
      ))}
    </div>
  );
}
