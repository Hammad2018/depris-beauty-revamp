"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import type { Product } from "@/lib/commerce/types";
import { useCart } from "@/lib/cart/CartContext";
import { toLineItem } from "@/lib/cart/item";
import { money } from "@/lib/format";

/** Mobile sticky add-to-bag that appears once the main buy box has scrolled out of view. */
export function StickyBuyBar({ product, watchId = "buy-box" }: { product: Product; watchId?: string }) {
  const cart = useCart();
  const [show, setShow] = useState(false);
  const el = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", () => {
    el.current ??= document.getElementById(watchId);
    if (!el.current) return;
    const past = el.current.getBoundingClientRect().bottom < 0;
    if (past !== show) setShow(past);
  });
  const v = product.variants[0];
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ transform: "translateY(100%)" }}
          animate={{ transform: "translateY(0%)" }}
          exit={{ transform: "translateY(100%)", transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] } }}
          transition={{ duration: 0.26, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/60 bg-cream/85 px-4 py-3 backdrop-blur-xl lg:hidden"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">{product.title}</p>
              <p className="text-sm text-ink-soft">{money(v.price, product.currency)}</p>
            </div>
            <button onClick={() => cart.add(toLineItem(product, v), 1)} className="btn-primary px-6 py-3">Add to bag</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
