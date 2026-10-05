import type { Concern, Ingredient, RoutineStep, SkinType } from "./commerce/types";

export const concernLabels: Record<Concern, string> = {
  dryness: "Dryness",
  dullness: "Dullness",
  aging: "Fine lines",
  acne: "Breakouts",
  pigmentation: "Dark spots",
  redness: "Redness",
  pores: "Pores & oil",
};

export const ingredientLabels: Record<Ingredient, string> = {
  "copper-peptides": "Copper peptides",
  exosomes: "Exosomes",
  niacinamide: "Niacinamide",
  retinol: "Retinol",
  "vitamin-c": "Vitamin C",
  centella: "Centella / Cica",
  "hyaluronic-acid": "Hyaluronic acid",
  "aha-bha": "AHA / BHA",
  ginseng: "Ginseng",
  "snail-mucin": "Snail mucin",
  spf: "SPF",
};

export const routineLabels: Record<RoutineStep, string> = {
  cleanse: "Cleanse",
  tone: "Tone",
  treat: "Treat",
  boost: "Boost",
  moisturize: "Moisturize",
  spf: "SPF",
  pro: "Pro / Devices",
};

export const skinTypeLabels: Record<SkinType, string> = {
  dry: "Dry",
  oily: "Oily",
  combination: "Combination",
  normal: "Normal",
  sensitive: "Sensitive",
};
