import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BirthdayHome from "./components/BirthdayHome";
import GiftPage from "./components/GiftPage";
import FloatingHearts from "./components/FloatingHearts";
import Sparkles from "./components/Sparkles";
import Balloons from "./components/Balloons";
import MusicButton from "./components/MusicButton";
import { config } from "./config";

type Page = "home" | "gift";

const pageVariants = {
  initial: { opacity: 0, scale: 1.03 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
};

export default function App() {
  const [page, setPage] = useState<Page>("home");

  return (
    <div className="bg-birthday animate-gradientShift min-h-screen-safe safe-x relative w-full overflow-hidden">
      {/* Ambient decorations sit behind everything */}
      <Sparkles />
      <FloatingHearts />
      <Balloons />

      {config.musicFile && (
        <MusicButton src={`${import.meta.env.BASE_URL}${config.musicFile}`} />
      )}

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {page === "home" ? (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <BirthdayHome onNext={() => setPage("gift")} />
            </motion.div>
          ) : (
            <motion.div
              key="gift"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <GiftPage />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
