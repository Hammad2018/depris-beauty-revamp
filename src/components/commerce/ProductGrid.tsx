import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, priorityCount = 0 }: { products: Product[]; priorityCount?: number }) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl bg-porcelain/60 p-12 text-center">
        <p className="font-display text-xl text-ink">No matches — yet.</p>
        <p className="mt-2 text-ink-soft">Try removing a filter or take the skin quiz for tailored picks.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < priorityCount} />
      ))}
    </div>
  );
}
