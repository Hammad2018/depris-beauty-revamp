import type { HeroIngredient } from "@/lib/commerce/types";

export type DossierEntry = {
  concentration: string;
  source: string;
  weight: string;
  stability: string;
  role: string;
};

const known: Record<string, DossierEntry> = {
  "Copper Tripeptide-1 (GHK-Cu)": { concentration: "1 g, high purity", source: "Synthetic, lab-grade", weight: "403.9 g/mol · 3 aa", stability: "Keep sealed, cool and dry", role: "Signal peptide, supports collagen & firmness" },
  "Sodium Hyaluronate": { concentration: "Per listing", source: "Bio-fermented", weight: "50 kDa – 1.8 MDa", stability: "Stable 24 mo", role: "Humectant, cushioning, lasting hydration" },
  "Niacinamide": { concentration: "Per listing", source: "Synthetic", weight: "122.1 g/mol", stability: "Stable 24 mo", role: "Barrier & tone, refines pores, evens" },
  "Centella Asiatica Extract": { concentration: "Per listing", source: "Botanical (Madagascar)", weight: "n/a", stability: "Stable 18 mo", role: "Soothing, calms redness" },
};

const fallback: DossierEntry = { concentration: "Clinically dosed", source: "Lab-verified", weight: "n/a", stability: "Lot-tested", role: "Active" };

/** Spec-sheet data for a hero ingredient, with graceful defaults. */
export function dossierFor(ing: HeroIngredient): DossierEntry {
  return known[ing.inci] ?? { ...fallback, role: ing.benefit };
}
