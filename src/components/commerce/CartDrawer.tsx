"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart/CartContext";
import { money } from "@/lib/format";
import { shipTiers, samples } from "@/lib/content";
import { FreeShipProgress } from "./FreeShipProgress";
import { ProductMediaMini } from "./ProductMediaMini";
import Image from "next/image";
import type { NavProduct } from "@/lib/nav";
import { quickAddItem } from "@/lib/cart/item";

export function CartDrawer({ recommendations = [] }: { recommendations?: NavProduct[] }) {
  const cart = useCart();
  const inBag = new Set(cart.items.map((i) => i.productHandle));
  const suggest = recommendations.filter((r) => !inBag.has(r.handle)).slice(0, 3);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") cart.closeCart();
    }
    if (cart.isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cart.isOpen, cart]);

  const shopifyLive = Boolean(process.env.NEXT_PUBLIC_SHOPIFY_LIVE);

  return (
    <AnimatePresence>
      {cart.isOpen && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Shopping bag"
        >
          <button
            aria-label="Close cart"
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={cart.closeCart}
          />
          <motion.aside
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-lift"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
          >
            <header className="flex items-center justify-between border-b border-sand px-6 py-5">
              <h2 className="font-display text-xl text-ink">Your bag ({cart.count})</h2>
              <button onClick={cart.closeCart} className="rounded-full p-2 text-ink-soft hover:bg-sand" aria-label="Close">
                ✕
              </button>
            </header>

            {cart.items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="text-ink-soft">Your bag is empty.</p>
                <Link href="/quiz" onClick={cart.closeCart} className="btn-primary">
                  Take the skin quiz
                </Link>
                <Link href="/shop" onClick={cart.closeCart} className="text-sm font-medium text-camellia underline">
                  Shop bestsellers
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
                  <FreeShipProgress subtotal={cart.subtotal} tiers={shipTiers} />

                  <ul className="space-y-4">
                    {cart.items.map((item) => (
                      <li key={item.id} className="flex gap-4">
                        {item.image ? (
                          <Link href={`/products/${item.productHandle}`} onClick={cart.closeCart} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-sand">
                            <Image src={item.image} alt={item.title} fill sizes="80px" className="object-cover" />
                          </Link>
                        ) : (
                          <ProductMediaMini tone={item.tone} alt={item.title} />
                        )}
                        <div className="flex-1">
                          <p className="eyebrow text-bronze-deep">{item.brand}</p>
                          <p className="font-medium leading-snug text-ink">{item.title}</p>
                          <p className="text-xs text-ink-soft">{item.variantTitle}</p>
                          {item.subscribe && <p className="mt-0.5 text-xs font-medium text-sage">Subscribe &amp; Save 10%</p>}
                          <div className="mt-2 flex items-center gap-3">
                            <div className="flex items-center rounded-full border border-sand">
                              <button
                                className="px-2.5 py-1 text-ink-soft hover:text-ink"
                                onClick={() => cart.setQty(item.id, item.quantity - 1)}
                                aria-label={`Decrease ${item.title}`}
                              >
                                −
                              </button>
                              <span className="min-w-[1.5rem] text-center text-sm">{item.quantity}</span>
                              <button
                                className="px-2.5 py-1 text-ink-soft hover:text-ink"
                                onClick={() => cart.setQty(item.id, item.quantity + 1)}
                                aria-label={`Increase ${item.title}`}
                              >
                                +
                              </button>
                            </div>
                            <button
                              className="text-xs text-ink-soft underline hover:text-camellia"
                              onClick={() => cart.remove(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <p className="font-medium text-ink">
                          {money(item.price * item.quantity * (item.subscribe ? 0.9 : 1), undefined)}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {suggest.length > 0 && (
                    <div>
                      <p className="eyebrow mb-2 text-camellia">Complete the ritual</p>
                      <ul className="space-y-2">
                        {suggest.map((r) => (
                          <li key={r.handle} className="flex items-center gap-3 rounded-2xl border border-sand p-2">
                            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-sand">
                              {r.image && <Image src={r.image} alt="" fill sizes="48px" className="object-cover" />}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-medium text-ink">{r.title}</span>
                              <span className="text-xs text-ink-soft">{money(r.price, r.currency)}</span>
                            </span>
                            <button onClick={() => cart.add(quickAddItem(r), 1)} className="rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-porcelain hover:bg-camellia">Add +</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <p className="eyebrow mb-2 text-camellia">Add a free sample</p>
                    <div className="grid grid-cols-2 gap-2">
                      {samples.map((s) => {
                        const active = cart.sampleId === s.id;
                        return (
                          <button
                            key={s.id}
                            onClick={() => cart.setSample(active ? null : s.id)}
                            aria-pressed={active}
                            className={`rounded-xl border px-3 py-2 text-left text-xs transition ${
                              active ? "border-camellia bg-camellia/10 text-ink" : "border-sand text-ink-soft hover:border-bronze/60"
                            }`}
                          >
                            {s.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <footer className="space-y-3 border-t border-sand px-6 py-5">
                  <div className="flex items-center justify-between text-ink">
                    <span className="text-ink-soft">Subtotal</span>
                    <span className="font-display text-xl">{money(cart.subtotal)}</span>
                  </div>
                  <button className="btn-primary w-full" disabled={!shopifyLive}>
                    {shopifyLive ? "Checkout" : "Checkout (connect Shopify to enable)"}
                  </button>
                  <div className="flex items-center justify-center gap-3 text-xs text-ink-soft">
                    <span>Shop Pay</span>
                    <span>·</span>
                    <span>Apple Pay</span>
                    <span>·</span>
                    <span>G Pay</span>
                  </div>
                  <p className="text-center text-[11px] text-ink-soft/70">
                    Taxes &amp; shipping calculated at checkout · 30-day returns
                  </p>
                </footer>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
