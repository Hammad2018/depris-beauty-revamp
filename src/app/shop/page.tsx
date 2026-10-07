import type { Metadata } from "next";
import { Suspense } from "react";
import { getCommerce } from "@/lib/commerce";
import { buildNavData } from "@/lib/nav";
import { PageHero } from "@/components/sections/PageHero";
import { ShopView } from "@/components/commerce/ShopView";

export const metadata: Metadata = {
  title: "Shop all",
  description: "Shop advanced Korean skincare — serums, peptides, boosters and more. Filter by category, concern and ingredient.",
};

export default async function ShopPage({ searchParams }: { searchParams: { q?: string; view?: string } }) {
  const commerce = getCommerce();
  const [products, collections] = await Promise.all([commerce.getProducts(), commerce.getCollections()]);
  const nav = buildNavData(products, collections);
  const q = searchParams.q?.trim();
  return (
    <>
      <PageHero
        eyebrow={q ? "Search" : searchParams.view === "concern" ? "Shop by concern" : "Shop all"}
        title={q ? <>Results for <span className="italic text-gradient">“{q}”</span></> : searchParams.view === "concern" ? "Start with your skin, not the shelf" : "Every active, one shelf"}
        intro={q ? "Refine with the filters, or clear the search to browse everything." : "Filter by category, concern or ingredient — or take the quiz for a tailored routine."}
      />
      <Suspense fallback={<div className="shell py-12 text-sm text-ink-soft">Loading the shelf…</div>}>
        <ShopView products={products} categories={nav.categories} />
      </Suspense>
    </>
  );
}
