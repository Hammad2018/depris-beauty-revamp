import type { Ingredient } from "@/lib/commerce/types";
import { guidesForProduct } from "@/lib/guides";
import { faqsForProduct } from "@/lib/faq";
import { rituals } from "@/lib/community";

/** Everywhere on the site that mentions a product: guides, FAQ answers, member rituals. */
export function featuredIn(handle: string) {
  return {
    guides: guidesForProduct(handle),
    faqs: faqsForProduct(handle),
    rituals: rituals.filter((r) => r.products.includes(handle)),
  };
}

/** Anchor on the Science page for an ingredient chip. */
export const ingredientAnchor: Partial<Record<Ingredient, string>> = {
  "copper-peptides": "copper-peptides",
  exosomes: "exosomes",
  niacinamide: "niacinamide-centella",
  centella: "niacinamide-centella",
  "hyaluronic-acid": "skin-boosters",
};
