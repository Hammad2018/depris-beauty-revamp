"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Starfield } from "@/components/ui/Starfield";
import { signature } from "@/lib/brand";

const stages = [
  { k: "molecule", label: "01 · The molecule", title: "Three amino acids, one copper ion.", body: "GHK-Cu is a tripeptide — glycine, histidine, lysine — carrying a copper ion. Small enough to reach where it matters, specific enough to act like a message." },
  { k: "cell", label: "02 · The signal", title: "It tells fibroblasts to get back to work.", body: "In skin, GHK-Cu is read as a repair signal: collagen and elastin production rises, and the enzymes that break them down settle. Night is when that signal lands best." },
  { k: "drop", label: "03 · The drop", title: "High-purity, topical grade, lot-tested.", body: "GHK-Cu – Topical Cosmetic (1g) is the real Depris signature: a cosmetic-grade copper peptide you fold into your nightly routine. The lot certificate proves what is in the tube." },
];

function Molecule({ active }: { active: boolean }) {
  const atoms = [
    { x: 60, y: 110, r: 16, c: "#8E9FE6" }, { x: 120, y: 80, r: 18, c: "#5CC3B8" }, { x: 180, y: 112, r: 16, c: "#B9A3DE" },
    { x: 240, y: 84, r: 18, c: "#5CC3B8" }, { x: 150, y: 170, r: 22, c: "#E3B34C" },
  ];
  const bonds: [number, number][] = [[0, 1], [1, 2], [2, 3], [1, 4], [2, 4]];
  return (
    <svg viewBox="0 0 300 240" className="h-full w-full" aria-hidden>
      {bonds.map(([a, b], i) => (
        <motion.line key={i} x1={atoms[a].x} y1={atoms[a].y} x2={atoms[b].x} y2={atoms[b].y} stroke="rgba(236,243,255,0.6)" strokeWidth="2"
          initial={false} animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }} transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }} />
      ))}
      {atoms.map((a, i) => (
        <motion.circle key={i} cx={a.x} cy={a.y} r={a.r} fill={a.c}
          initial={false} animate={{ scale: active ? [1, 1.08, 1] : 0.6, opacity: active ? 1 : 0 }}
          transition={{ scale: { repeat: Infinity, duration: 3 + i * 0.4, ease: "easeInOut" }, opacity: { duration: 0.5, delay: i * 0.08 } }}
          style={{ transformOrigin: `${a.x}px ${a.y}px`, filter: "drop-shadow(0 0 14px rgba(92,195,184,0.6))" }} />
      ))}
      <text x="150" y="226" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="2">GLY · HIS · LYS · Cu²⁺</text>
    </svg>
  );
}

function Cell({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 300 240" className="h-full w-full" aria-hidden>
      {[110, 80, 50].map((r, i) => (
        <motion.circle key={r} cx="150" cy="120" r={r} fill="none" stroke="rgba(142,159,230,0.5)" strokeWidth="1"
          initial={false} animate={{ scale: active ? [1, 1.04, 1] : 0.8, opacity: active ? 0.9 - i * 0.2 : 0 }}
          transition={{ scale: { repeat: Infinity, duration: 4 + i, ease: "easeInOut" }, opacity: { duration: 0.5 } }} style={{ transformOrigin: "150px 120px" }} />
      ))}
      <motion.circle cx="150" cy="120" r="26" fill="#2E3C9E" stroke="#8E9FE6" initial={false} animate={{ opacity: active ? 1 : 0 }} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <motion.circle key={i} r="4" fill="#5CC3B8" initial={false}
            animate={active ? { cx: [150 + Math.cos(a) * 120, 150 + Math.cos(a) * 32], cy: [120 + Math.sin(a) * 120, 120 + Math.sin(a) * 32], opacity: [0, 1, 0] } : { opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2.4, delay: i * 0.35, ease: "easeIn" }}
            style={{ filter: "drop-shadow(0 0 8px rgba(92,195,184,0.9))" }} />
        );
      })}
      <text x="150" y="226" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="var(--font-mono), monospace" letterSpacing="2">FIBROBLAST · COLLAGEN ↑ · MMP ↓</text>
    </svg>
  );
}

/** Molecule → cell → drop: a pinned three-stage scrollytelling sequence. */
export function ScienceJourney() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [i, setI] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    const n = Math.min(stages.length - 1, Math.floor(v * stages.length));
    if (n !== i) setI(n);
  });
  const bar = useTransform(p, [0, 1], ["0%", "100%"]);
  const s = stages[i];

  const visual = (k: string, active: boolean) =>
    k === "molecule" ? <Molecule active={active} /> : k === "cell" ? <Cell active={active} /> : (
      <div className="relative h-full w-full overflow-hidden rounded-[2rem]"><Image src={signature.image} alt={signature.title} fill sizes="50vw" className="object-cover" /></div>
    );

  if (reduce) {
    return (
      <section className="bg-navy-deep py-20 text-white">
        <div className="shell space-y-16">
          {stages.map((st) => (
            <div key={st.k} className="grid items-center gap-8 lg:grid-cols-2">
              <div className="aspect-[5/4]">{visual(st.k, true)}</div>
              <div><p className="mono-label text-teal-glow">{st.label}</p><h2 className="mt-3 font-display text-4xl">{st.title}</h2><p className="mt-4 text-white/70">{st.body}</p></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-navy-deep text-white" style={{ height: `${stages.length * 110}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Starfield />
        <div className="shell relative grid w-full items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[5/4] w-full">
            <AnimatePresence mode="wait">
              <motion.div key={s.k} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: 0.5 }} className="absolute inset-0">
                {visual(s.k, true)}
              </motion.div>
            </AnimatePresence>
          </div>
          <div>
            <div className="mb-6 h-px w-full bg-white/10"><motion.div style={{ width: bar }} className="h-px bg-gradient-to-r from-teal-glow to-periwinkle" /></div>
            <AnimatePresence mode="wait">
              <motion.div key={s.k} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}>
                <p className="mono-label text-teal-glow">{s.label}</p>
                <h2 className="mt-3 font-display text-4xl leading-[1.02] sm:text-5xl">{s.title}</h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">{s.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
