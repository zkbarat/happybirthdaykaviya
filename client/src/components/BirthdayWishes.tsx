import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Cycles through the birthday wishes one at a time with a smooth
 * fade + slide transition.
 */
export default function BirthdayWishes({ wishes }: { wishes: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (wishes.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % wishes.length);
    }, 3600);
    return () => clearInterval(id);
  }, [wishes.length]);

  return (
    <div className="relative flex min-h-[5.5rem] w-full max-w-xl items-center justify-center px-2 sm:min-h-[4.5rem]">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 18, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -18, scale: 0.97 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center text-lg font-medium leading-relaxed text-rose-deep sm:text-xl"
        >
          {wishes[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
