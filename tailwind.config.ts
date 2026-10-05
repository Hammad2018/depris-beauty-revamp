import type { Config } from "tailwindcss";

/**
 * Celestial Botanical — Depris Beauty design tokens, aligned to the brand logo
 * (jade lotus + yin-yang, silver-chrome wordmark, periwinkle celestial field,
 * floral pastels). "Turning back the clock, one drop at a time."
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F4F6FC", // airy periwinkle-white page base
        porcelain: "#FFFFFF",
        sand: "#E6EAF6", // soft periwinkle-grey (muted surface / borders)
        ink: "#1E2A44", // deep navy (yin-yang) — primary text
        "ink-soft": "#566079", // slate
        blush: "#EBB7B0", // blush rose petal
        camellia: "#157A73", // JADE TEAL — primary CTA / accent (brand signature)
        bronze: "#2FA39A", // teal-bright — secondary accent
        "bronze-deep": "#13736B", // deep teal — AA eyebrow/link text on light
        sage: "#2E8B7E", // verified / success (teal-green)
        // floral + celestial accents
        coral: "#4E6AD0", // periwinkle (accent for gradients)
        peach: "#AFC3F2", // soft sky periwinkle
        rose: "#E79A90", // blush rose deep
        lavender: "#B9A3DE",
        lilac: "#DCCCEF",
        gold: "#E3B34C", // flower-center gold
        mint: "#7FD1C4", // teal mint
        // explicit brand tokens
        navy: "#1E2A44",
        "navy-deep": "#141D33",
        teal: "#157A73",
        "teal-bright": "#2FA39A",
        "teal-glow": "#5CC3B8",
        periwinkle: "#4E6AD0",
        "periwinkle-soft": "#8E9FE6",
        indigo: "#2E3C9E",
        "indigo-deep": "#212B74",
        silver: "#CBD6DA",
        pewter: "#8CA0A3",
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
        soft: "0 10px 30px -12px rgba(30,42,68,0.18)",
        glow: "0 18px 50px -16px rgba(78,106,208,0.32)",
        lift: "0 22px 60px -20px rgba(30,42,68,0.22)",
        teal: "0 18px 50px -16px rgba(21,122,115,0.30)",
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
        twinkle: {
          "0%,100%": { opacity: "0.25", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        "drift-up": {
          "0%": { transform: "translateY(10px) rotate(0deg)", opacity: "0" },
          "12%": { opacity: "0.9" },
          "100%": { transform: "translateY(-140px) rotate(55deg)", opacity: "0" },
        },
        sheen: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
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
        twinkle: "twinkle 3.6s ease-in-out infinite",
        "drift-up": "drift-up 9s linear infinite",
        sheen: "sheen 5s linear infinite",
      },
      transitionTimingFunction: {
        glow: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
