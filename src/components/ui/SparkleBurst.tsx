"use client";

import { AnimatePresence, motion } from "framer-motion";

const COLORS = ["#5CC3B8", "#E3B34C", "#B9A3DE", "#E79A90", "#8E9FE6", "#2FA39A"];

/** One-shot sparkle burst (8 particles), mount with a changing `burstKey` to fire. */
export function SparkleBurst({ burstKey }: { burstKey: number }) {
  return (
    <AnimatePresence>
      {burstKey > 0 && (
        <span key={burstKey} className="pointer-events-none absolute inset-0" aria-hidden>
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const dist = 28 + (i % 3) * 8;
            return (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 block h-1.5 w-1.5 rounded-full"
                style={{ background: COLORS[i % COLORS.length] }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 1.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              />
            );
          })}
        </span>
      )}
    </AnimatePresence>
  );
}
