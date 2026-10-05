import { getCommerce } from "@/lib/commerce";
import { Hero } from "@/components/sections/Hero";
import { ShopByConcern } from "@/components/sections/ShopByConcern";
import { ActivesSpotlight } from "@/components/sections/ActivesSpotlight";
import { RoutineStrip } from "@/components/sections/RoutineStrip";
import { SocialProof } from "@/components/sections/SocialProof";
import { EditorialTeasers } from "@/components/sections/EditorialTeasers";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { TrustBand } from "@/components/commerce/TrustBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export default async function HomePage() {
  const commerce = getCommerce();
  const [bestsellers, collections] = await Promise.all([
    commerce.getProducts({ collection: "bestsellers", limit: 4 }),
    commerce.getCollections(),
  ]);

  return (
    <>
      <Hero />

      <ShopByConcern collections={collections} />

      <section className="shell py-16">
        <div className="flex items-end justify-between">
          <SectionHeading eyebrow="Reach for these first" title="Bestsellers" />
          <ButtonLink href="/collections/bestsellers" variant="ghost" className="hidden sm:inline-flex">
            View all
          </ButtonLink>
        </div>
        <div className="mt-10">
          <ProductGrid products={bestsellers} priorityCount={4} />
        </div>
      </section>

      <section className="shell pb-4 pt-8">
        <SectionHeading
          eyebrow="Why Depris"
          title="Authentic actives, delivered fast"
          align="center"
          className="mb-10"
        />
        <TrustBand />
      </section>

      <ActivesSpotlight />
      <RoutineStrip />
      <SocialProof />
      <EditorialTeasers />
    </>
  );
}
