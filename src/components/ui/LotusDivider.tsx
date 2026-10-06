"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/** A single-stroke lotus + hairline that draws itself in when scrolled into view. */
export function LotusDivider({ tone = "ink", className = "" }: { tone?: "ink" | "light"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const stroke = tone === "light" ? "rgba(255,255,255,0.7)" : "#2FA39A";
  const line = tone === "light" ? "rgba(255,255,255,0.25)" : "rgba(78,106,208,0.35)";
  const draw = reduce ? { pathLength: 1 } : { pathLength: inView ? 1 : 0 };

  return (
    <div ref={ref} aria-hidden className={`flex items-center justify-center gap-6 py-10 ${className}`}>
      <span className="h-px w-24 sm:w-40" style={{ background: `linear-gradient(90deg, transparent, ${line})` }} />
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        {[0, 60, 120, 180, 240, 300].map((a, i) => (
          <motion.ellipse
            key={a}
            cx="32" cy="16" rx="8" ry="14"
            stroke={stroke} strokeWidth="1.3"
            transform={`rotate(${a} 32 32)`}
            initial={reduce ? false : { pathLength: 0 }}
            animate={draw}
            transition={{ duration: 1.2, delay: i * 0.08, ease: "easeInOut" }}
          />
        ))}
        <motion.circle
          cx="32" cy="32" r="8" stroke={stroke} strokeWidth="1.3"
          initial={reduce ? false : { pathLength: 0 }}
          animate={draw}
          transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        />
      </svg>
      <span className="h-px w-24 sm:w-40" style={{ background: `linear-gradient(90deg, ${line}, transparent)` }} />
    </div>
  );
}
