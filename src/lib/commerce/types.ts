/** Shared commerce taxonomy, powers quiz, filters, PDP cross-sell and review filtering. */

export type Concern =
  | "dryness"
  | "dullness"
  | "acne"
  | "aging"
  | "pigmentation"
  | "redness"
  | "pores";

export type Ingredient =
  | "copper-peptides"
  | "exosomes"
  | "niacinamide"
  | "retinol"
  | "vitamin-c"
  | "centella"
  | "hyaluronic-acid"
  | "aha-bha"
  | "ginseng"
  | "snail-mucin"
  | "spf";

export type RoutineStep = "cleanse" | "tone" | "treat" | "boost" | "moisturize" | "spf" | "pro";

export type SkinType = "dry" | "oily" | "combination" | "normal" | "sensitive";

export type Tone = "blush" | "bronze" | "sage" | "sand" | "ink";

export interface ProductImage {
  /** Optional real URL. When absent, UI renders an on-brand gradient placeholder. */
  url?: string;
  alt: string;
  tone?: Tone;
}

export interface Variant {
  id: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  available: boolean;
}

export interface HeroIngredient {
  name: string;
  inci: string;
  benefit: string;
}

export interface Review {
  author: string;
  rating: number;
  skinType: SkinType;
  concern?: Concern;
  title: string;
  body: string;
  verified: boolean;
  date: string;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  brand: string;
  category: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  tone: Tone;
  images: ProductImage[];
  variants: Variant[];
  concerns: Concern[];
  ingredients: Ingredient[];
  heroIngredients: HeroIngredient[];
  routineStep: RoutineStep;
  skinTypes: SkinType[];
  howToUse: string;
  clinicalClaim?: string;
  rating: number;
  reviewCount: number;
  reviews?: Review[];
  bestseller?: boolean;
  isNew?: boolean;
  subscribable?: boolean;
  pairsWith?: string[]; // handles
}

export interface Collection {
  handle: string;
  title: string;
  description: string;
  concern?: Concern;
  tone?: Tone;
}

export interface GetProductsOptions {
  collection?: string;
  limit?: number;
}

/** The single contract every data source implements (seed or live Shopify). */
export interface CommerceSource {
  getProducts(opts?: GetProductsOptions): Promise<Product[]>;
  getProduct(handle: string): Promise<Product | null>;
  getCollections(): Promise<Collection[]>;
  getCollection(handle: string): Promise<Collection | null>;
  search(query: string): Promise<Product[]>;
}
