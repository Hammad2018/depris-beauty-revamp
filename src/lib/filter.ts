import type { Product, Concern, Ingredient, SkinType, RoutineStep } from "./commerce/types";

export interface Facets {
  concerns?: Concern[];
  ingredients?: Ingredient[];
  skinTypes?: SkinType[];
  routineSteps?: RoutineStep[];
  priceMax?: number;
}

export type SortKey = "featured" | "bestselling" | "rating" | "price-asc" | "price-desc" | "newest";

function anyOverlap<T>(a: readonly T[], b: readonly T[]): boolean {
  return a.some((x) => b.includes(x));
}

/** AND across facet groups, OR within a group. */
export function filterProducts(products: Product[], facets: Facets): Product[] {
  return products.filter((p) => {
    if (facets.concerns?.length && !anyOverlap(facets.concerns, p.concerns)) return false;
    if (facets.ingredients?.length && !anyOverlap(facets.ingredients, p.ingredients)) return false;
    if (facets.skinTypes?.length && !anyOverlap(facets.skinTypes, p.skinTypes)) return false;
    if (facets.routineSteps?.length && !facets.routineSteps.includes(p.routineStep)) return false;
    if (typeof facets.priceMax === "number" && p.price > facets.priceMax) return false;
    return true;
  });
}

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const copy = [...products];
  switch (sort) {
    case "bestselling":
      return copy.sort((a, b) => Number(b.bestseller) - Number(a.bestseller) || b.reviewCount - a.reviewCount);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "newest":
      return copy.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    default:
      return copy;
  }
}
