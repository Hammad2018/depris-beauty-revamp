"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Pause, Play } from "@phosphor-icons/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { faces } from "@/lib/faces";
import { concernLabels } from "@/lib/taxonomy";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { WordReveal } from "@/components/ui/WordReveal";
import { Constellation } from "@/components/ui/Constellation";
import { LightRays } from "@/components/ui/LightRays";
import { TrustPills } from "@/components/ui/TrustPills";
import { Petal } from "@/components/petals/Petal";

const EASE = [0.23, 1, 0.32, 1] as const;
const INTERVAL = 6000;

/**
 * Hero: the customers the products are for. One large portrait, a row of faces to switch
 * between, each with a concern and a line in their own voice. Rotates slowly on its own, pauses
 * on hover, focus, a tap, or when the visitor prefers reduced motion.
 */
export function Hero({ product }: { product: { handle: string; title: string; image?: string; price: string } }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const timer = useRef<number | null>(null);
  const face = faces[i];

  const next = useCallback(() => setI((v) => (v + 1) % faces.length), []);

  useEffect(() => {
    if (reduce || paused || userPaused) return;
    timer.current = window.setInterval(next, INTERVAL);
    return () => { if (timer.current) window.clearInterval(timer.current); };
  }, [reduce, paused, userPaused, next]);

  return (
    <section
      className="celestial relative overflow-hidden text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Constellation />
      <LightRays />
      <Petal tone="blush" size={150} shape="leaf" opacity={0.16} className="absolute -left-12 top-[60%] rotate-[18deg]" />
      <Petal tone="lilac" size={90} shape="leaf" opacity={0.2} className="absolute right-[36%] top-10 -rotate-[25deg]" />

      <div className="shell relative grid items-center gap-10 pb-10 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6 lg:pb-14 lg:pt-16">
        {/* Words */}
        <div className="relative z-10 lg:w-[112%]">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mono-label text-teal-glow">
            Luxury Korean skincare · Pro aesthetics
          </motion.p>

          <h1 className="mt-6 text-5xl leading-[1.04] sm:text-6xl xl:text-[4.4rem]">
            <WordReveal text="Turn back the clock," className="block font-display text-white lg:whitespace-nowrap" />
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block font-display italic text-metallic text-metallic-dark lg:whitespace-nowrap"
                initial={reduce ? false : { transform: "translateY(110%)", opacity: 0 }}
                animate={{ transform: "translateY(0%)", opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              >
                one drop at a time.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, transform: "translateY(10px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
            className="mt-6 max-w-md text-lg leading-relaxed text-white/75"
          >
            Copper peptides, exosomes and skin boosters: clinic-grade Korean actives for skin with a story, shipped same day from the US.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, transform: "translateY(10px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ delay: 0.62, duration: 0.6, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticLink href="/quiz" variant="primary">Build my ritual</MagneticLink>
            <MagneticLink href={`/products/${product.handle}`} variant="light">Shop GHK-Cu</MagneticLink>
          </motion.div>

          {/* The signature, small and real, beside the words rather than instead of the person */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-10 hidden items-center gap-4 lg:flex"
          >
            {product.image && (
              <Link href={`/products/${product.handle}`} className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/15 shadow-lift">
                <Image src={product.image} alt={product.title} fill sizes="64px" className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
              </Link>
            )}
            <div>
              <p className="mono-label mono-label-plain text-white/60">The signature</p>
              <Link href={`/products/${product.handle}`} className="font-display text-xl text-white hover:text-teal-glow">{product.title} · {product.price}</Link>
            </div>
          </motion.div>
        </div>

        {/* The customer */}
        <div className="relative z-10 mx-auto w-full max-w-[30rem] lg:mt-6 lg:max-w-none">
          <div className="relative aspect-[3/4] w-full max-w-[26rem] lg:ml-auto lg:max-w-[27rem]">
            {/* depth plate */}
            <motion.div
              aria-hidden
              initial={reduce ? false : { opacity: 0, transform: "translate(14px, 14px) rotate(-3deg)" }}
              animate={{ opacity: 1, transform: "translate(0px, 0px) rotate(-3deg)" }}
              transition={{ duration: 1, ease: EASE, delay: 0.35 }}
              className="absolute -bottom-6 -left-6 right-8 top-8 rounded-[2.5rem] border border-white/15 bg-white/5 backdrop-blur-sm"
            />
            <div className="absolute inset-[22%] rounded-full bg-teal-glow/25 blur-3xl" />

            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-navy-deep shadow-lift">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={face.id}
                  className="absolute inset-0"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "scale(1.04)" }}
                  animate={{ opacity: 1, transform: "scale(1)" }}
                  exit={{ opacity: 0, transition: { duration: 0.35, ease: EASE } }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <Image
                    src={face.image}
                    alt={face.alt}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 90vw, 432px"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/85 via-navy-deep/20 to-transparent" />
              <span className="absolute left-5 top-5 rounded-md bg-ink/60 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-white/75 backdrop-blur">Campaign preview</span>

              {/* their line */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={face.id}
                    initial={{ opacity: 0, transform: "translateY(8px)" }}
                    animate={{ opacity: 1, transform: "translateY(0px)" }}
                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <p className="font-display text-xl leading-snug text-white sm:text-2xl">“{face.line}”</p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/75">
                      <span className="font-medium text-white">{face.name}, {face.age}</span>
                      <Link href={`/collections/concern-${face.concern}`} className="inline-flex items-center gap-1 text-teal-glow hover:underline">
                        {concernLabels[face.concern]} <ArrowRight size={12} />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* the faces */}
          <div className="relative z-20 mt-6 flex items-center gap-3 lg:absolute lg:-left-8 lg:bottom-10 lg:mt-0 lg:flex-col lg:items-start" role="group" aria-label="Choose a face">
            <div className="flex items-center gap-1.5 lg:flex-col">
              {faces.map((f, idx) => {
                const on = idx === i;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => { setI(idx); setUserPaused(true); }}
                    aria-pressed={on}
                    aria-label={`${f.name}, ${f.age}, ${concernLabels[f.concern]}`}
                    className={`relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 transition-[transform,border-color] duration-200 ease-out ${on ? "scale-110 border-teal-glow" : "border-white/30 hover:border-white/70"}`}
                  >
                    <Image src={f.thumb} alt="" fill sizes="44px" className="object-cover" />
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setUserPaused((v) => !v)}
              aria-label={userPaused ? "Resume slideshow" : "Pause slideshow"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white/60 lg:mt-1"
            >
              {userPaused || reduce ? <Play size={14} weight="fill" /> : <Pause size={14} weight="fill" />}
            </button>
          </div>
        </div>
      </div>

      <div className="shell relative z-10 pb-10 pt-4">
        <TrustPills />
      </div>
    </section>
  );
}
