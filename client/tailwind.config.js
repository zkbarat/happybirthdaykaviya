/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#ffe4ef",
        rose: {
          soft: "#ffd1e3",
          DEFAULT: "#ff8ec1",
          deep: "#ff5fa2",
        },
        lavender: "#e9defa",
        cream: "#fff6fb",
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ['"Quicksand"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(255, 95, 162, 0.55)",
        soft: "0 10px 40px rgba(255, 142, 193, 0.35)",
      },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.9" },
          "90%": { opacity: "0.7" },
          "100%": { transform: "translateY(-110vh) rotate(25deg)", opacity: "0" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        sparkle: {
          "0%, 100%": { transform: "scale(0.6)", opacity: "0.2" },
          "50%": { transform: "scale(1.2)", opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255,95,162,0.45)" },
          "50%": { boxShadow: "0 0 40px rgba(255,95,162,0.85)" },
        },
      },
      animation: {
        floatUp: "floatUp linear infinite",
        gradientShift: "gradientShift 12s ease infinite",
        sparkle: "sparkle 2.5s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
