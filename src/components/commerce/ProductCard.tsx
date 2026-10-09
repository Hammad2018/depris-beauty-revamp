"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { Product } from "@/lib/commerce/types";
import { useCart } from "@/lib/cart/CartContext";
import { toLineItem } from "@/lib/cart/item";
import { ProductMedia } from "./ProductMedia";
import { PriceBlock } from "./PriceBlock";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { TiltCard } from "@/components/ui/TiltCard";
import { SparkleBurst } from "@/components/ui/SparkleBurst";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const cart = useCart();
  const variant = product.variants[0];
  const [added, setAdded] = useState(false);
  const [burst, setBurst] = useState(0);

  // pointer-following spotlight on the card border (hover-gated in CSS)
  const sx = useMotionValue(50);
  const sy = useMotionValue(0);
  const spot = useMotionTemplate`radial-gradient(220px circle at ${sx}% ${sy}%, rgba(47,163,154,0.9), rgba(78,106,208,0.55) 45%, transparent 70%)`;
  function onMove(e: React.PointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    sx.set(((e.clientX - r.left) / r.width) * 100);
    sy.set(((e.clientY - r.top) / r.height) * 100);
  }

  function add() {
    cart.add(toLineItem(product, variant));
    setAdded(true);
    setBurst((b) => b + 1);
    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <TiltCard className="group h-full [transform-style:preserve-3d]">
      <article
        onPointerMove={onMove}
        className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-porcelain shadow-soft transition-[transform,box-shadow] duration-200 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_28px_48px_-22px_rgba(78,106,208,0.45)]"
      >
        <motion.span aria-hidden className="spot-ring" style={{ background: spot }} />
        <Link href={`/products/${product.handle}`} className="block" aria-label={product.title}>
          <div className="relative aspect-square overflow-hidden">
            <ProductMedia product={product} priority={priority} className="h-full w-full" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute left-3 top-3 flex gap-1.5">
              {product.bestseller && <Badge tone="bestseller">Bestseller</Badge>}
              {product.isNew && <Badge tone="new">New</Badge>}
              {product.compareAtPrice && <Badge tone="sale">Sale</Badge>}
            </div>
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-5">
          <p className="eyebrow text-bronze-deep">{product.brand}</p>
          <Link href={`/products/${product.handle}`}>
            <h3 className="mt-1 font-display text-lg leading-snug text-ink transition-colors group-hover:text-camellia">
              {product.title}
            </h3>
          </Link>
          <StarRating rating={product.rating} count={product.reviewCount} className="mt-1.5" />
          <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{product.tagline}</p>

          <div className="mt-4 flex items-center justify-between">
            <PriceBlock price={product.price} compareAtPrice={product.compareAtPrice} currency={product.currency} />
            <span className="relative inline-flex">
              <SparkleBurst burstKey={burst} />
              <motion.button
                onClick={add}
                whileTap={{ scale: 0.92 }}
                className={`relative cursor-pointer rounded-full px-4 py-2 text-sm font-medium text-porcelain transition-colors ${
                  added ? "bg-sage" : "bg-ink hover:bg-camellia"
                }`}
                aria-label={`Add ${product.title} to bag`}
              >
                {added ? "Added ✓" : "Add +"}
              </motion.button>
            </span>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
