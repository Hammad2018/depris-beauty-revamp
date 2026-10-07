"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { useEffect, useRef } from "react";

/** Celestial twinkling starfield on a <canvas>. Lightweight, reduced-motion safe. */
export function Starfield({ className = "", density = 0.00014 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cv = canvas;
    const c = ctx;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, t = 0;
    type Star = { x: number; y: number; r: number; a: number; tw: number; spd: number };
    let stars: Star[] = [];

    function seed() {
      const rect = cv.getBoundingClientRect();
      w = rect.width; h = rect.height;
      cv.width = Math.max(1, w * dpr);
      cv.height = Math.max(1, h * dpr);
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(120, Math.max(36, Math.floor(w * h * density)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.3,
        a: Math.random() * 0.5 + 0.35,
        tw: Math.random() * Math.PI * 2,
        spd: Math.random() * 0.02 + 0.006,
      }));
    }
    seed();
    const ro = new ResizeObserver(seed);
    ro.observe(cv);

    function frame() {
      c.clearRect(0, 0, w, h);
      for (const s of stars) {
        const alpha = reduce ? s.a : s.a * (0.45 + 0.55 * Math.sin(s.tw + t * s.spd * 50));
        c.beginPath();
        c.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        c.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        c.shadowColor = "rgba(190,214,255,0.9)";
        c.shadowBlur = s.r * 2.5;
        c.fill();
        if (!reduce) {
          s.y -= s.spd * 3;
          if (s.y < -2) { s.y = h + 2; s.x = Math.random() * w; }
        }
      }
      if (!reduce) { t += 1; raf = requestAnimationFrame(frame); }
    }
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [reduce, density]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
