"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/commerce/types";
import { useCart } from "@/lib/cart/CartContext";
import { toLineItem } from "@/lib/cart/item";
import { PriceBlock } from "./PriceBlock";

export function ProductPurchase({ product }: { product: Product }) {
  const cart = useCart();
  const [variant, setVariant] = useState(product.variants[0]);
  const [subscribe, setSubscribe] = useState(false);
  const [qty, setQty] = useState(1);
  // "Add to bag" → "Added ✓": a 2px blur bridges the label swap so it reads as one morph, not two labels.
  const [added, setAdded] = useState(false);
  const [swapping, setSwapping] = useState(false);
  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => { setSwapping(true); setTimeout(() => { setAdded(false); setSwapping(false); }, 180); }, 1400);
    return () => clearTimeout(t);
  }, [added]);
  function onAdd() {
    cart.add({ ...toLineItem(product, variant, subscribe), price: effectivePrice }, qty);
    setSwapping(true);
    setTimeout(() => { setAdded(true); setSwapping(false); }, 180);
  }

  const effectivePrice = subscribe ? Math.round(variant.price * 0.9 * 100) / 100 : variant.price;

  return (
    <div className="space-y-5">
      <div className="flex items-baseline gap-3">
        <PriceBlock price={effectivePrice} compareAtPrice={variant.compareAtPrice} currency={product.currency} size="lg" />
        {subscribe && <span className="text-sm font-medium text-sage">Save 10%</span>}
      </div>

      {product.variants.length > 1 && (
        <div>
          <p className="eyebrow mb-2">Size / option</p>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Variant">
            {product.variants.map((v) => (
              <button
                key={v.id}
                role="radio"
                aria-checked={v.id === variant.id}
                onClick={() => setVariant(v)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  v.id === variant.id
                    ? "border-camellia bg-camellia/10 text-ink"
                    : "border-sand text-ink-soft hover:border-bronze/60"
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.subscribable && (
        <fieldset className="space-y-2 rounded-2xl border border-sand p-4">
          <legend className="sr-only">Purchase type</legend>
          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <input type="radio" name="purchase" checked={!subscribe} onChange={() => setSubscribe(false)} className="accent-camellia" />
            One-time purchase
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <input type="radio" name="purchase" checked={subscribe} onChange={() => setSubscribe(true)} className="accent-camellia" />
            <span>
              Subscribe &amp; Save 10% <span className="text-ink-soft">— delivered every 1–3 months, cancel anytime</span>
            </span>
          </label>
        </fieldset>
      )}

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-full border border-sand">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3.5 py-2.5 text-ink-soft hover:text-ink" aria-label="Decrease quantity">
            −
          </button>
          <span className="min-w-[2rem] text-center">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} className="px-3.5 py-2.5 text-ink-soft hover:text-ink" aria-label="Increase quantity">
            +
          </button>
        </div>
        <button
          onClick={onAdd}
          className="btn-primary flex-1"
          disabled={!variant.available}
          aria-live="polite"
        >
          <span
            className="inline-block transition-[opacity,filter] duration-200 ease-out"
            style={swapping ? { filter: "blur(2px)", opacity: 0.6 } : undefined}
          >
            {!variant.available ? "Sold out" : added ? "Added ✓" : "Add to bag"}
          </span>
        </button>
      </div>
    </div>
  );
}
