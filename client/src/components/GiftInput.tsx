import { forwardRef } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
};

/** The pretty textarea where she types her gift wish. Supports long text. */
const GiftInput = forwardRef<HTMLTextAreaElement, Props>(
  ({ value, onChange, disabled }, ref) => {
    return (
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        rows={3}
        maxLength={500}
        placeholder="Un birthday ku enna gift venum? Inga type pannu 🎁"
        className="no-scrollbar w-full resize-none rounded-3xl border-2 border-rose-soft bg-white/80 px-5 py-4 text-base text-rose-deep placeholder:text-rose/70 shadow-soft outline-none backdrop-blur transition focus:border-rose focus:shadow-glow disabled:opacity-60 sm:text-lg"
      />
    );
  }
);

GiftInput.displayName = "GiftInput";
export default GiftInput;
