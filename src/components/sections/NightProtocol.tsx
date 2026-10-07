"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { MoonPhase } from "@/components/ui/MoonPhase";
import { MagneticLink } from "@/components/ui/MagneticButton";

const steps = [
  { n: "01", time: "21:00", title: "Prep", body: "A low-pH glutathione and PDRN toner clears the day and primes skin for actives.", product: "Glutanex Glow Therapy Toner", href: "/products/glutanex-glow-therapy-toner" },
  { n: "02", time: "21:05", title: "Activate", body: "A pea of GHK-Cu while skin is still damp. Copper tripeptides signal collagen as you sleep.", product: "GHK-Cu Topical Cosmetic", href: "/products/ghk-cu-topical-cosmetic-1g" },
  { n: "03", time: "21:10", title: "Restore", body: "Exosome booster on alternate nights for radiance that reads clinic-grade by morning.", product: "2XSOME Skin Booster", href: "/products/2xsome-skin-booster" },
  { n: "04", time: "07:00", title: "Seal", body: "Daylight: luminous SPF locks the night's work in and evens tone for the day.", product: "Bellmona CC Cream Sunscreen", href: "/products/bellmona-cc-cream-sunscreen-50ml" },
];

/** Night protocol: moon waxes as the four steps scroll past a pinned stage. */
export function NightProtocol({ media = {} }: { media?: Record<string, string> }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.6", "end 0.9"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(p, "change", (v) => {
    const i = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    if (i !== active) setActive(i);
  });
  const skyY = useTransform(p, [0, 1], ["0%", "-12%"]);
  const s = steps[active];
  const imgOf = (href: string) => media[href.replace("/products/", "")] ?? "/renders/sky.webp";

  return (
    <section ref={ref} className="relative overflow-clip bg-navy-deep text-white">
      <motion.div style={reduce ? undefined : { y: skyY }} className="absolute inset-x-0 -top-[12%] h-[124%]">
        <Image src="/renders/sky.webp" alt="" fill sizes="100vw" className="object-cover opacity-70" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep" />

      <div className="shell relative grid gap-12 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-20 lg:self-start">
          <p className="mono-label text-teal-glow">The night protocol</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.02] sm:text-5xl xl:text-6xl">
            Your night, <span className="italic text-metallic text-metallic-dark">in four drops.</span>
          </h2>
          <p className="mt-4 max-w-md text-white/70">
            Skin repairs on a clock. The ritual follows it — from the last light at 21:00 to the first at 07:00.
          </p>

          <div className="mt-6 flex items-center gap-6">
            <MoonPhase progress={p} size={72} />
            <div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={s.time}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="font-display text-4xl tabular-nums"
                >
                  {s.time}
                </motion.p>
              </AnimatePresence>
              <p className="mono-label mono-label-plain text-white/60">Step {s.n} · {s.title}</p>
            </div>
          </div>

          <div className="relative mt-6 aspect-[16/9] max-h-[30vh] w-full overflow-hidden rounded-[1.5rem] shadow-lift">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.href}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                className="absolute inset-0"
              >
                <Image src={imgOf(s.href)} alt={s.product} fill sizes="(max-width:1024px) 90vw, 40vw" className="liquid object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/80 to-transparent p-5">
              <Link href={s.href} className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2 text-sm hover:bg-white/20">
                {s.product} <span>→</span>
              </Link>
            </div>
          </div>
          <div className="mt-5"><MagneticLink href="/quiz" variant="primary">Build my ritual</MagneticLink></div>
        </div>

        <ol className="space-y-2">
          {steps.map((st, i) => (
            <li key={st.n} className="flex min-h-[52vh] flex-col justify-center py-6 lg:min-h-[64vh]">
              <motion.div animate={{ opacity: i === active ? 1 : 0.35, x: i === active ? 0 : -6 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center gap-4">
                  <span className="index-num font-display italic !text-white/0" style={{ WebkitTextStroke: "1.2px rgba(255,255,255,0.55)" }}>{st.n}</span>
                  <span className="sheen-line w-16" />
                  <span className="mono-label mono-label-plain text-white/60">{st.time}</span>
                </div>
                <h3 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{st.title}</h3>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-white/70">{st.body}</p>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
