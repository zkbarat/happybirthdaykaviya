import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BirthdayHome from "./components/BirthdayHome";
import StoryPage from "./components/StoryPage";
import GiftPage from "./components/GiftPage";
import FloatingHearts from "./components/FloatingHearts";
import Sparkles from "./components/Sparkles";
import Balloons from "./components/Balloons";
import MusicButton from "./components/MusicButton";
import BirthdayMusic from "./components/BirthdayMusic";
import { config } from "./config";

const pageVariants = {
  initial: { opacity: 0, scale: 1.03 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
};

export default function App() {
  // step 0 = home, 1..N = story pages, N+1 = gift page.
  const storyCount = config.storyPages.length;
  const giftStep = storyCount + 1;
  // Total pages excluding home (story pages + gift page).
  const totalNonHome = storyCount + 1;

  const [step, setStep] = useState(0);

  const next = () => setStep((s) => Math.min(s + 1, giftStep));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const renderStep = () => {
    if (step === 0) {
      return <BirthdayHome onNext={next} />;
    }
    if (step <= storyCount) {
      return (
        <StoryPage
          data={config.storyPages[step - 1]}
          index={step}
          total={totalNonHome}
          onNext={next}
          onBack={back}
        />
      );
    }
    return <GiftPage onBack={back} />;
  };

  return (
    <div className="bg-birthday animate-gradientShift min-h-screen-safe safe-x relative w-full overflow-hidden">
      {/* Ambient decorations sit behind everything */}
      <Sparkles />
      <FloatingHearts />
      <Balloons />

      {config.musicFile ? (
        <MusicButton src={`${import.meta.env.BASE_URL}${config.musicFile}`} />
      ) : config.birthdayMusic ? (
        <BirthdayMusic />
      ) : null}

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
