import { motion } from "framer-motion";

type Props = {
  onClick: () => void;
  loading?: boolean;
};

/** Glowing pink gradient submit button. */
export default function GiftSubmitButton({ onClick, loading }: Props) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={loading}
      whileHover={{ scale: loading ? 1 : 1.04 }}
      whileTap={{ scale: loading ? 1 : 0.96 }}
      className="animate-pulseGlow w-full rounded-full bg-gradient-to-r from-rose-deep via-rose to-rose-soft px-6 py-4 text-lg font-bold text-white shadow-glow transition disabled:cursor-wait disabled:opacity-80"
    >
      {loading ? "Anuppuren... 💫" : "En Gift Request Anuppu 🎁"}
    </motion.button>
  );
}
