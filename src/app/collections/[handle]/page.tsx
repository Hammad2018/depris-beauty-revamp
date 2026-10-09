import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCommerce } from "@/lib/commerce";
import { PRO_CATEGORIES, buildNavData } from "@/lib/nav";
import { CollectionHero } from "@/components/sections/CollectionHero";
import { ShopView } from "@/components/commerce/ShopView";

const specialTitles: Record<string, { title: string; description: string }> = {
  bestsellers: { title: "Bestsellers", description: "The actives our community reaches for first." },
  new: { title: "New arrivals", description: "The latest additions to the Depris shelf." },
  promos: { title: "Promos", description: "Limited-time offers and bundles." },
};

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const commerce = getCommerce();
  const col = await commerce.getCollection(params.handle);
  const special = specialTitles[params.handle];
  const title = col?.title ?? special?.title ?? "Collection";
  return { title, description: col?.description ?? special?.description };
}

export default async function CollectionPage({ params }: { params: { handle: string } }) {
  const commerce = getCommerce();
  const [col, products, all, collections] = await Promise.all([
    commerce.getCollection(params.handle),
    commerce.getProducts({ collection: params.handle }),
    commerce.getProducts(),
    commerce.getCollections(),
  ]);

  const special = specialTitles[params.handle];
  if (!col && !special) notFound();

  const title = col?.title ?? special?.title ?? "Collection";
  const description = col?.description ?? special?.description ?? "";
  const isConcern = Boolean(col?.concern);
  const isPro = PRO_CATEGORIES.includes(params.handle);
  const siblings = isConcern
    ? collections.filter((c) => c.concern)
    : collections.filter((c) => !c.concern && (PRO_CATEGORIES.includes(c.handle) === isPro) && !["promos", "gift-cards"].includes(c.handle));
  const nav = buildNavData(all, collections);

  return (
    <>
      <CollectionHero collection={{ title, description, handle: params.handle }} products={products} siblings={siblings} pro={isPro} />
      <Suspense fallback={<div className="shell py-12 text-sm text-ink-soft">Loading…</div>}>
        <ShopView products={products} categories={isConcern ? nav.categories : []} lockedCategory={isConcern ? undefined : params.handle} />
      </Suspense>
    </>
  );
}
