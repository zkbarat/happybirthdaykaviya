import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GiftInput from "./GiftInput";
import GiftSubmitButton from "./GiftSubmitButton";
import MovingNoGiftButton from "./MovingNoGiftButton";
import { sendGiftRequest } from "../api";
import { bigPop } from "./confetti";

type Status = "idle" | "sending" | "success" | "caught";

export default function GiftPage() {
  const [gift, setGift] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async () => {
    if (!gift.trim()) {
      setError("Come on... you can't say you don't want anything 😏 Tell me your gift!");
      inputRef.current?.focus();
      return;
    }
    setError(null);
    setStatus("sending");
    try {
      const res = await sendGiftRequest(gift.trim());
      bigPop();
      setStatus("success");
      if (res.channel && res.channel !== "whatsapp") {
        setNote(`(Delivered to me via ${res.channel} 💌)`);
      }
    } catch {
      setStatus("idle");
      setError("Hmm, my phone didn't buzz 🥲 Please try once more in a moment.");
    }
  };

  const handleCaught = () => {
    setStatus("caught");
  };

  return (
    <div className="min-h-screen-safe safe-top safe-bottom relative flex w-full flex-col items-center justify-center px-5 py-14">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <SuccessView key="success" note={note} />
        ) : status === "caught" ? (
          <CaughtView key="caught" />
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl text-center"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-display text-3xl font-bold text-rose-deep sm:text-4xl"
            >
              Okay Birthday Girl... 🎀
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-3 text-lg font-medium text-rose sm:text-xl"
            >
              Now tell me... What gift do you want? 👀🎁
            </motion.p>

            <div
              ref={cardRef}
              className="mt-8 rounded-[2rem] bg-white/40 p-5 shadow-soft ring-1 ring-white/60 backdrop-blur-md sm:p-6"
            >
              <GiftInput
                ref={inputRef}
                value={gift}
                onChange={(v) => {
                  setGift(v);
                  if (error) setError(null);
                }}
                disabled={status === "sending"}
              />

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 text-sm font-semibold text-rose-deep"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <div className="sm:flex-1">
                  <GiftSubmitButton
                    onClick={handleSubmit}
                    loading={status === "sending"}
                  />
                </div>
                {/* Sits still right next to Submit — it only starts running
                    away once she actually taps it. */}
                {(status === "idle" || status === "sending") && (
                  <MovingNoGiftButton avoidRef={cardRef} onCaught={handleCaught} />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessView({ note }: { note: string | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
      className="max-w-lg text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, -8, 8, 0] }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="mx-auto mb-4 text-7xl"
      >
        🎁
      </motion.div>
      <h2 className="font-display text-3xl font-bold text-gradient sm:text-4xl">
        Gift request received successfully! 🎁❤️
      </h2>
      <p className="mt-4 text-lg font-medium text-rose-deep sm:text-xl">
        Now let's see if I can get it for you 👀
      </p>
      {note && <p className="mt-3 text-sm text-rose">{note}</p>}
      <p className="mt-6 text-2xl">🥳🎂✨</p>
    </motion.div>
  );
}

function CaughtView() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 180, damping: 16 }}
      className="max-w-lg text-center"
    >
      <div className="mb-4 text-7xl">😭</div>
      <h2 className="font-display text-3xl font-bold text-rose-deep sm:text-4xl">
        Fineee 😭
      </h2>
      <p className="mt-4 text-lg font-medium text-rose sm:text-xl">
        But I'm still getting you something ❤️
      </p>
    </motion.div>
  );
}
