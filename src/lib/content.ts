import type { ShipTier } from "./cart/totals";

export const site = {
  name: "Depris Beauty",
  tagline: "Turning back the clock, one drop at a time.",
  description:
    "Advanced Korean skincare — copper peptides, exosomes and skin boosters — stocked in the US for immediate shipping. Clinical results, approachable luxury.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://deprisbeauty.com",
  email: "info@deprisbeauty.com",
  phone: "(508) 630-6625",
  address: "1910 Thomes Avenue, Cheyenne, WY 82001",
  instagram: "https://instagram.com/deprisbeauty",
};

export const announcements = [
  "Free US shipping over $50 — ships same-day from Wyoming",
  "New: 2XSOME exosome skin boosters are here",
  "Authorized retailer · Sourced from Korea · Cruelty-free",
];

export const shipTiers: ShipTier[] = [
  { threshold: 50, label: "Free US shipping", type: "shipping" },
  { threshold: 120, label: "Free deluxe gift", type: "gift" },
];

export const navLinks = [
  { label: "Shop All", href: "/shop" },
  { label: "Shop by Concern", href: "/shop?view=concern" },
  { label: "The Science", href: "/science" },
  { label: "Bundles", href: "/bundles" },
  { label: "Skin Quiz", href: "/quiz" },
];

export const shopMenu: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "By Concern",
    links: [
      { label: "Glow & Radiance", href: "/collections/concern-dullness" },
      { label: "Firm & Renew", href: "/collections/concern-aging" },
      { label: "Clear & Calm", href: "/collections/concern-acne" },
      { label: "Hydrate & Plump", href: "/collections/concern-dryness" },
      { label: "Even & Bright", href: "/collections/concern-pigmentation" },
      { label: "Soothe & Strengthen", href: "/collections/concern-redness" },
    ],
  },
  {
    title: "By Category",
    links: [
      { label: "Cosmetic Peptides", href: "/collections/cosmetic-peps" },
      { label: "Serums & Ampoules", href: "/collections/serums" },
      { label: "Cleansers & Toners", href: "/collections/cleansers-toners" },
      { label: "Sunscreen & BB/CC", href: "/collections/sunscreen-bb-cc-cream" },
      { label: "Sheet Masks", href: "/collections/sheetmasks" },
      { label: "Face Cream & Peels", href: "/collections/creams-peels" },
    ],
  },
  {
    title: "Advanced",
    links: [
      { label: "Mesotherapy & Skin Boosters", href: "/collections/mesotherapy-skin-boosters" },
      { label: "Microneedling", href: "/collections/microneedling" },
      { label: "Hair & Exosomes", href: "/collections/hair-exosomes" },
      { label: "Vitamins & Wellness", href: "/collections/vitamins-wellness" },
      { label: "Bestsellers", href: "/collections/bestsellers" },
      { label: "Promos", href: "/collections/promos" },
    ],
  },
];

export const trustPoints = [
  { title: "Sourced from Korea", body: "Authentic, authorized-retailer formulas — never grey-market." },
  { title: "Stocked in the US", body: "Fully stocked in Wyoming for same-day, no-long-wait shipping." },
  { title: "Cruelty-free", body: "Korea banned cosmetic animal testing — our lines are cruelty-free." },
  { title: "Results you can read", body: "Clinically-backed actives with real, measurable claims." },
];

export const pressLogos = ["ALLURE", "VOGUE", "COSMOPOLITAN", "REFINERY29", "BYRDIE", "ELLE"];

export const scienceIngredients = [
  {
    name: "Copper Peptides (GHK-Cu / AHK-Cu)",
    tone: "bronze" as const,
    body: "Our signature. Copper tripeptides support collagen, firmness and renewal — the advanced active most brands can't formulate well.",
  },
  {
    name: "Exosomes",
    tone: "sage" as const,
    body: "Next-generation cell-signaling boosters for radiance, elasticity and recovery after procedures like microneedling.",
  },
  {
    name: "Skin Boosters & Mesotherapy",
    tone: "sage" as const,
    body: "Pro-grade hydration and elasticity treatments that bring clinic results into your routine.",
  },
  {
    name: "Niacinamide & Centella",
    tone: "blush" as const,
    body: "The everyday workhorses — brighten, refine pores and calm the barrier for balanced, healthy skin.",
  },
];

export const samples = [
  { id: "sample-ghk", title: "GHK-Cu Serum deluxe sample" },
  { id: "sample-glow", title: "Glass-Skin Moisturizer sample" },
  { id: "sample-cc", title: "CC Cream Sunscreen sachet" },
  { id: "sample-snail", title: "Snail Repair Essence sample" },
];

export const footerGroups = [
  {
    title: "Shop",
    links: [
      { label: "Shop All", href: "/shop" },
      { label: "Bestsellers", href: "/collections/bestsellers" },
      { label: "Bundles", href: "/bundles" },
      { label: "Promos", href: "/collections/promos" },
      { label: "Gift Cards", href: "/shop" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Skin Quiz", href: "/quiz" },
      { label: "The Science", href: "/science" },
      { label: "Brands", href: "/brands" },
      { label: "Journal", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Shipping", href: "/about#shipping" },
      { label: "Returns & Refunds", href: "/about#returns" },
    ],
  },
];

export const blogPosts = [
  {
    slug: "copper-peptides-explained",
    title: "Copper peptides, explained: why GHK-Cu is the active to know",
    excerpt: "The science behind our signature ingredient — and how to add it to your routine.",
    tone: "bronze" as const,
    date: "2026-09-18",
    readMins: 6,
  },
  {
    slug: "build-your-k-beauty-routine",
    title: "How to build a K-beauty routine that actually fits your skin",
    excerpt: "Cleanse to SPF — a simple framework for choosing the right steps.",
    tone: "blush" as const,
    date: "2026-09-02",
    readMins: 8,
  },
  {
    slug: "exosomes-after-microneedling",
    title: "Exosomes after microneedling: the recovery glow-up",
    excerpt: "Why pairing a skin booster with your device makes all the difference.",
    tone: "sage" as const,
    date: "2026-08-20",
    readMins: 5,
  },
];
