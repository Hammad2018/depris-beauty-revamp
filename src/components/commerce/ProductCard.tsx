"use client";

import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { useCart } from "@/lib/cart/CartContext";
import { toLineItem } from "@/lib/cart/item";
import { ProductMedia } from "./ProductMedia";
import { PriceBlock } from "./PriceBlock";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const cart = useCart();
  const variant = product.variants[0];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-porcelain shadow-soft transition-all duration-300 ease-glow hover:-translate-y-1 hover:shadow-glow">
      <Link href={`/products/${product.handle}`} className="block" aria-label={product.title}>
        <div className="relative aspect-square">
          <ProductMedia product={product} priority={priority} className="h-full w-full" />
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
          <button
            onClick={() => cart.add(toLineItem(product, variant))}
            className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-porcelain transition-all hover:bg-camellia hover:-translate-y-0.5"
            aria-label={`Add ${product.title} to bag`}
          >
            Add +
          </button>
        </div>
      </div>
    </article>
  );
}
