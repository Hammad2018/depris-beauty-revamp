"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkle } from "@phosphor-icons/react";
import type { Product } from "@/lib/commerce/types";
import { concernLabels } from "@/lib/taxonomy";
import { greetingFor, ritualFor, usePersonal } from "@/lib/personal";
import { ProductCard } from "@/components/commerce/ProductCard";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { LotusFlourish } from "@/components/petals/Petal";

const MORNING = ["glutanex-glow-therapy-toner", "bellmona-cc-cream-sunscreen-50ml", "puri-eyes-pdrn-eye-patch", "glutanex-snow-white-cream-50ml"];
const NIGHT = ["ghk-cu-topical-cosmetic-1g", "glutanex-night-serum-30ml", "medisco-skin-glow-mask-100ml", "glutanex-snow-white-cream-50ml"];

/**
 * The shelf that knows you. Reads the visitor's quiz result and recent views from the browser;
 * with nothing stored it still tailors by time of day (morning vs night ritual).
 */
export function PersonalShelf({ products, exclude, compact = false }: { products: Product[]; exclude?: string; compact?: boolean }) {
  const personal = usePersonal();
  if (!personal) return <div aria-hidden className={compact ? "h-0" : "min-h-[28rem]"} />;

  const byHandle = new Map(products.map((p) => [p.handle, p]));
  const concern = personal.concerns[0];
  const ritual = ritualFor();

  let title: string;
  let sub: string;
  let picks: Product[] = [];
  if (concern) {
    picks = products.filter((p) => p.concerns.includes(concern) && p.handle !== exclude);
    title = `Picked for ${concernLabels[concern].toLowerCase()}`;
    sub = personal.skinType ? `From your quiz: ${personal.skinType} skin, ${concernLabels[concern].toLowerCase()} first.` : "From your skin quiz.";
  } else {
    picks = (ritual === "night" ? NIGHT : MORNING).map((h) => byHandle.get(h)).filter((p): p is Product => Boolean(p) && p!.handle !== exclude);
    title = ritual === "night" ? "Your night ritual" : "Your morning ritual";
    sub = ritual === "night" ? "The repair shift starts when the lights go down." : "Prep, protect, and get out the door.";
  }
  const recent = personal.recent.map((h) => byHandle.get(h)).filter((p): p is Product => Boolean(p) && p!.handle !== exclude).slice(0, 4);
  const shown = picks.slice(0, compact ? 3 : 4);
  if (shown.length === 0 && recent.length === 0) return null;

  return (
    <section className={`relative ${compact ? "" : "mesh-light"}`}>
      <div className={`shell ${compact ? "py-14" : "py-20 lg:py-24"}`}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="relative">
            <LotusFlourish size={56} tone="blush" className="absolute -left-7 -top-7 opacity-80" />
            <p className="relative mono-label text-camellia">
              <Sparkle size={12} weight="fill" className="mr-1.5 inline -translate-y-px" />
              {greetingFor()}{personal.name ? `, ${personal.name}` : ""}.
            </p>
            <h2 className={`relative mt-2 font-display text-ink ${compact ? "text-3xl" : "h-display"}`}>{title}</h2>
            <p className="mt-3 max-w-md text-ink-soft">{sub}</p>
          </div>
          <Link href={concern ? "/quiz" : "/quiz"} className="inline-flex items-center gap-1.5 text-sm font-medium text-camellia hover:underline">
            {concern ? "Retake the quiz" : "Make it yours in 60 seconds"} <ArrowRight size={14} />
          </Link>
        </div>

        {shown.length > 0 && (
          <RevealGroup className={`mt-10 grid grid-cols-2 gap-4 sm:gap-6 ${compact ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
            {shown.map((p, i) => (
              <RevealItem key={p.id} className={i % 2 === 1 ? "lg:translate-y-8" : ""}>
                <ProductCard product={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        )}

        {recent.length > 0 && !compact && (
          <div className="mt-14">
            <p className="mono-label text-ink-soft">Back to your shelf</p>
            <ul className="mt-4 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {recent.map((p) => (
                <li key={p.id} className="shrink-0">
                  <Link href={`/products/${p.handle}`} className="group flex items-center gap-3 rounded-full border border-sand bg-porcelain/80 py-1.5 pl-1.5 pr-4 text-sm text-ink transition-colors hover:border-camellia">
                    <span className="relative h-9 w-9 overflow-hidden rounded-full bg-sand">
                      {p.images[0]?.url && <Image src={p.images[0].url} alt="" fill sizes="36px" className="object-cover" />}
                    </span>
                    <span className="max-w-[12rem] truncate">{p.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
