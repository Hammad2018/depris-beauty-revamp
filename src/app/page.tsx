import { getCommerce } from "@/lib/commerce";
import { Hero } from "@/components/sections/Hero";
import { MarqueeRibbon } from "@/components/ui/MarqueeRibbon";
import { InsideTheDrop } from "@/components/sections/InsideTheDrop";
import { BentoShowcase } from "@/components/sections/BentoShowcase";
import { ShopByConcern } from "@/components/sections/ShopByConcern";
import { ProofBlock } from "@/components/sections/ProofBlock";
import { NightProtocol } from "@/components/sections/NightProtocol";
import { Lookbook } from "@/components/sections/Lookbook";
import { DeprisStandard } from "@/components/sections/DeprisStandard";
import { SocialProof } from "@/components/sections/SocialProof";
import { EditorialTeasers } from "@/components/sections/EditorialTeasers";
import { FinaleCTA } from "@/components/sections/FinaleCTA";
import { LotusDivider } from "@/components/ui/LotusDivider";

export default async function HomePage() {
  const commerce = getCommerce();
  const [bestsellers, collections, featured, all] = await Promise.all([
    commerce.getProducts({ collection: "bestsellers", limit: 4 }),
    commerce.getCollections(),
    commerce.getProduct("ghk-cu-topical-cosmetic-1g"),
    commerce.getProducts(),
  ]);
  const hero = featured ?? bestsellers[0];
  // real product photos for the story sections, keyed by handle
  const media = Object.fromEntries(all.filter((p) => p.images[0]?.url).map((p) => [p.handle, p.images[0].url as string]));

  // Story spine: the drop → what's inside → the edit → proof → the night ritual → the standard.
  return (
    <>
      <Hero image={hero.images[0]?.url ?? "/renders/sky.webp"} imageAlt={hero.title} />
      <MarqueeRibbon />
      <InsideTheDrop product={hero} />
      <BentoShowcase featured={hero} products={bestsellers} />
      <ShopByConcern collections={collections} />
      <ProofBlock />
      <NightProtocol media={media} />
      <Lookbook media={media} />
      <DeprisStandard />
      <LotusDivider />
      <SocialProof />
      <EditorialTeasers />
      <FinaleCTA />
    </>
  );
}
