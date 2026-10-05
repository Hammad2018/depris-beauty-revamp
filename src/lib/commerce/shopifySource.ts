import type { CommerceSource, Collection, GetProductsOptions, Product, Concern, Ingredient, RoutineStep } from "./types";

/**
 * Shopify Storefront API source. Active when SHOPIFY_STORE_DOMAIN and
 * SHOPIFY_STOREFRONT_ACCESS_TOKEN are set. Concern / ingredient / routine-step
 * live in product metafields (namespace "depris") or tags.
 */

const API_VERSION = "2024-07";

interface ShopifyConfig {
  domain: string;
  token: string;
}

async function storefront<T>(cfg: ShopifyConfig, query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(`https://${cfg.domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": cfg.token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Shopify Storefront error ${res.status}`);
  const json = (await res.json()) as { data: T; errors?: unknown };
  if (json.errors) throw new Error(`Shopify Storefront GraphQL error: ${JSON.stringify(json.errors)}`);
  return json.data;
}

const PRODUCT_FRAGMENT = /* GraphQL */ `
  fragment Prod on Product {
    id
    handle
    title
    vendor
    description
    productType
    tags
    featuredImage { url altText }
    images(first: 6) { nodes { url altText } }
    priceRange { minVariantPrice { amount currencyCode } }
    compareAtPriceRange { minVariantPrice { amount } }
    variants(first: 20) { nodes { id title availableForSale price { amount } compareAtPrice { amount } } }
    concern: metafield(namespace: "depris", key: "concern") { value }
    ingredient: metafield(namespace: "depris", key: "ingredient") { value }
    routineStep: metafield(namespace: "depris", key: "routine_step") { value }
    howToUse: metafield(namespace: "depris", key: "how_to_use") { value }
  }
`;

type Raw = Record<string, any>;

function list(value?: string): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
    /* comma-separated fallback */
  }
  return value.split(",").map((s) => s.trim()).filter(Boolean);
}

function mapProduct(n: Raw): Product {
  const price = Number(n.priceRange?.minVariantPrice?.amount ?? 0);
  const compareAt = Number(n.compareAtPriceRange?.minVariantPrice?.amount ?? 0);
  return {
    id: n.id,
    handle: n.handle,
    title: n.title,
    brand: n.vendor || "Depris Beauty",
    category: (n.productType || "").toLowerCase().replace(/\s+/g, "-") || "serums",
    tagline: n.tags?.find((t: string) => t.startsWith("tagline:"))?.replace("tagline:", "") || "",
    description: n.description || "",
    price,
    compareAtPrice: compareAt > price ? compareAt : undefined,
    currency: n.priceRange?.minVariantPrice?.currencyCode || "USD",
    tone: "blush",
    images: (n.images?.nodes ?? []).map((i: Raw) => ({ url: i.url, alt: i.altText || n.title })),
    variants: (n.variants?.nodes ?? []).map((v: Raw) => ({
      id: v.id,
      title: v.title,
      price: Number(v.price?.amount ?? price),
      compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice.amount) : undefined,
      available: !!v.availableForSale,
    })),
    concerns: list(n.concern?.value) as Concern[],
    ingredients: list(n.ingredient?.value) as Ingredient[],
    heroIngredients: [],
    routineStep: ((n.routineStep?.value as RoutineStep) || "treat"),
    skinTypes: [],
    howToUse: n.howToUse?.value || "",
    rating: 4.8,
    reviewCount: 0,
    bestseller: n.tags?.includes("bestseller"),
    isNew: n.tags?.includes("new"),
  };
}

export function createShopifySource(cfg: ShopifyConfig): CommerceSource {
  return {
    async getProducts(opts: GetProductsOptions = {}) {
      if (opts.collection) {
        const data = await storefront<Raw>(cfg, `${PRODUCT_FRAGMENT}
          query($handle: String!, $n: Int!) {
            collection(handle: $handle) { products(first: $n) { nodes { ...Prod } } }
          }`, { handle: opts.collection, n: opts.limit ?? 48 });
        return (data.collection?.products?.nodes ?? []).map(mapProduct);
      }
      const data = await storefront<Raw>(cfg, `${PRODUCT_FRAGMENT}
        query($n: Int!) { products(first: $n) { nodes { ...Prod } } }`, { n: opts.limit ?? 48 });
      return (data.products?.nodes ?? []).map(mapProduct);
    },
    async getProduct(handle: string) {
      const data = await storefront<Raw>(cfg, `${PRODUCT_FRAGMENT}
        query($handle: String!) { product(handle: $handle) { ...Prod } }`, { handle });
      return data.product ? mapProduct(data.product) : null;
    },
    async getCollections() {
      const data = await storefront<Raw>(cfg, `query { collections(first: 48) { nodes { handle title description } } }`);
      return (data.collections?.nodes ?? []).map((c: Raw) => ({
        handle: c.handle,
        title: c.title,
        description: c.description || "",
      })) as Collection[];
    },
    async getCollection(handle: string) {
      const data = await storefront<Raw>(cfg, `query($handle: String!) {
        collection(handle: $handle) { handle title description }
      }`, { handle });
      return data.collection
        ? { handle: data.collection.handle, title: data.collection.title, description: data.collection.description || "" }
        : null;
    },
    async search(query: string) {
      const data = await storefront<Raw>(cfg, `${PRODUCT_FRAGMENT}
        query($q: String!) { products(first: 24, query: $q) { nodes { ...Prod } } }`, { q: query });
      return (data.products?.nodes ?? []).map(mapProduct);
    },
  };
}
