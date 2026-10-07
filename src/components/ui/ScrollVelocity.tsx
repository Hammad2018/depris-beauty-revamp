"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { useEffect } from "react";

/**
 * Publishes smoothed scroll velocity as CSS custom properties on <html>:
 *   --scroll-vel  (px/frame, signed, clamped ±40)
 *   --liquid      (0–1 magnitude used by the liquid displacement filter)
 * and drives the shared SVG displacement filter's scale. One listener for the whole app.
 */
export function ScrollVelocity() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const root = document.documentElement;
    let last = window.scrollY, vel = 0, raf = 0;
    const disp = document.getElementById("liquid-disp") as SVGFEDisplacementMapElement | null;
    const tick = () => {
      const y = window.scrollY;
      const dv = Math.max(-40, Math.min(40, y - last));
      last = y;
      vel += (dv - vel) * 0.18;
      const mag = Math.min(1, Math.abs(vel) / 28);
      root.style.setProperty("--scroll-vel", vel.toFixed(2));
      root.style.setProperty("--liquid", mag.toFixed(3));
      if (disp) disp.setAttribute("scale", (mag * 26).toFixed(1));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
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
