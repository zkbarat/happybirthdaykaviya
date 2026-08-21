import confetti from "canvas-confetti";

const PINK_PALETTE = ["#ff5fa2", "#ff8ec1", "#ffd1e3", "#c98bff", "#fff0f6"];

/** A gentle, celebratory pink confetti burst from both sides. */
export function celebrate() {
  const end = Date.now() + 900;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.7 },
      colors: PINK_PALETTE,
      scalar: 0.9,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.7 },
      colors: PINK_PALETTE,
      scalar: 0.9,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/** A big center pop — used for the gift success moment. */
export function bigPop() {
  confetti({
    particleCount: 140,
    spread: 100,
    startVelocity: 42,
    origin: { y: 0.55 },
    colors: PINK_PALETTE,
    scalar: 1.05,
  });
  // Little heart-ish delayed follow up
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 120,
      decay: 0.92,
      origin: { y: 0.6 },
      colors: PINK_PALETTE,
    });
  }, 220);
}

/** A soft trickle used when Page 1 first loads. */
export function welcomeSprinkle() {
  confetti({
    particleCount: 60,
    spread: 80,
    startVelocity: 30,
    gravity: 0.7,
    origin: { y: 0 },
    colors: PINK_PALETTE,
    scalar: 0.85,
  });
}
