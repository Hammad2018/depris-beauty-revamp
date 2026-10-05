"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "primary" | "ink" | "ghost" | "light";
const cls: Record<Variant, string> = {
  primary: "btn-primary",
  ink: "btn-ink",
  ghost: "btn-ghost",
  light: "btn border border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:-translate-y-0.5",
};

/** A button/link that softly pulls toward the cursor (magnetic). */
export function MagneticLink({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 18);
    y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 12);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span style={{ x: sx, y: sy, display: "inline-flex" }} onMouseMove={onMove} onMouseLeave={reset}>
      <Link ref={ref} href={href} className={`${cls[variant]} ${className}`}>
        {children}
      </Link>
    </motion.span>
  );
}
