"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Outline-to-fill display text. The stroked copy sits underneath; the filled copy is
 * clipped with `clip-path: inset()` and unclips as the heading scrolls into the viewport.
 * Reduced motion → plain filled text.
 */
export function ScrollFill({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 92%", "start 45%"] });
  const clip = useTransform(scrollYProgress, (v) => `inset(0 ${Math.round((1 - v) * 100)}% 0 0)`);

  if (reduce) return <span className={className}>{children}</span>;
  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span aria-hidden className="outline-layer absolute inset-0 select-none">{children}</span>
      <motion.span style={{ clipPath: clip }} className="relative block">{children}</motion.span>
    </span>
  );
}
