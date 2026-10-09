import type { CommerceSource, Collection, Concern, HeroIngredient, Ingredient, Product, RoutineStep, SkinType, Tone } from "./types";
import { createSeedSource } from "./seedSource";
import { collections as seedCollections } from "./seed/collections";
import snapshot from "./seed/woo-catalog.json";
import { reviewsFor, summarize } from "@/lib/reviews";

/** Shape written by scripts/import-woo.mjs (WooCommerce Store API snapshot). */
export interface WooProduct {
  id: number;
  slug: string;
  sku: string;
  name: string;
  permalink: string;
  price: number | null;
  regularPrice: number | null;
  salePrice: number | null;
  onSale: boolean;
  currency: string;
  inStock: boolean;
  averageRating: number;
  reviewCount: number;
  categories: { slug: string; name: string }[];
  /** Category this product represents in the curated pitch set (from the importer). */
  pitchCategory?: string | null;
  tags: string[];
  images: { src: string; alt: string }[];
  shortDescription: string;
  description: string;
  attributes: { name: string; terms: string[] }[];
  variations: { id: number; title: string; price: number | null; regularPrice: number | null; inStock: boolean }[];
}

export interface WooSnapshot {
  importedAt: string;
  source: string;
  categories: { slug: string; name: string; count: number }[];
  products: WooProduct[];
}

const CATEGORY_RANK = [
  "gift-cards", "cosmetic-peps", "serums", "mesotherapy-skin-boosters", "microneedling", "filler-lipolytics",
  "hair-exosomes", "sunscreen-bb-cc-cream", "cleansers-toners", "creams-peels", "sheetmasks", "eyes-lips",
  "vitamins-wellness", "devices-supplies", "promos",
];

const TONE: Record<string, Tone> = {
  "cosmetic-peps": "bronze", serums: "blush", "mesotherapy-skin-boosters": "sage", microneedling: "ink",
  "filler-lipolytics": "ink", "hair-exosomes": "sage", "sunscreen-bb-cc-cream": "bronze", "cleansers-toners": "sage",
  "creams-peels": "blush", sheetmasks: "sand", "eyes-lips": "blush", "vitamins-wellness": "bronze",
  "devices-supplies": "ink", promos: "blush", "gift-cards": "sand",
};

const STEP: Record<string, RoutineStep> = {
  "cosmetic-peps": "treat", serums: "treat", "mesotherapy-skin-boosters": "pro", microneedling: "pro",
  "filler-lipolytics": "pro", "hair-exosomes": "pro", "sunscreen-bb-cc-cream": "spf", "cleansers-toners": "tone",
  "creams-peels": "moisturize", sheetmasks: "boost", "eyes-lips": "boost", "vitamins-wellness": "pro",
  "devices-supplies": "pro", promos: "treat", "gift-cards": "pro",
};

const BRANDS = ["Glutanex", "Bellmona", "Plenaris", "Tesoro", "Puri", "Medisco", "MULTIVITA", "Stayve", "Curenex", "Soonsu", "Merikit", "Lilyfield", "Synerfill", "Laennec", "Mayster"];

const CONCERN_RULES: [RegExp, Concern][] = [
  [/wrinkle|fine line|firm|collagen|elastic|aging|anti-aging|lift|plump/i, "aging"],
  [/bright|glow|whiten|radian|dull|luminous/i, "dullness"],
  [/dark spot|pigment|melasma|even(?:s|ing)? (?:skin )?tone|discolou?r/i, "pigmentation"],
  [/hydrat|moistur|dry|dehydrat/i, "dryness"],
  [/calm|sooth|redness|sensitive|cica|irritat|repair/i, "redness"],
  [/acne|blemish|breakout/i, "acne"],
  [/pore|sebum|oil control/i, "pores"],
];

const INGREDIENT_RULES: [RegExp, Ingredient, HeroIngredient][] = [
  [/ghk-?cu|ahk-?cu|copper (?:tri)?peptide/i, "copper-peptides", { name: "Copper peptides", inci: "Copper Tripeptide-1 (GHK-Cu)", benefit: "Supports collagen & firmness" }],
  [/exosome/i, "exosomes", { name: "Exosomes", inci: "Stem-cell-derived exosomes", benefit: "Cell-signalling regeneration" }],
  [/niacinamide/i, "niacinamide", { name: "Niacinamide", inci: "Niacinamide", benefit: "Brightens, refines pores" }],
  [/retinol|retinal/i, "retinol", { name: "Retinol", inci: "Retinol", benefit: "Renews texture overnight" }],
  [/vitamin c|ascorb/i, "vitamin-c", { name: "Vitamin C", inci: "Ascorbic Acid", benefit: "Antioxidant brightening" }],
  [/centella|cica|madecass/i, "centella", { name: "Centella", inci: "Centella Asiatica Extract", benefit: "Calms and repairs" }],
  [/hyaluron|\bha\b/i, "hyaluronic-acid", { name: "Hyaluronic acid", inci: "Sodium Hyaluronate", benefit: "Deep, lasting hydration" }],
  [/glycolic|salicylic|\baha\b|\bbha\b|exfoliat/i, "aha-bha", { name: "AHA / BHA", inci: "Glycolic / Salicylic Acid", benefit: "Gentle resurfacing" }],
  [/ginseng/i, "ginseng", { name: "Ginseng", inci: "Panax Ginseng Root Extract", benefit: "Energises tired skin" }],
  [/snail/i, "snail-mucin", { name: "Snail mucin", inci: "Snail Secretion Filtrate", benefit: "Repairs and hydrates" }],
  [/\bspf\b|sunscreen|sun ?block|\buv\b/i, "spf", { name: "Broad-spectrum SPF", inci: "Zinc Oxide / Titanium Dioxide", benefit: "Daily UV protection" }],
];

const EXTRA_HERO: [RegExp, HeroIngredient][] = [
  [/glutathione/i, { name: "Glutathione", inci: "Glutathione", benefit: "Master antioxidant, brightening" }],
  [/pdrn|polynucleotide/i, { name: "PDRN", inci: "Sodium DNA (PDRN)", benefit: "Repair & regeneration" }],
  [/peptide/i, { name: "Peptide complex", inci: "Peptide complex", benefit: "Signals skin renewal" }],
];

const BESTSELLERS = new Set(["ghk-cu-topical-cosmetic-1g", "2xsome-skin-booster", "glutanex-night-serum-30ml", "bellmona-cc-cream-sunscreen-50ml"]);
const PAIRS: Record<string, string[]> = {
  "ghk-cu-topical-cosmetic-1g": ["glutanex-glow-therapy-toner", "glutanex-snow-white-cream-50ml", "bellmona-cc-cream-sunscreen-50ml"],
  "glutanex-night-serum-30ml": ["ghk-cu-topical-cosmetic-1g", "glutanex-snow-white-cream-50ml"],
  "2xsome-skin-booster": ["plenaris-pro-80", "ghk-cu-topical-cosmetic-1g"],
  "bellmona-cc-cream-sunscreen-50ml": ["glutanex-glow-therapy-toner", "ghk-cu-topical-cosmetic-1g"],
};

const PRO_CATEGORIES = new Set(["mesotherapy-skin-boosters", "microneedling", "filler-lipolytics", "vitamins-wellness", "devices-supplies"]);

function firstSentence(text: string, fallback: string): string {
  const clean = text.replace(/[\u{1F300}-\u{1FAFF}☀-➿]/gu, "").replace(/\s+/g, " ").trim();
  const m = clean.match(/^(.{20,180}?[.!?])(\s|$)/);
  return (m ? m[1] : clean.slice(0, 160)) || fallback;
}

export function primaryCategory(p: WooProduct): string {
  if (p.pitchCategory) return p.pitchCategory;
  const slugs = p.categories.map((c) => c.slug);
  return CATEGORY_RANK.find((s) => slugs.includes(s)) ?? slugs[0] ?? "serums";
}

/** Map a WooCommerce product onto the storefront's Product contract, inferring taxonomy from copy. */
export function mapWooProduct(p: WooProduct): Product {
  const category = primaryCategory(p);
  const text = `${p.name} ${p.shortDescription} ${p.description}`;
  const concerns = Array.from(new Set(CONCERN_RULES.filter(([re]) => re.test(text)).map(([, c]) => c)));
  const ingredients = Array.from(new Set(INGREDIENT_RULES.filter(([re]) => re.test(text)).map(([, i]) => i)));
  const heroIngredients: HeroIngredient[] = [
    ...INGREDIENT_RULES.filter(([re]) => re.test(text)).map(([, , h]) => h),
    ...EXTRA_HERO.filter(([re]) => re.test(text)).map(([, h]) => h),
  ]
    .filter((h, i, arr) => arr.findIndex((x) => x.name === h.name) === i)
    .slice(0, 3);

  const brandWord = p.name.split(/\s+/)[0].replace(/[^A-Za-z]/g, "");
  const brand = BRANDS.find((b) => b.toLowerCase() === brandWord.toLowerCase()) ?? (category === "cosmetic-peps" ? "Depris Lab" : "Depris Beauty");
  const price = p.price ?? p.regularPrice ?? 0;
  const compareAt = p.onSale && p.regularPrice && p.regularPrice > price ? p.regularPrice : undefined;
  const variants = p.variations.length
    ? p.variations.map((v) => ({ id: String(v.id), title: v.title, price: v.price ?? price, compareAtPrice: v.regularPrice && v.price && v.regularPrice > v.price ? v.regularPrice : undefined, available: v.inStock }))
    : [{ id: `${p.id}-default`, title: "One size", price, compareAtPrice: compareAt, available: p.inStock }];
  const skinTypes: SkinType[] = /sensitive/i.test(text) ? ["dry", "normal", "combination", "sensitive"] : ["dry", "oily", "normal", "combination"];
  const howTo = p.description.match(/(?:how to use|directions|usage|application)[:\s-]*([^\n]{20,300})/i)?.[1];

  return {
    id: String(p.id),
    handle: p.slug,
    title: p.name,
    brand,
    category,
    tagline: firstSentence(p.shortDescription || p.description, p.name),
    description: p.description || p.shortDescription,
    price,
    compareAtPrice: compareAt,
    currency: p.currency,
    tone: TONE[category] ?? "sand",
    images: p.images.length ? p.images.map((i) => ({ url: i.src, alt: i.alt || p.name })) : [{ alt: p.name, tone: TONE[category] ?? "sand" }],
    variants,
    concerns,
    ingredients,
    heroIngredients,
    routineStep: /cleanser|cleansing|foam/i.test(p.name) ? "cleanse" : STEP[category] ?? "treat",
    skinTypes,
    howToUse: howTo ?? (PRO_CATEGORIES.has(category) ? "For professional or trained use. Follow the enclosed protocol and your practitioner's guidance." : "Apply to clean skin as directed on the pack, AM and/or PM."),
    rating: p.averageRating || summarize(reviewsFor(p.slug)).average,
    reviewCount: p.reviewCount || summarize(reviewsFor(p.slug)).count,
    bestseller: BESTSELLERS.has(p.slug),
    subscribable: !PRO_CATEGORIES.has(category) && category !== "gift-cards",
    pairsWith: PAIRS[p.slug],
    reviews: [],
  };
}

export function wooCollections(snap: WooSnapshot): Collection[] {
  const concernLed = seedCollections.filter((c) => c.concern);
  const real = snap.categories.map((c) => ({
    handle: c.slug,
    title: c.name.replace("BB\\CC", "BB/CC"),
    description: CATEGORY_BLURB[c.slug] ?? `${c.count} products`,
    tone: TONE[c.slug] ?? "sand",
  }));
  return [...concernLed, ...real];
}

const CATEGORY_BLURB: Record<string, string> = {
  "cosmetic-peps": "Copper peptides and advanced actives, the Depris signature.",
  serums: "Concentrated treatments for every concern.",
  "cleansers-toners": "Gentle, balancing first steps.",
  sheetmasks: "Ten-minute rituals for an instant glow.",
  "sunscreen-bb-cc-cream": "Daily protection with a luminous finish.",
  "creams-peels": "Moisturizers and resurfacing treatments.",
  "eyes-lips": "Targeted care for delicate areas.",
  "mesotherapy-skin-boosters": "Clinic-grade boosters for next-level results.",
  microneedling: "Devices and solutions for professional resurfacing.",
  "filler-lipolytics": "Professional dermal fillers and lipolytic solutions.",
  "hair-exosomes": "Scalp and hair treatments powered by exosomes.",
  "vitamins-wellness": "Beauty from within.",
  "devices-supplies": "Tools and supplies for the ritual.",
  promos: "Limited-time offers and bundles.",
  "gift-cards": "Give the gift of glow.",
};

/** Commerce source backed by the WooCommerce snapshot of deprisbeauty.com. */
export function createWooSource(snap: WooSnapshot = snapshot as WooSnapshot): CommerceSource {
  return createSeedSource(snap.products.map(mapWooProduct), wooCollections(snap));
}
