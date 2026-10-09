import type { Metadata } from "next";
import Link from "next/link";
import { getCommerce } from "@/lib/commerce";
import { slugify } from "@/lib/slug";
import Image from "next/image";
import type { Product } from "@/lib/commerce/types";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Brands",
  description: "The Korean skincare brands we carry, Bellmona, 2XSOME and the Depris labs.",
};

export default async function BrandsPage() {
  const products = await getCommerce().getProducts();
  const brands = new Map<string, Product[]>();
  for (const p of products) brands.set(p.brand, [...(brands.get(p.brand) ?? []), p]);

  return (
    <>
      <PageHero eyebrow="Brands" title="Curated Korean beauty brands" intro="Hand-picked labels, from everyday heroes to pro-grade innovators." />
      <section className="shell grid gap-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {[...brands.entries()].map(([brand, items], i) => (
          <Link
            key={brand}
            href={`/brands/${slugify(brand)}`}
            className={`group overflow-hidden bg-porcelain shadow-soft transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-glow ${i % 2 ? "r-petal-alt" : "r-petal"}`}
          >
            <div className="grid grid-cols-3 gap-2 bg-sand/60 p-4">
              {items.slice(0, 3).map((p) => (
                <span key={p.id} className="relative aspect-square overflow-hidden rounded-xl bg-porcelain">
                  {p.images[0]?.url && <Image src={p.images[0].url} alt="" fill sizes="120px" className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" />}
                </span>
              ))}
            </div>
            <div className="p-6">
              <p className="font-display text-2xl text-ink group-hover:text-camellia">{brand}</p>
              <p className="mt-1 text-sm text-ink-soft">{items.length} product{items.length > 1 ? "s" : ""} on the shelf</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
