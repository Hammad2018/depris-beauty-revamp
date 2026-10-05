import type { CommerceSource, Collection, GetProductsOptions, Product } from "./types";
import { catalog } from "./seed/catalog";
import { collections as seedCollections } from "./seed/collections";

/** In-memory data source backed by the seed catalog. Always available. */
export function createSeedSource(
  products: Product[] = catalog,
  collections: Collection[] = seedCollections,
): CommerceSource {
  function inCollection(p: Product, handle: string): boolean {
    if (p.category === handle) return true;
    const col = collections.find((c) => c.handle === handle);
    if (col?.concern) return p.concerns.includes(col.concern);
    if (handle === "promos") return !!p.compareAtPrice;
    if (handle === "bestsellers") return !!p.bestseller;
    if (handle === "new") return !!p.isNew;
    return false;
  }

  return {
    async getProducts(opts: GetProductsOptions = {}) {
      let result = products;
      if (opts.collection) result = result.filter((p) => inCollection(p, opts.collection!));
      if (opts.limit) result = result.slice(0, opts.limit);
      return result;
    },
    async getProduct(handle: string) {
      return products.find((p) => p.handle === handle) ?? null;
    },
    async getCollections() {
      return collections;
    },
    async getCollection(handle: string) {
      return collections.find((c) => c.handle === handle) ?? null;
    },
    async search(query: string) {
      const q = query.trim().toLowerCase();
      if (!q) return [];
      return products.filter((p) =>
        [p.title, p.brand, p.tagline, p.description, ...p.ingredients, ...p.concerns]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    },
  };
}
