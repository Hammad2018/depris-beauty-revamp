"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { Product } from "@/lib/commerce/types";
import { lots } from "@/lib/renders";
import { ProductMedia } from "@/components/commerce/ProductMedia";
import { PotencyCertificate } from "./PotencyCertificate";
import { Lightbox } from "@/components/ui/Lightbox";

/**
 * Glass-dome product stage: the title ghosts out as the bottle drops in; drag tilts it;
 * views switch beneath, and the Potency Certificate sits in the gallery like a photo.
 */
export function ProductStage({ product, lotId = "2611-D" }: { product: Product; lotId?: string }) {
  const reduce = useReducedMotion();
  const views = product.images
    .filter((img) => img.url)
    .slice(0, 5)
    .map((img, i) => ({ id: `img-${i}`, src: img.url as string, label: i === 0 ? "Hero" : `View ${i + 1}`, alt: img.alt }));
  const [view, setView] = useState<string>(views[0]?.id ?? "img-0");
  const [landed, setLanded] = useState(!!reduce);
  const [cert, setCert] = useState(false);
  const lot = lots[lotId];

  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const rx = useSpring(useTransform(dy, [-200, 200], [10, -10]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(dx, [-200, 200], [-14, 14]), { stiffness: 120, damping: 14 });
  const sheenX = useTransform(dx, [-200, 200], ["-30%", "130%"]);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setLanded(true), 700);
    return () => clearTimeout(t);
  }, [reduce]);

  const current = views.find((v) => v.id === view) ?? views[0];

  return (
    <div className="relative">
      <div className="glass-dome relative aspect-square w-full overflow-hidden rounded-[2.5rem]">
        {/* ghost title */}
        <motion.p
          aria-hidden
          animate={{ opacity: landed ? 0.08 : 0.9, scale: landed ? 1.08 : 1 }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="pointer-events-none absolute inset-x-0 top-[12%] px-6 text-center font-display text-4xl leading-none text-white sm:text-6xl"
        >
          {product.title}
        </motion.p>

        {/* plinth */}
        <div className="pointer-events-none absolute inset-x-[18%] bottom-[12%] h-6 rounded-[100%] bg-teal-glow/30 blur-xl" />
        <div className="pointer-events-none absolute inset-x-[28%] bottom-[14%] h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

        {/* bottle */}
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.18}
          onDrag={(_, info) => { dx.set(info.offset.x); dy.set(info.offset.y); }}
          onDragEnd={() => { dx.set(0); dy.set(0); }}
          style={reduce ? undefined : { rotateX: rx, rotateY: ry }}
          initial={reduce ? false : { y: -220, opacity: 0, rotate: -8 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.5 }}
          className="absolute inset-[6%] cursor-grab touch-none active:cursor-grabbing [transform-style:preserve-3d]"
          aria-label="Drag to tilt the bottle"
        >
          <AnimatePresence mode="wait">
            <motion.div key={current?.id ?? "media"} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} className="absolute inset-0">
              {current ? (
                <Image src={current.src} alt={current.alt} fill priority sizes="(max-width:1024px) 92vw, 50vw" className="rounded-[2rem] object-cover" />
              ) : (
                <ProductMedia product={product} priority className="h-full w-full rounded-[2rem]" />
              )}
            </motion.div>
          </AnimatePresence>
          <motion.div style={{ left: sheenX }} className="pointer-events-none absolute top-0 h-full w-24 -skew-x-12 bg-gradient-to-r from-transparent via-white/14 to-transparent" />
        </motion.div>

        <p className="mono-label mono-label-plain pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-white/45">Drag to tilt</p>
      </div>

      {/* views */}
      <div className="mt-4 grid grid-cols-6 gap-2">
        {views.map((v) => (
          <button
            key={v.id}
            onClick={() => setView(v.id)}
            aria-pressed={view === v.id}
            className={`group relative aspect-square overflow-hidden rounded-xl border transition ${view === v.id ? "border-teal-glow" : "border-white/15 hover:border-white/40"}`}
          >
            <Image src={v.src} alt="" fill sizes="10vw" className="object-cover" />
            <span className="absolute inset-x-0 bottom-0 bg-navy-deep/70 px-1 py-0.5 text-[9px] text-white/80">{v.label}</span>
          </button>
        ))}
        {lot && (
          <button onClick={() => setCert(true)} className="relative aspect-square overflow-hidden rounded-xl border border-white/15 bg-[#FBF8F1] p-1.5 text-left hover:border-teal-glow" aria-label="Open potency certificate">
            <span className="mono-label mono-label-plain text-[7px] leading-none text-camellia">COA</span>
            <span className="mt-1 block font-display text-[11px] leading-tight text-ink">Lot {lot.lot}</span>
            <span className="absolute bottom-1 right-1.5 text-[9px] text-ink-soft">⤢</span>
          </button>
        )}
      </div>

      {lot && (
        <Lightbox open={cert} onClose={() => setCert(false)} label="Potency certificate">
          <PotencyCertificate lot={lot} />
        </Lightbox>
      )}
    </div>
  );
}
