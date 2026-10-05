import type { Config } from "tailwindcss";

/**
 * Seoul Soft-Glow — Depris Beauty design tokens.
 * Approachable luxury for advanced Korean skincare.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF5ED",
        porcelain: "#FFFFFF",
        sand: "#EFE4D4",
        ink: "#2E2822",
        "ink-soft": "#6B5E52",
        blush: "#E7A3A0",
        camellia: "#B0544C",
        bronze: "#B08A5B",
        "bronze-deep": "#8A6A3E",
        sage: "#5E7D68",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-hanken)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(176,138,91,0.22)",
        glow: "0 18px 50px -16px rgba(201,115,107,0.28)",
        lift: "0 22px 60px -20px rgba(46,40,34,0.20)",
      },
      maxWidth: {
        shell: "80rem",
      },
      keyframes: {
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both",
      },
      transitionTimingFunction: {
        glow: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
