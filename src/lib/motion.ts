import type { Variants } from "framer-motion";

/** Strong ease-out (same curve as --ease-out) for entrances. */
export const easeOut = [0.23, 1, 0.32, 1] as const;
export const easeDrawer = [0.32, 0.72, 0, 1] as const;

// Full transform strings keep reveals on the compositor while the page is still loading
// (framer's x/y shorthands run on the main thread and drop frames under load).
export const fadeUp: Variants = {
  hidden: { opacity: 0, transform: "translateY(14px)" },
  show: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.42, ease: easeOut } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export const viewportOnce = { once: true, amount: 0.01, margin: "0px 0px -40px 0px" } as const;
