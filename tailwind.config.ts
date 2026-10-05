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
        // vibrant iridescent accents (for gradients / glass glow)
        coral: "#F4785C",
        peach: "#FBC9A8",
        rose: "#EE8E9E",
        lavender: "#C7B5E6",
        lilac: "#E7DBF3",
        gold: "#E0A93B",
        mint: "#BFE3D0",
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
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        aurora: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(6%,-8%) scale(1.15)" },
          "66%": { transform: "translate(-6%,6%) scale(0.95)" },
          "100%": { transform: "translate(0,0) scale(1)" },
        },
        blob: {
          "0%,100%": { borderRadius: "42% 58% 60% 40% / 52% 44% 56% 48%" },
          "50%": { borderRadius: "58% 42% 40% 60% / 44% 56% 44% 56%" },
        },
        "gradient-pan": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        aurora: "aurora 18s ease-in-out infinite",
        "aurora-slow": "aurora 26s ease-in-out infinite",
        blob: "blob 12s ease-in-out infinite",
        "gradient-pan": "gradient-pan 6s ease infinite",
        shimmer: "shimmer 2.8s ease-in-out infinite",
        "spin-slow": "spin-slow 26s linear infinite",
      },
      transitionTimingFunction: {
        glow: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
