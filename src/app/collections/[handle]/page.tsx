import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCommerce } from "@/lib/commerce";
import { PageHero } from "@/components/sections/PageHero";
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
  const [col, products] = await Promise.all([
    commerce.getCollection(params.handle),
    commerce.getProducts({ collection: params.handle }),
  ]);

  const special = specialTitles[params.handle];
  if (!col && !special && products.length === 0) notFound();

  const title = col?.title ?? special?.title ?? "Collection";
  const description = col?.description ?? special?.description ?? "";

  return (
    <>
      <PageHero eyebrow="Collection" title={title} intro={description} />
      <ShopView products={products} />
    </>
  );
}
