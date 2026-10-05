import type { Product } from "@/lib/commerce/types";
import { ProductCard } from "./ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CrossSell({ title, eyebrow, products }: { title: string; eyebrow?: string; products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="shell py-14">
      <SectionHeading eyebrow={eyebrow} title={title} />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {products.slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
