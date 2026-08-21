import { useEffect } from "react";
import { motion } from "framer-motion";
import BirthdayWishes from "./BirthdayWishes";
import { welcomeSprinkle } from "./confetti";
import { config } from "../config";

export default function BirthdayHome({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const t = setTimeout(() => welcomeSprinkle(), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen-safe safe-top safe-bottom relative flex w-full flex-col items-center justify-center px-5 py-16 text-center">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-rose"
      >
        a little surprise for you
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
        className="font-display text-4xl font-bold leading-tight text-gradient drop-shadow-sm sm:text-6xl md:text-7xl"
      >
        Happy Birthday,
        <br />
        {config.bestFriendName} ❤️
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-8"
      >
        <BirthdayWishes wishes={config.wishes} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="mt-12"
      >
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="animate-pulseGlow rounded-full bg-gradient-to-r from-rose-deep via-rose to-rose-soft px-9 py-4 text-lg font-bold text-white shadow-glow"
        >
          There's More ❤️ →
        </motion.button>
      </motion.div>
    </div>
  );
}
