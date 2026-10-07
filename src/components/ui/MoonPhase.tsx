"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";

/** Crescent → full moon driven by a 0–1 MotionValue (scroll progress). */
export function MoonPhase({ progress, size = 72, className = "" }: { progress: MotionValue<number>; size?: number; className?: string }) {
  // shadow disc slides from fully covering (new) to off (full)
  const cx = useTransform(progress, [0, 1], [50, 118]);
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden>
      <defs>
        <radialGradient id="moonG" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#CBD6DA" />
        </radialGradient>
        <mask id="moonMask">
          <rect width="100" height="100" fill="#fff" />
          <motion.circle cx={cx} cy="50" r="46" fill="#000" />
        </mask>
      </defs>
      <circle cx="50" cy="50" r="46" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="46" fill="url(#moonG)" mask="url(#moonMask)" />
    </svg>
  );
}
