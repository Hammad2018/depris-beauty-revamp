import { getCommerce } from "@/lib/commerce";
import { Hero } from "@/components/sections/Hero";
import { ShopByConcern } from "@/components/sections/ShopByConcern";
import { ActivesSpotlight } from "@/components/sections/ActivesSpotlight";
import { RoutineStrip } from "@/components/sections/RoutineStrip";
import { SocialProof } from "@/components/sections/SocialProof";
import { EditorialTeasers } from "@/components/sections/EditorialTeasers";
import { FeatureBand } from "@/components/sections/FeatureBand";
import { FinaleCTA } from "@/components/sections/FinaleCTA";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { TrustBand } from "@/components/commerce/TrustBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { MarqueeRibbon } from "@/components/ui/MarqueeRibbon";

export default async function HomePage() {
  const commerce = getCommerce();
  const [bestsellers, collections] = await Promise.all([
    commerce.getProducts({ collection: "bestsellers", limit: 4 }),
    commerce.getCollections(),
  ]);

  return (
    <>
      <Hero />
      <MarqueeRibbon />

      {/* 01 — light mesh */}
      <ShopByConcern collections={collections} />

      {/* 02 — tinted band */}
      <section className="mesh-tint">
        <div className="shell py-20 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading index="02" eyebrow="Reach for these first" title="Bestsellers" size="xl" />
            <ButtonLink href="/collections/bestsellers" variant="ghost" className="hidden sm:inline-flex">
              View all
            </ButtonLink>
          </div>
          <div className="mt-12">
            <ProductGrid products={bestsellers} priorityCount={4} />
          </div>
        </div>
      </section>

      {/* signature pinned beat — dark celestial */}
      <FeatureBand />

      {/* light tint */}
      <RoutineStrip />

      {/* 03 — dark science */}
      <ActivesSpotlight />

      {/* light mesh */}
      <section className="mesh-light">
        <div className="shell py-20">
          <SectionHeading
            index="·"
            eyebrow="Why Depris"
            title="Authentic actives, delivered fast"
            align="center"
            size="xl"
            className="mb-12"
          />
          <TrustBand />
        </div>
      </section>

      {/* 04 — social proof */}
      <SocialProof />

      {/* 05 — editorial */}
      <EditorialTeasers />

      <FinaleCTA />
    </>
  );
}
