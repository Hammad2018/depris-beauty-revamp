import type { Concern } from "@/lib/commerce/types";

export interface GuideSection {
  heading: string;
  body: string[];
  /** product handles to embed as shoppable cards after this section */
  products?: string[];
  tip?: string;
}

export interface Guide {
  slug: string;
  title: string;
  deck: string;
  audience: "everyone" | "beginners" | "clinics";
  concerns: Concern[];
  readMins: number;
  image: string;
  accent: "jade" | "periwinkle" | "blush" | "lilac" | "gold";
  sections: GuideSection[];
  faqIds: string[];
}

export const guides: Guide[] = [
  {
    slug: "ghk-cu-starter",
    title: "The GHK-Cu starter guide",
    deck: "How to mix, dose and layer the copper tripeptide without wasting a milligram.",
    audience: "beginners",
    concerns: ["aging", "dullness"],
    readMins: 7,
    image: "/renders/journal-copper.webp",
    accent: "jade",
    sections: [
      { heading: "What you are holding", body: ["GHK-Cu is a naturally occurring copper tripeptide. In skincare it is prized for supporting the skin's own renewal signals, which is why it sits at the centre of the Depris signature line.", "The 1 g jar is a concentrate. It is not applied neat. You dilute a tiny amount into a carrier serum or a sterile water base and use that over weeks."] },
      { heading: "A simple first dilution", body: ["Start low. A common cosmetic strength is around 1 percent. For a 30 mL serum that is roughly 0.3 g, which is less than you think: the jar will carry you through many bottles.", "Mix into a fragrance-free, low-pH carrier. Avoid strong acids and vitamin C in the same bottle; copper peptides prefer calm company."], products: ["ghk-cu-topical-cosmetic-1g", "glutanex-glow-therapy-toner"], tip: "Label the bottle with the date. Use within eight weeks and keep it out of direct sun." },
      { heading: "Where it goes in the ritual", body: ["Cleanse, tone, then your GHK-Cu serum on damp skin. Follow with a cream to seal. At night it pairs naturally with a brightening serum; alternate rather than stack if your skin is new to actives."], products: ["glutanex-night-serum-30ml"] },
      { heading: "What to expect, honestly", body: ["Weeks one to two: skin feels calmer and better hydrated. Weeks three to six: texture and tone look more even. Firmness is a slower story and shows up with consistent use.", "The blue tint is the copper. It fades on contact and will not stain."] },
    ],
    faqIds: ["ghk-dilute", "ghk-vitc", "cold-chain"],
  },
  {
    slug: "layering-actives",
    title: "Layering actives without the sting",
    deck: "Peptides, glutathione, exosomes and acids: which can share a night, and which need their own.",
    audience: "everyone",
    concerns: ["aging", "redness", "dullness"],
    readMins: 6,
    image: "/renders/journal-routine.webp",
    accent: "periwinkle",
    sections: [
      { heading: "Thin to thick, calm to strong", body: ["Order by texture first: watery toner, then serums, then cream, then SPF in the morning. Within serums, put the gentlest first and let each absorb for a minute."] },
      { heading: "Pairs that get along", body: ["Copper peptides with hyaluronic acid or niacinamide. Glutathione serums with PDRN toners. Exosome boosters with a bland moisturiser.", "Keep strong acids and copper peptides on different nights until your skin tells you otherwise."], products: ["glutanex-glow-therapy-toner", "ghk-cu-topical-cosmetic-1g", "glutanex-snow-white-cream-50ml"] },
      { heading: "A seven-night rhythm", body: ["Nights one, three, five: peptide night. Nights two, four, six: brightening night. Night seven: a mask and nothing else. Simple, repeatable, kind to the barrier."], products: ["medisco-skin-glow-mask-100ml"], tip: "If anything stings for more than a few seconds, that pair is not for you yet. Separate them by a night." },
    ],
    faqIds: ["ghk-vitc", "sensitive"],
  },
  {
    slug: "exosome-aftercare",
    title: "Exosome aftercare for clinics",
    deck: "A protocol sheet for the 72 hours after microneedling with a skin booster.",
    audience: "clinics",
    concerns: ["aging", "redness"],
    readMins: 5,
    image: "/renders/journal-exosome.webp",
    accent: "lilac",
    sections: [
      { heading: "In the chair", body: ["Apply the booster to freshly channelled skin in thin passes. Let it absorb rather than massaging. Keep the room cool and the product chilled until use."], products: ["2xsome-skin-booster", "plenaris-exosome-hgf"] },
      { heading: "The first 24 hours", body: ["No actives, no makeup, no heat. A bland hydrating mask or a soothing ampoule only. Send clients home with the written sheet and your number."], products: ["medisco-skin-glow-mask-100ml"] },
      { heading: "Days two and three", body: ["Mineral SPF from day two. Reintroduce peptides on day four, acids after a week. Book the follow-up photo at day fourteen."], tip: "Depris ships cold-chain same day from Wyoming, so order the day before a clinic list rather than stocking long." },
    ],
    faqIds: ["pro-account", "cold-chain", "returns"],
  },
  {
    slug: "glass-skin-routine",
    title: "A glass-skin routine in five steps",
    deck: "The Korean approach to luminous, even skin, built from products on this shelf.",
    audience: "beginners",
    concerns: ["dullness", "dryness", "pores"],
    readMins: 8,
    image: "/renders/skin.webp",
    accent: "blush",
    sections: [
      { heading: "Step one: a toner that does work", body: ["Glass skin starts with hydration layered thin. A low-pH glutathione toner preps the surface and gives everything after it a better chance."], products: ["glutanex-glow-therapy-toner"] },
      { heading: "Step two: the treat step", body: ["Alternate a brightening night serum with a peptide night. Both are light enough to layer under cream."], products: ["glutanex-night-serum-30ml", "ghk-cu-topical-cosmetic-1g"] },
      { heading: "Step three: seal", body: ["A cream that locks moisture without sitting heavy. Press rather than rub."], products: ["glutanex-snow-white-cream-50ml"] },
      { heading: "Step four: daylight", body: ["Tinted SPF every morning, reapplied at lunch. This is the step that protects the other four."], products: ["bellmona-cc-cream-sunscreen-50ml"] },
      { heading: "Step five: the weekly reset", body: ["One mask night a week, eye patches on the mornings that need it."], products: ["medisco-skin-glow-mask-100ml", "puri-eyes-pdrn-eye-patch"] },
    ],
    faqIds: ["sensitive", "shipping"],
  },
  {
    slug: "sunscreen-decoded",
    title: "Sunscreen, decoded",
    deck: "Chemical, mineral, tinted and CC: what the labels mean and how much to use.",
    audience: "everyone",
    concerns: ["pigmentation", "aging"],
    readMins: 4,
    image: "/renders/sky.webp",
    accent: "gold",
    sections: [
      { heading: "The two-finger rule", body: ["Two full finger-lengths of product for face and neck. Most people apply a third of that, which turns SPF 50 into something closer to SPF 15."] },
      { heading: "Why tinted helps", body: ["Iron oxides in tinted and CC formulas add visible-light protection, which matters for dark spots and melasma. A CC cream also evens tone enough to skip foundation."], products: ["bellmona-cc-cream-sunscreen-50ml"] },
      { heading: "Reapplying over makeup", body: ["Press, do not rub. A second thin layer at lunch over a CC cream blends without disturbing it."], tip: "Sunscreen is the last step in the morning and the first thing to double-check before a procedure." },
    ],
    faqIds: ["sensitive"],
  },
  {
    slug: "choosing-a-skin-booster",
    title: "Choosing a skin booster",
    deck: "Exosomes, PDRN, collagen and polynucleotides: a plain-language map for professionals.",
    audience: "clinics",
    concerns: ["aging", "dryness"],
    readMins: 6,
    image: "/renders/crystal.webp",
    accent: "periwinkle",
    sections: [
      { heading: "Four families", body: ["Exosome boosters for signalling and recovery. PDRN and polynucleotides for repair and hydration. Collagen stimulators for firmness over months. Vitamin complexes for overall skin health."], products: ["2xsome-skin-booster", "plenaris-exosome-hgf", "tesoro-collagen", "multivita-korean-multivitamin-3-vials"] },
      { heading: "Match the booster to the goal", body: ["Post-procedure calm: exosomes. Dehydrated, crepey skin: PDRN. Laxity: collagen over a course. Dull, tired skin: a vitamin complex."], products: ["plenaris-pro-80"] },
      { heading: "Ordering for a clinic list", body: ["Order by 3pm Mountain Time and it ships the same day in a cold mailer. Pro accounts get volume pricing and a dedicated line."], tip: "Keep a verification habit: every carton has a lot code you can check on this site." },
    ],
    faqIds: ["pro-account", "verify", "cold-chain"],
  },
];

export function guideBySlug(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export function guidesForProduct(handle: string) {
  return guides.filter((g) => g.sections.some((s) => s.products?.includes(handle)));
}

export function guidesForConcern(concern?: Concern) {
  if (!concern) return guides.slice(0, 3);
  const hits = guides.filter((g) => g.concerns.includes(concern));
  return hits.length ? hits : guides.slice(0, 3);
}
