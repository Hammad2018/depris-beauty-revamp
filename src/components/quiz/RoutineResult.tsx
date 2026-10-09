"use client";

import Link from "next/link";
import type { RoutineItem } from "@/lib/quiz/logic";
import { useCart } from "@/lib/cart/CartContext";
import { toLineItem } from "@/lib/cart/item";
import { money } from "@/lib/format";
import { ProductMediaMini } from "@/components/commerce/ProductMediaMini";

export function RoutineResult({ routine, onRestart }: { routine: RoutineItem[]; onRestart: () => void }) {
  const cart = useCart();
  const total = routine.reduce((sum, i) => sum + i.product.price, 0);

  function addAll() {
    for (const item of routine) {
      cart.add(toLineItem(item.product, item.product.variants[0]));
    }
  }

  return (
    <section className="shell max-w-3xl py-16">
      <div className="text-center">
        <p className="eyebrow text-camellia">Your custom routine</p>
        <h1 className="mt-3 font-display text-4xl text-ink">Here&apos;s your Depris ritual</h1>
        <p className="mt-3 text-ink-soft">
          {routine.length} steps, chosen for your skin. Add the full routine in one tap, or pick and choose.
        </p>
      </div>

      <ol className="mt-10 space-y-4">
        {routine.map((item, i) => (
          <li key={item.step} className="flex items-center gap-4 rounded-3xl bg-porcelain p-4 shadow-soft">
            <span className="font-display text-xl text-bronze">{String(i + 1).padStart(2, "0")}</span>
            <ProductMediaMini tone={item.product.tone} alt={item.product.title} image={item.product.images[0]?.url} />
            <div className="flex-1">
              <p className="eyebrow text-bronze-deep">{item.reason}</p>
              <Link href={`/products/${item.product.handle}`} className="font-display text-lg text-ink hover:text-camellia">
                {item.product.title}
              </Link>
            </div>
            <div className="text-right">
              <p className="font-medium text-ink">{money(item.product.price, item.product.currency)}</p>
              <button
                onClick={() => cart.add(toLineItem(item.product, item.product.variants[0]))}
                className="mt-1 text-xs font-medium text-camellia underline"
              >
                Add
              </button>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-col items-center gap-3 rounded-3xl bg-gradient-to-br from-[#FBECE6] to-[#E6EEE2] p-6 text-center">
        <p className="text-ink-soft">
          Routine total: <span className="font-display text-xl text-ink">{money(total)}</span>
        </p>
        <button className="btn-primary" onClick={addAll}>
          Add full routine to bag
        </button>
        <button className="text-sm text-ink-soft underline" onClick={onRestart}>
          Retake the quiz
        </button>
      </div>
    </section>
  );
}
