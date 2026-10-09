import type { Metadata } from "next";
import Link from "next/link";
import { getCommerce } from "@/lib/commerce";
import { slugify } from "@/lib/slug";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Brands",
  description: "The Korean skincare brands we carry, Bellmona, 2XSOME and the Depris labs.",
};

export default async function BrandsPage() {
  const products = await getCommerce().getProducts();
  const brands = new Map<string, number>();
  for (const p of products) brands.set(p.brand, (brands.get(p.brand) ?? 0) + 1);

  return (
    <>
      <PageHero eyebrow="Brands" title="Curated Korean beauty brands" intro="Hand-picked labels, from everyday heroes to pro-grade innovators." />
      <section className="shell grid gap-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {[...brands.entries()].map(([brand, count]) => (
          <Link
            key={brand}
            href={`/brands/${slugify(brand)}`}
            className="group rounded-3xl bg-porcelain p-8 shadow-soft transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-glow"
          >
            <p className="font-display text-2xl text-ink group-hover:text-camellia">{brand}</p>
            <p className="mt-1 text-sm text-ink-soft">{count} product{count > 1 ? "s" : ""}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
