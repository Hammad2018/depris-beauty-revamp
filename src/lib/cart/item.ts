import type { Product, Variant } from "@/lib/commerce/types";
import type { CartItem } from "./CartContext";

export function toLineItem(product: Product, variant: Variant, subscribe = false): Omit<CartItem, "quantity"> {
  return {
    id: `${product.handle}::${variant.id}`,
    productHandle: product.handle,
    title: product.title,
    brand: product.brand,
    variantId: variant.id,
    variantTitle: variant.title,
    price: variant.price,
    subscribe,
    tone: product.tone,
  };
}
