"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "@/lib/commerce/types";
import { useCart } from "@/lib/cart/CartContext";
import { toLineItem } from "@/lib/cart/item";
import { money } from "@/lib/format";

/** Mobile sticky add-to-bag that appears once the main buy box scrolls out of view. */
export function StickyBuyBar({ product, watchId = "buy-box" }: { product: Product; watchId?: string }) {
  const cart = useCart();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = document.getElementById(watchId);
    if (!el) return;
    let raf = 0;
    const check = () => { raf = 0; setShow(el.getBoundingClientRect().bottom < 0); };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [watchId]);
  const v = product.variants[0];
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
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
