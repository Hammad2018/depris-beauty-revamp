import type { Collection } from "../types";

/** Real Depris Beauty categories + concern-led collections. */
export const collections: Collection[] = [
  // Concern-led (discovery)
  { handle: "concern-dullness", title: "Glow & Radiance", description: "Brighten, even tone and revive tired skin.", concern: "dullness", tone: "bronze" },
  { handle: "concern-aging", title: "Firm & Renew", description: "Peptides and actives that smooth fine lines and restore bounce.", concern: "aging", tone: "blush" },
  { handle: "concern-acne", title: "Clear & Calm", description: "Target blemishes and congestion without stripping the barrier.", concern: "acne", tone: "sage" },
  { handle: "concern-redness", title: "Soothe & Strengthen", description: "Barrier-first care for sensitive, reactive skin.", concern: "redness", tone: "sand" },
  { handle: "concern-pigmentation", title: "Even & Bright", description: "Fade dark spots and post-blemish marks.", concern: "pigmentation", tone: "bronze" },
  { handle: "concern-dryness", title: "Hydrate & Plump", description: "Deep, lasting moisture for a dewy, glass-skin finish.", concern: "dryness", tone: "blush" },

  // Category (real)
  { handle: "cosmetic-peps", title: "Cosmetic Peptides", description: "Copper peptides and advanced actives, the Depris signature.", tone: "bronze" },
  { handle: "serums", title: "Serums & Ampoules", description: "Concentrated treatments for every concern.", tone: "blush" },
  { handle: "cleansers-toners", title: "Cleansers & Toners", description: "Gentle, balancing first steps.", tone: "sage" },
  { handle: "sheet-masks", title: "Sheet Masks", description: "Ten-minute rituals for an instant glow.", tone: "sand" },
  { handle: "sunscreen-bb-cc", title: "Sunscreen & BB/CC", description: "Daily protection with a luminous finish.", tone: "bronze" },
  { handle: "face-cream-peels", title: "Face Cream & Peels", description: "Moisturizers and resurfacing treatments.", tone: "blush" },
  { handle: "eyes-lips", title: "Eyes & Lips", description: "Targeted care for delicate areas.", tone: "blush" },
  { handle: "skin-boosters", title: "Mesotherapy & Skin Boosters", description: "Pro-grade boosters for next-level results.", tone: "sage" },
  { handle: "microneedling", title: "Microneedling", description: "Devices and supplies for at-home resurfacing.", tone: "ink" },
  { handle: "hair-exosomes", title: "Hair & Exosomes", description: "Scalp and hair treatments powered by exosomes.", tone: "sage" },
  { handle: "vitamins-wellness", title: "Vitamins & Wellness", description: "Beauty from within.", tone: "bronze" },
  { handle: "promos", title: "Promos", description: "Limited-time offers and bundles.", tone: "blush" },
];
