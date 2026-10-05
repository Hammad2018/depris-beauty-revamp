import type { Metadata } from "next";
import { getCommerce } from "@/lib/commerce";
import { PageHero } from "@/components/sections/PageHero";
import { ShopView } from "@/components/commerce/ShopView";

export const metadata: Metadata = {
  title: "Shop all",
  description: "Shop advanced Korean skincare — serums, peptides, boosters and more. Filter by concern and ingredient.",
};

export default async function ShopPage() {
  const products = await getCommerce().getProducts();
  return (
    <>
      <PageHero
        eyebrow="Shop all"
        title="Every active, one shelf"
        intro="Filter by concern or ingredient to find your perfect match — or take the quiz for a tailored routine."
      />
      <ShopView products={products} />
    </>
  );
}
