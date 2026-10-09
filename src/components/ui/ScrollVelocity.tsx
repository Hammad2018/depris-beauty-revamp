"use client";

import { useEffect } from "react";
import { useMotionValueEvent, useScroll, useSpring, useVelocity } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Publishes smoothed scroll velocity as CSS custom properties on <html>:
 *   --scroll-vel  (signed, clamped, in px/frame-ish units)
 *   --liquid      (0–1 magnitude used by the liquid displacement filter)
 * and drives the shared SVG displacement filter's scale. Built on Motion's useScroll
 * + useVelocity so there is no window scroll listener of our own.
 */
export function ScrollVelocity() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY); // px per second
  const smooth = useSpring(velocity, { stiffness: 120, damping: 30, mass: 0.6 });

  useMotionValueEvent(smooth, "change", (v) => {
    if (reduce) return;
    const root = document.documentElement;
    const perFrame = Math.max(-40, Math.min(40, v / 60));
    const mag = Math.min(1, Math.abs(perFrame) / 28);
    root.style.setProperty("--scroll-vel", perFrame.toFixed(2));
    root.style.setProperty("--liquid", mag.toFixed(3));
    const disp = document.getElementById("liquid-disp");
    if (disp) disp.setAttribute("scale", (mag * 26).toFixed(1));
  });

  useEffect(() => {
    if (!reduce) return;
    const root = document.documentElement;
    root.style.setProperty("--scroll-vel", "0");
    root.style.setProperty("--liquid", "0");
  }, [reduce]);

  return (
    <svg aria-hidden className="pointer-events-none absolute h-0 w-0">
      <filter id="liquid" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="3" result="noise" />
        <feDisplacementMap id="liquid-disp" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
