"use client";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; r: number; hx: number; hy: number };

/**
 * "Peptide constellation": luminous nodes drift and bond into short chains like a
 * star map. On mount they gather into a lotus (six petals + core) then relax;
 * they lean toward the pointer and jitter with scroll velocity. Canvas 2D, lazy,
 * reduced-motion renders a static frame.
 */
export function Constellation({
  className = "",
  count = 70,
  linkDist = 110,
}: {
  className?: string;
  count?: number;
  linkDist?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cv: HTMLCanvasElement = canvas;
    const c: CanvasRenderingContext2D = ctx;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, t0 = performance.now();
    let nodes: Node[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    let lastY = window.scrollY, vel = 0;

    // Lotus target points (six petal tips + inner ring + core), centred on the canvas.
    function lotusPoints(n: number) {
      const cx = w * 0.5, cy = h * 0.5, R = Math.min(w, h) * 0.26;
      const pts: { x: number; y: number }[] = [];
      for (let i = 0; i < n; i++) {
        const petal = i % 6, k = Math.floor(i / 6) / Math.max(1, Math.floor(n / 6));
        const a = (petal / 6) * Math.PI * 2 - Math.PI / 2;
        // points along each petal (ellipse-ish lobe)
        const along = 0.18 + k * 0.82;
        const spread = Math.sin(k * Math.PI) * R * 0.22;
        const px = cx + Math.cos(a) * R * along + Math.cos(a + Math.PI / 2) * spread * (i % 2 ? 1 : -1);
        const py = cy + Math.sin(a) * R * along + Math.sin(a + Math.PI / 2) * spread * (i % 2 ? 1 : -1);
        pts.push({ x: px, y: py });
      }
      return pts;
    }

    function seed() {
      const rect = cv.getBoundingClientRect();
      w = rect.width; h = rect.height;
      cv.width = Math.max(1, w * dpr); cv.height = Math.max(1, h * dpr);
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = w < 640 ? Math.round(count * 0.55) : count;
      const targets = lotusPoints(n);
      nodes = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.9,
        hx: targets[i].x, hy: targets[i].y,
      }));
      t0 = performance.now();
    }
    seed();
    const ro = new ResizeObserver(seed);
    ro.observe(cv);

    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.active = true;
    };
    const onLeave = () => { pointer.active = false; };
    const onScroll = () => { const y = window.scrollY; vel = Math.max(-40, Math.min(40, y - lastY)); lastY = y; };
    const parent = cv.parentElement ?? cv;
    parent.addEventListener("pointermove", onMove, { passive: true });
    parent.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    function draw(elapsed: number) {
      c.clearRect(0, 0, w, h);
      // gather phase: 0.4s → 2.6s pull toward lotus, then release
      const gather = elapsed < 2600 ? Math.min(1, Math.max(0, (elapsed - 400) / 1400)) * (elapsed < 2200 ? 1 : 1 - (elapsed - 2200) / 400) : 0;
      for (const n of nodes) {
        if (!reduce) {
          if (gather > 0) {
            n.vx += (n.hx - n.x) * 0.012 * gather;
            n.vy += (n.hy - n.y) * 0.012 * gather;
          }
          if (pointer.active) {
            const dx = pointer.x - n.x, dy = pointer.y - n.y, d2 = dx * dx + dy * dy;
            if (d2 < 220 * 220) { const f = 0.0009 * (1 - Math.sqrt(d2) / 220); n.vx += dx * f; n.vy += dy * f; }
          }
          n.vy -= vel * 0.0015;
          n.vx *= 0.96; n.vy *= 0.96;
          n.x += n.vx; n.y += n.vy;
          if (n.x < -10) n.x = w + 10; if (n.x > w + 10) n.x = -10;
          if (n.y < -10) n.y = h + 10; if (n.y > h + 10) n.y = -10;
        }
      }
      vel *= 0.9;
      // bonds
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.55;
            const g = c.createLinearGradient(a.x, a.y, b.x, b.y);
            g.addColorStop(0, `rgba(142,159,230,${alpha})`);
            g.addColorStop(1, `rgba(92,195,184,${alpha})`);
            c.strokeStyle = g; c.lineWidth = 0.8;
            c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke();
          }
        }
      }
      // nodes
      for (const n of nodes) {
        c.beginPath(); c.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        c.fillStyle = "rgba(236,243,255,0.95)";
        c.shadowColor = "rgba(92,195,184,0.9)"; c.shadowBlur = n.r * 4;
        c.fill(); c.shadowBlur = 0;
      }
    }

    if (reduce) {
      // settle into the lotus statically
      nodes.forEach((n) => { n.x = n.hx + (Math.random() - 0.5) * 14; n.y = n.hy + (Math.random() - 0.5) * 14; });
      draw(5000);
    } else {
      const loop = (now: number) => { draw(now - t0); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      parent.removeEventListener("pointermove", onMove); parent.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduce, count, linkDist]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
