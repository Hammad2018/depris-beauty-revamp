"use client";

import Link from "next/link";
import type { Product, Tone } from "@/lib/commerce/types";
import { useCart } from "@/lib/cart/CartContext";
import { toLineItem } from "@/lib/cart/item";
import { money } from "@/lib/format";
import { ProductMediaMini } from "./ProductMediaMini";

const toneClass: Record<Tone, string> = {
  blush: "from-[#F7D9D4] to-[#FBECE6]",
  bronze: "from-[#EAD6B4] to-[#F5EAD7]",
  sage: "from-[#CBDAC9] to-[#E6EEE2]",
  sand: "from-[#EADBC6] to-[#F5ECDD]",
  ink: "from-[#4A4038] to-[#8A6A3E]",
};

export function BundleCard({
  title,
  description,
  tone,
  discountPct,
  products,
}: {
  title: string;
  description: string;
  tone: Tone;
  discountPct: number;
  products: Product[];
}) {
  const cart = useCart();
  const full = products.reduce((s, p) => s + p.price, 0);
  const price = Math.round(full * (1 - discountPct / 100) * 100) / 100;
  const saved = Math.round((full - price) * 100) / 100;

  function addAll() {
    const factor = 1 - discountPct / 100;
    for (const p of products) {
      const v = p.variants[0];
      cart.add({ ...toLineItem(p, v), price: Math.round(v.price * factor * 100) / 100 });
    }
  }

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-porcelain shadow-soft">
      <div className={`flex items-center gap-3 bg-gradient-to-br ${toneClass[tone]} p-6`}>
        {products.slice(0, 4).map((p) => (
          <ProductMediaMini key={p.id} tone={p.tone} alt={p.title} />
        ))}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-xl text-ink">{title}</h3>
          <span className="rounded-full bg-camellia/15 px-2.5 py-1 text-xs font-semibold text-camellia">Save {discountPct}%</span>
        </div>
        <p className="mt-2 text-sm text-ink-soft">{description}</p>
        <ul className="mt-4 space-y-1 text-sm text-ink-soft">
          {products.map((p) => (
            <li key={p.id}>
              <Link href={`/products/${p.handle}`} className="hover:text-ink">
                • {p.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-5">
          <p className="flex items-baseline gap-2">
            <span className="font-display text-2xl text-ink">{money(price)}</span>
            <span className="text-sm text-ink-soft line-through">{money(full)}</span>
            <span className="text-sm font-medium text-sage">Save {money(saved)}</span>
          </p>
          <button className="btn-primary mt-3 w-full" onClick={addAll}>
            Add all to bag
          </button>
        </div>
      </div>
    </article>
  );
}
