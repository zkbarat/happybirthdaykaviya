import { motion } from "framer-motion";
import type { StoryPage as StoryPageData } from "../config";

type Props = {
  data: StoryPageData;
  /** 1-based position among the non-home pages. */
  index: number;
  /** Total non-home pages (story pages + the gift page). */
  total: number;
  onNext: () => void;
  onBack: () => void;
};

export default function StoryPage({ data, index, total, onNext, onBack }: Props) {
  return (
    <div className="min-h-screen-safe safe-top safe-bottom relative flex w-full flex-col items-center justify-center px-5 py-16 text-center">
      {/* Progress dots */}
      <div className="mb-8 flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i + 1 === index
                ? "w-6 bg-rose-deep"
                : i + 1 < index
                ? "w-2 bg-rose"
                : "w-2 bg-rose-soft/60"
            }`}
          />
        ))}
      </div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="font-display text-3xl font-bold text-gradient drop-shadow-sm sm:text-5xl"
      >
        {data.title}
      </motion.h2>

      <div className="mt-8 flex max-w-xl flex-col gap-4">
        {data.lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.35, duration: 0.55, ease: "easeOut" }}
            className="text-lg font-medium leading-relaxed text-rose-deep sm:text-xl"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 + data.lines.length * 0.35 + 0.15, duration: 0.5 }}
        className="mt-12 flex items-center gap-3"
      >
        <button
          onClick={onBack}
          className="rounded-full border border-rose-soft bg-white/70 px-6 py-3 text-base font-semibold text-rose-deep shadow-soft backdrop-blur transition hover:bg-white"
        >
          ← Pinnadi
        </button>
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="animate-pulseGlow rounded-full bg-gradient-to-r from-rose-deep via-rose to-rose-soft px-8 py-3 text-base font-bold text-white shadow-glow sm:text-lg"
        >
          {data.cta ?? "Adutha page 👉"}
        </motion.button>
      </motion.div>
    </div>
  );
}
