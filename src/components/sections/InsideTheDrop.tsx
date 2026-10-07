"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { Product } from "@/lib/commerce/types";
import { useCart } from "@/lib/cart/CartContext";
import { toLineItem } from "@/lib/cart/item";
import { money } from "@/lib/format";
import { Starfield } from "@/components/ui/Starfield";
import { StarRating } from "@/components/ui/StarRating";
import { SparkleBurst } from "@/components/ui/SparkleBurst";

const labels = [
  { k: "01", name: "Copper Tripeptide-1", role: "GHK-Cu · signal peptide", note: "Supports collagen and firmness", at: { x: 14, y: 30 }, from: { x: 40, y: 42 } },
  { k: "02", name: "High-purity topical base", role: "cosmetic grade · 1 g", note: "Mixes into your serum or cream", at: { x: 80, y: 24 }, from: { x: 60, y: 38 } },
  { k: "03", name: "Pairs with AHK-Cu", role: "2-pack offer · save $6", note: "Skin by night, scalp and hair by day", at: { x: 82, y: 72 }, from: { x: 58, y: 66 } },
];

function OfferCard({ product }: { product: Product }) {
  const cart = useCart();
  const [burst, setBurst] = useState(0);
  const v = product.variants[0];
  return (
    <div className="glass-dark rounded-3xl p-6 text-white shadow-lift">
      <p className="mono-label text-teal-glow">The signature</p>
      <h3 className="mt-2 font-display text-2xl leading-tight">{product.title}</h3>
      <div className="mt-2"><StarRating rating={product.rating} count={product.reviewCount} /></div>
      <p className="mt-3 text-sm text-white/70">{product.tagline}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="font-display text-2xl">{money(v.price, product.currency)}</span>
        <span className="relative inline-flex">
          <SparkleBurst burstKey={burst} />
          <button
            onClick={() => { cart.add(toLineItem(product, v), 1); setBurst((b) => b + 1); }}
            className="btn-primary"
          >
            Add to bag
          </button>
        </span>
      </div>
      <Link href={`/products/${product.handle}`} className="mt-3 inline-block text-xs text-white/60 underline-offset-4 hover:text-white hover:underline">
        Full ingredient dossier →
      </Link>
    </div>
  );
}

/**
 * Pinned "inside the drop" sequence: the bottle condenses from blur to focus,
 * leader lines draw to three actives, then the bottle steps aside for the offer.
 */
export function InsideTheDrop({ product }: { product: Product }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const blur = useTransform(p, [0, 0.22], [18, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;
  const scale = useTransform(p, [0, 0.22, 0.75, 0.95], [0.78, 1, 1, 0.86]);
  const opacity = useTransform(p, [0, 0.12], [0.1, 1]);
  const bottleX = useTransform(p, [0.72, 0.92], ["0%", "-26%"]);
  const headOpacity = useTransform(p, [0.05, 0.2, 0.62, 0.72], [0, 1, 1, 0]);
  const headY = useTransform(p, [0.05, 0.2], [20, 0]);
  const offerOpacity = useTransform(p, [0.8, 0.94], [0, 1]);
  const offerX = useTransform(p, [0.8, 0.94], [48, 0]);
  const labelsOpacity = useTransform(p, [0.7, 0.8], [1, 0]);
  const hintOpacity = useTransform(p, [0, 0.08], [1, 0]);

  // leader lines: staggered draw
  const d1 = useTransform(p, [0.28, 0.44], [0, 1]);
  const d2 = useTransform(p, [0.36, 0.52], [0, 1]);
  const d3 = useTransform(p, [0.44, 0.6], [0, 1]);
  const draws = [d1, d2, d3];

  if (reduce) {
    return (
      <section className="relative overflow-hidden bg-navy-deep py-20 text-white">
        <Starfield />
        <div className="shell relative">
          <p className="mono-label text-teal-glow">Inside the drop</p>
          <h2 className="h-display mt-3 font-display">What&apos;s inside <span className="italic text-metallic text-metallic-dark">one drop</span></h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr_1fr] lg:items-center">
            <ul className="space-y-6">
              {labels.map((l) => (
                <li key={l.k}>
                  <p className="mono-label mono-label-plain text-white/60">{l.k} · {l.role}</p>
                  <p className="mt-1 font-display text-xl">{l.name}</p>
                  <p className="text-sm text-white/65">{l.note}</p>
                </li>
              ))}
            </ul>
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[2rem]"><Image src={product.images[1]?.url ?? product.images[0]?.url ?? "/renders/sky.webp"} alt={product.title} fill sizes="40vw" className="object-cover" /></div>
            <OfferCard product={product} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-navy-deep text-white" style={{ height: "340vh" }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <Starfield />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_55%,rgba(92,195,184,0.16),transparent_70%)]" />

        {/* heading */}
        <motion.div style={{ opacity: headOpacity, y: headY }} className="shell relative z-10 pt-10 text-center lg:pt-14">
          <p className="mono-label text-teal-glow">Inside the drop</p>
          <h2 className="h-display mt-3 font-display">
            What&apos;s inside <span className="italic text-metallic text-metallic-dark">one drop</span>
          </h2>
        </motion.div>

        {/* stage */}
        <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4">
          <motion.div style={{ filter, scale, opacity, x: bottleX }} className="relative aspect-square w-[min(72vh,92vw)] will-change-transform">
            <Image src={product.images[0]?.url ?? "/renders/sky.webp"} alt={product.title} fill sizes="70vh" className="rounded-[2.5rem] object-cover shadow-lift" />
          </motion.div>

          {/* leader lines + labels */}
          <motion.div style={{ opacity: labelsOpacity }} className="pointer-events-none absolute inset-0 hidden md:block">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              {labels.map((l, i) => (
                <motion.path
                  key={l.k}
                  d={`M ${l.from.x} ${l.from.y} L ${(l.from.x + l.at.x) / 2} ${l.at.y} L ${l.at.x} ${l.at.y}`}
                  fill="none"
                  stroke="rgba(236,243,255,0.7)"
                  strokeWidth="0.18"
                  vectorEffect="non-scaling-stroke"
                  style={{ pathLength: draws[i] }}
                />
              ))}
            </svg>
            {labels.map((l, i) => (
              <motion.div
                key={l.k}
                style={{ opacity: draws[i], left: `${l.at.x}%`, top: `${l.at.y}%` }}
                className={`absolute max-w-[14rem] ${l.at.x > 50 ? "" : "-translate-x-full"} -translate-y-1/2 px-3`}
              >
                <p className="mono-label mono-label-plain text-white/60">{l.k} · {l.role}</p>
                <p className="mt-1 font-display text-lg leading-tight">{l.name}</p>
                <p className="text-xs text-white/65">{l.note}</p>
              </motion.div>
            ))}
            {labels.map((l, i) => (
              <motion.span
                key={`dot-${l.k}`}
                style={{ opacity: draws[i], left: `${l.from.x}%`, top: `${l.from.y}%` }}
                className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-glow shadow-[0_0_12px_rgba(92,195,184,0.9)]"
              />
            ))}
          </motion.div>

          {/* offer */}
          <motion.div style={{ opacity: offerOpacity, x: offerX }} className="absolute right-4 top-1/2 w-[22rem] max-w-[90vw] -translate-y-1/2 lg:right-[8%]">
            <OfferCard product={product} />
          </motion.div>
        </div>

        <motion.p style={{ opacity: hintOpacity }} className="mono-label mono-label-plain relative z-10 pb-6 text-center text-white/50">
          Scroll to open the drop
        </motion.p>
      </div>
    </section>
  );
}
