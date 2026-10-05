import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCommerce } from "@/lib/commerce";
import { slugify } from "@/lib/slug";
import { PageHero } from "@/components/sections/PageHero";
import { ProductGrid } from "@/components/commerce/ProductGrid";

export async function generateStaticParams() {
  const products = await getCommerce().getProducts();
  return Array.from(new Set(products.map((p) => slugify(p.brand)))).map((handle) => ({ handle }));
}

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const products = await getCommerce().getProducts();
  const brand = products.find((p) => slugify(p.brand) === params.handle)?.brand ?? "Brand";
  return { title: brand, description: `Shop ${brand} at Depris Beauty.` };
}

export default async function BrandPage({ params }: { params: { handle: string } }) {
  const products = await getCommerce().getProducts();
  const brandProducts = products.filter((p) => slugify(p.brand) === params.handle);
  if (brandProducts.length === 0) notFound();
  const brand = brandProducts[0].brand;

  return (
    <>
      <PageHero eyebrow="Brand" title={brand} intro={`Explore the full ${brand} range.`} />
      <section className="shell py-14">
        <ProductGrid products={brandProducts} />
      </section>
    </>
  );
}
