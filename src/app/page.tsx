import { getCommerce } from "@/lib/commerce";
import { money } from "@/lib/format";
import { Hero } from "@/components/sections/Hero";
import { MarqueeRibbon } from "@/components/ui/MarqueeRibbon";
import { InsideTheDrop } from "@/components/sections/InsideTheDrop";
import { BentoShowcase } from "@/components/sections/BentoShowcase";
import { ShopByConcern } from "@/components/sections/ShopByConcern";
import { ProofBlock } from "@/components/sections/ProofBlock";
import { NightProtocol } from "@/components/sections/NightProtocol";
import { Lookbook } from "@/components/sections/Lookbook";
import { DeprisStandard } from "@/components/sections/DeprisStandard";
import { ProBand } from "@/components/sections/ProBand";
import { PRO_CATEGORIES } from "@/lib/nav";
import { EditorialTeasers } from "@/components/sections/EditorialTeasers";
import { FinaleCTA } from "@/components/sections/FinaleCTA";
import { GuidesTeaser } from "@/components/sections/GuidesTeaser";
import { FaqSection } from "@/components/sections/FaqSection";
import { CircleSection } from "@/components/community/CircleSection";
import { PersonalShelf } from "@/components/personal/PersonalShelf";
import { PetalSeam } from "@/components/petals/PetalSeam";

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
  const pro = ["2xsome-skin-booster", "plenaris-pro-80", "tesoro-collagen", "plenaris-exosome-hgf"]
    .map((h) => all.find((p) => p.handle === h))
    .filter((p): p is NonNullable<typeof p> => Boolean(p) && PRO_CATEGORIES.includes(p!.category));
  const media = Object.fromEntries(all.filter((p) => p.images[0]?.url).map((p) => [p.handle, p.images[0].url as string]));
  const titles = Object.fromEntries(all.map((p) => [p.handle, p.title]));

  // Three acts: dark (the drop, the facts, the night) → light (the shelf, concerns, the ritual,
  // the standard, the journal) → dark (professionals, finale). One deliberate theme switch each way.
  return (
    <>
      <Hero product={{ handle: hero.handle, title: hero.title, image: hero.images[0]?.url, price: money(hero.price, hero.currency) }} />
      <MarqueeRibbon />
      <InsideTheDrop product={hero} />
      <ProofBlock />
      <NightProtocol media={media} />
      <div className="relative"><PetalSeam position="top" /><PersonalShelf products={all} /></div>
      <BentoShowcase featured={hero} products={bestsellers} />
      <ShopByConcern collections={collections} />
      <GuidesTeaser />
      <Lookbook media={media} />
      <DeprisStandard />
      <FaqSection />
      <EditorialTeasers />
      <CircleSection titles={titles} />
      <div className="relative"><PetalSeam position="top" /><ProBand products={pro} /></div>
      <FinaleCTA />
    </>
  );
}
