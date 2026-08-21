import { useMemo } from "react";

const BALLOON_COLORS = [
  ["#ff8ec1", "#ff5fa2"],
  ["#ffd1e3", "#ff8ec1"],
  ["#e9defa", "#c98bff"],
  ["#fff0f6", "#ffb3d1"],
];

type BalloonConfig = {
  left: number;
  duration: number;
  delay: number;
  scale: number;
  colors: string[];
};

/** A few soft balloons drifting slowly upward. Kept sparse to avoid clutter. */
export default function Balloons({ count = 6 }: { count?: number }) {
  const balloons = useMemo<BalloonConfig[]>(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: 6 + Math.random() * 88,
        duration: 16 + Math.random() * 12,
        delay: Math.random() * 14,
        scale: 0.7 + Math.random() * 0.6,
        colors: BALLOON_COLORS[i % BALLOON_COLORS.length],
      })),
    [count]
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {balloons.map((b, i) => (
        <div
          key={i}
          className="absolute bottom-[-25vh] animate-floatUp"
          style={{
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            transform: `scale(${b.scale})`,
            opacity: 0.75,
          }}
        >
          <svg width="46" height="64" viewBox="0 0 46 64" fill="none">
            <defs>
              <radialGradient id={`bg${i}`} cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor={b.colors[0]} />
                <stop offset="100%" stopColor={b.colors[1]} />
              </radialGradient>
            </defs>
            <ellipse cx="23" cy="24" rx="21" ry="24" fill={`url(#bg${i})`} />
            <path d="M23 48 l4 6 h-8 z" fill={b.colors[1]} />
            <path
              d="M23 54 q6 6 0 10"
              stroke="#ff9fc6"
              strokeWidth="1.4"
              fill="none"
            />
            <ellipse cx="16" cy="15" rx="5" ry="7" fill="rgba(255,255,255,0.45)" />
          </svg>
        </div>
      ))}
    </div>
  );
}
