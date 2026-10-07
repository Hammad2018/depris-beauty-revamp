import type { HeroIngredient } from "@/lib/commerce/types";

export type DossierEntry = {
  concentration: string;
  source: string;
  weight: string;
  stability: string;
  role: string;
};

const known: Record<string, DossierEntry> = {
  "Copper Tripeptide-1 (GHK-Cu)": { concentration: "3.0%", source: "Synthetic, lab-grade", weight: "403.9 g/mol · 3 aa", stability: "Stable 12 mo sealed · 6 mo opened", role: "Signal peptide — supports collagen & firmness" },
  "Sodium Hyaluronate": { concentration: "1.2% (multi-weight)", source: "Bio-fermented", weight: "50 kDa – 1.8 MDa", stability: "Stable 24 mo", role: "Humectant — cushioning, lasting hydration" },
  "Niacinamide": { concentration: "4.0%", source: "Synthetic", weight: "122.1 g/mol", stability: "Stable 24 mo", role: "Barrier & tone — refines pores, evens" },
  "Centella Asiatica Extract": { concentration: "2.0%", source: "Botanical (Madagascar)", weight: "—", stability: "Stable 18 mo", role: "Soothing — calms redness" },
};

const fallback: DossierEntry = { concentration: "Clinically dosed", source: "Lab-verified", weight: "—", stability: "Lot-tested", role: "Active" };

/** Spec-sheet data for a hero ingredient, with graceful defaults. */
export function dossierFor(ing: HeroIngredient): DossierEntry {
  return known[ing.inci] ?? { ...fallback, role: ing.benefit };
}
