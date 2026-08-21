import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GiftInput from "./GiftInput";
import GiftSubmitButton from "./GiftSubmitButton";
import { sendGiftRequest } from "../api";
import { bigPop } from "./confetti";

type Status = "idle" | "sending" | "success";

export default function GiftPage({ onBack }: { onBack?: () => void }) {
  const [gift, setGift] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [dummyClicked, setDummyClicked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async () => {
    if (!gift.trim()) {
      setError("Enna di... 'onnum venaam' nu sollaadha 😏 Un gift ah sollu di!");
      inputRef.current?.focus();
      return;
    }
    setError(null);
    setStatus("sending");

    // Fire the request, but don't make her stare at a spinner on a slow
    // network — reveal the success screen fast. We still show an error if the
    // request fails quickly (within the short grace window).
    const send = sendGiftRequest(gift.trim());
    send.catch(() => {}); // keep any late rejection from going unhandled

    const reveal = () => {
      bigPop();
      setStatus("success");
    };

    const grace = new Promise<"grace">((resolve) =>
      setTimeout(() => resolve("grace"), 700)
    );

    try {
      const winner = await Promise.race([
        send.then(() => "ok" as const),
        grace,
      ]);
      reveal();
      if (winner === "ok") {
        const res = await send;
        if (res.channel && res.channel !== "whatsapp") {
          setNote(`(Delivered to me via ${res.channel} 💌)`);
        }
      }
    } catch {
      setStatus("idle");
      setError("Ayyo, en phone buzz aagala 🥲 Konja neram kazhichu innoru vaati try pannu.");
    }
  };

  // The "No Gift Needed" button is a dummy — clicking it shows a popup and
  // then the button disappears. The popup auto-dismisses after 15 seconds.
  const handleDummyClick = () => {
    setDummyClicked(true);
    setShowPopup(true);
  };

  useEffect(() => {
    if (!showPopup) return;
    const t = setTimeout(() => setShowPopup(false), 15000);
    return () => clearTimeout(t);
  }, [showPopup]);

  return (
    <div className="min-h-screen-safe safe-top safe-bottom relative flex w-full flex-col items-center justify-center px-5 py-14">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <SuccessView key="success" note={note} />
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl text-center"
          >
            {onBack && (
              <div className="mb-6 flex justify-center">
                <button
                  onClick={onBack}
                  className="rounded-full border border-rose-soft bg-white/70 px-6 py-2 text-sm font-semibold text-rose-deep shadow-soft backdrop-blur transition hover:bg-white"
                >
                  ← Back
                </button>
              </div>
            )}
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="font-display text-3xl font-bold text-rose-deep sm:text-4xl"
            >
              Sari Birthday Girl... 🎀
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-3 text-lg font-medium text-rose sm:text-xl"
            >
              Ippo sollu di... Enna gift venum unakku? 👀🎁
            </motion.p>

            <div className="mt-8 rounded-[2rem] bg-white/40 p-5 shadow-soft ring-1 ring-white/60 backdrop-blur-md sm:p-6">
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
                {/* Dummy button: click shows a popup, then it disappears. */}
                <AnimatePresence>
                  {!dummyClicked && (
                    <motion.button
                      type="button"
                      onClick={handleDummyClick}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileTap={{ scale: 0.96 }}
                      className="w-full whitespace-nowrap rounded-full border border-rose-soft bg-white/85 px-6 py-4 text-base font-semibold text-rose-deep shadow-soft backdrop-blur transition-colors hover:bg-white sm:w-auto"
                    >
                      No Gift Needed 😌
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dummy-button popup — auto-dismisses after 15s. */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            key="dummy-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
          >
            <div
              className="absolute inset-0 bg-rose-deep/20 backdrop-blur-sm"
              onClick={() => setShowPopup(false)}
            />
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="relative z-10 w-full max-w-sm rounded-3xl bg-white/90 p-6 text-center shadow-glow ring-1 ring-rose-soft backdrop-blur"
            >
              <div className="text-5xl">😜</div>
              <p className="mt-3 text-lg font-bold text-rose-deep">
                Athu dummy button di 😜
              </p>
              <p className="mt-2 text-base font-medium text-rose">
                Adha mooditu, unakku enna venum nu sollu di ❤️
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-5 rounded-full bg-gradient-to-r from-rose-deep via-rose to-rose-soft px-7 py-2.5 text-base font-bold text-white shadow-glow"
              >
                Sari 👍
              </button>
            </motion.div>
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
        Gift request vandhuduchu! 🎁❤️
      </h2>
      <p className="mt-4 text-lg font-medium text-rose-deep sm:text-xl">
        Ipo paapom naan adha vaangi tharenaanu 👀
      </p>
      {note && <p className="mt-3 text-sm text-rose">{note}</p>}
      <p className="mt-6 text-2xl">🥳🎂✨</p>
    </motion.div>
  );
}
