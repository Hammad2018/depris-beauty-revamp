/**
 * Pitch-stage product renders. Keyed by product handle; products without an entry
 * fall back to the on-brand gradient media. Swap for real photography via Shopify media.
 */
export type RenderView = { id: string; src: string; label: string; alt: string };

export const productRenders: Record<string, { hero: string; views: RenderView[] }> = {
  "ghk-cu-copper-peptide-serum": {
    hero: "/renders/bottle-front.webp",
    views: [
      { id: "front", src: "/renders/bottle-front.webp", label: "The bottle", alt: "GHK-Cu Copper Peptide Serum — frosted dropper bottle" },
      { id: "dropper", src: "/renders/dropper-out.webp", label: "One drop", alt: "Dropper lifted with a single teal drop" },
      { id: "still", src: "/renders/still-life.webp", label: "Morning after", alt: "Serum bottle beside a lotus on silk" },
      { id: "texture", src: "/renders/swirl.webp", label: "Texture", alt: "Macro of the serum's silky texture" },
    ],
  },
};

/** Lot data shown on certificates and the verify page (seeded for the pitch). */
export const lots: Record<string, { lot: string; product: string; handle: string; bottled: string; expires: string; assay: string; ph: string; notes: string }> = {
  "2611-D": { lot: "2611-D", product: "GHK-Cu Copper Peptide Serum", handle: "ghk-cu-copper-peptide-serum", bottled: "2026-09-12", expires: "2027-09-12", assay: "GHK-Cu 3.02% (target 3.0%)", ph: "5.5", notes: "Stability pass at 25 °C / 40 °C, 90 days. Fragrance-free." },
  "2607-B": { lot: "2607-B", product: "2XSOME Skin Booster", handle: "2xsome-skin-booster", bottled: "2026-08-30", expires: "2027-02-28", assay: "Exosome count 1.1 × 10¹⁰ / mL", ph: "6.8", notes: "Cold-chain required (2–8 °C). Lyophilised, reconstitute before use." },
  "2598-A": { lot: "2598-A", product: "Low-pH Gentle Gel Cleanser", handle: "gentle-gel-cleanser", bottled: "2026-08-02", expires: "2028-08-02", assay: "Surfactant blend within spec", ph: "5.2", notes: "Preservative efficacy test pass." },
};
