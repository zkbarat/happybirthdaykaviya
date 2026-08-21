import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LABELS = [
  "No Gift Needed 😌",
  "Are you sure? 👀",
  "Nice try 😂",
  "Try again 😌",
  "Absolutely not 😂❤️",
  "You really don't want a gift? 🥺",
  "Catch me first 🏃‍♀️💨",
  "Not happening 😌",
  "Okay this is fun 😂",
];

type Pos = { x: number; y: number };
type Dims = { w: number; h: number };

type Props = {
  /** Element the button should never cover (the gift input card). */
  avoidRef: React.RefObject<HTMLElement>;
  /** Called only on a genuine keyboard/accessibility activation. */
  onCaught: () => void;
};

// Preferred size — shrinks to fit tiny screens (see computeDims).
const PREF_W = 210;
const BTN_H = 60;
const MARGIN = 12;

function viewport(): Dims {
  return {
    w: window.visualViewport?.width ?? window.innerWidth,
    h: window.visualViewport?.height ?? window.innerHeight,
  };
}

/** Button size, clamped so it always fits inside the current viewport. */
function computeDims(): Dims {
  const { w: vw } = viewport();
  return { w: Math.min(PREF_W, vw - 2 * MARGIN), h: BTN_H };
}

/** Force a position fully inside the viewport for the given button size. */
function clampToViewport(p: Pos, dims: Dims): Pos {
  const { w: vw, h: vh } = viewport();
  const maxX = Math.max(MARGIN, vw - dims.w - MARGIN);
  const maxY = Math.max(MARGIN, vh - dims.h - MARGIN);
  return {
    x: Math.min(Math.max(MARGIN, p.x), maxX),
    y: Math.min(Math.max(MARGIN, p.y), maxY),
  };
}

function rectsOverlap(p: Pos, dims: Dims, avoid: DOMRect | null): boolean {
  if (!avoid) return false;
  const pad = 16;
  return !(
    p.x + dims.w < avoid.left - pad ||
    p.x > avoid.right + pad ||
    p.y + dims.h < avoid.top - pad ||
    p.y > avoid.bottom + pad
  );
}

export default function MovingNoGiftButton({ avoidRef, onCaught }: Props) {
  // Docked (still, beside Submit) until her first tap/click, then free-floating.
  const [active, setActive] = useState(false);
  const [pos, setPos] = useState<Pos>({ x: MARGIN, y: MARGIN });
  const [dims, setDims] = useState<Dims>(computeDims);
  const [labelIndex, setLabelIndex] = useState(0);
  const [, setAttempts] = useState(0);
  const [teaser, setTeaser] = useState<string | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const pickNewPosition = useCallback(
    (d: Dims): Pos => {
      const { w: vw, h: vh } = viewport();
      const maxX = Math.max(MARGIN, vw - d.w - MARGIN);
      const maxY = Math.max(MARGIN, vh - d.h - MARGIN);
      const avoid = avoidRef.current?.getBoundingClientRect() ?? null;

      let next: Pos = { x: MARGIN, y: MARGIN };
      for (let i = 0; i < 40; i++) {
        const candidate = {
          x: MARGIN + Math.random() * (maxX - MARGIN),
          y: MARGIN + Math.random() * (maxY - MARGIN),
        };
        next = candidate;
        if (!rectsOverlap(candidate, d, avoid)) break;
      }
      return clampToViewport(next, d);
    },
    [avoidRef]
  );

  const escape = useCallback(() => {
    const d = computeDims();
    setDims(d);
    setPos(pickNewPosition(d));
    setLabelIndex((i) => (i + 1) % LABELS.length);
    setAttempts((a) => {
      const next = a + 1;
      if (next === 4) setTeaser("Seri seri... nee escape aaga try panra theriyudhu 😂❤️");
      if (next === 8) setTeaser("Nee romba per sollura huh 😭❤️");
      return next;
    });
  }, [pickNewPosition]);

  // First interaction: pin at its current spot (no jump), go free-floating,
  // then dart away next frame.
  const activate = useCallback(() => {
    const d = computeDims();
    const rect = btnRef.current?.getBoundingClientRect();
    setDims(d);
    if (rect) setPos(clampToViewport({ x: rect.left, y: rect.top }, d));
    setActive(true);
    requestAnimationFrame(() => escape());
  }, [escape]);

  // Keep it visible + inside bounds when the viewport changes.
  useEffect(() => {
    if (!active) return;
    const onResize = () => {
      const d = computeDims();
      setDims(d);
      setPos((p) => clampToViewport(p, d));
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    window.visualViewport?.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("scroll", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("scroll", onResize);
    };
  }, [active]);

  // Active: any hint of interaction makes it flee before a click can land.
  // Docked: only a real tap/click (or keyboard) does anything.
  const handleMouseEnter = () => {
    if (active) escape();
  };
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    if (active) escape();
    else activate();
  };
  const handleTouchStart = () => {
    if (active) escape();
    else activate();
  };

  // Keyboard activation (Tab + Enter/Space → detail === 0) counts as caught.
  const handleClick = (e: React.MouseEvent) => {
    if (e.detail === 0) {
      onCaught();
      return;
    }
    if (active) escape();
    else activate();
  };

  const baseClass =
    "select-none rounded-full border border-rose-soft bg-white/85 text-sm font-semibold leading-tight text-rose-deep shadow-soft backdrop-blur transition-colors hover:bg-white sm:text-base";

  return (
    <>
      {active && teaser && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-none fixed bottom-4 left-1/2 z-40 -translate-x-1/2 max-w-[90vw] rounded-full bg-white/80 px-4 py-2 text-center text-sm font-semibold text-rose-deep shadow-soft backdrop-blur"
        >
          {teaser}
        </motion.div>
      )}

      <motion.button
        ref={btnRef}
        type="button"
        onMouseEnter={handleMouseEnter}
        onPointerDown={handlePointerDown}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
        animate={active ? { left: pos.x, top: pos.y } : {}}
        // Tween (never overshoots) guarantees it can't slide past an edge.
        transition={{ type: "tween", ease: "easeOut", duration: 0.32 }}
        style={
          active
            ? { width: dims.w, height: dims.h, left: pos.x, top: pos.y }
            : undefined
        }
        className={
          active
            ? `${baseClass} fixed z-40 flex items-center justify-center px-4 text-center`
            : `${baseClass} w-full whitespace-nowrap px-6 py-4 sm:w-auto`
        }
      >
        {LABELS[labelIndex]}
      </motion.button>
    </>
  );
}
