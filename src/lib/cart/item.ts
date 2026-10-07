import type { Product, Variant } from "@/lib/commerce/types";
import type { CartItem } from "./CartContext";
import type { NavProduct } from "@/lib/nav";

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
    image: product.images[0]?.url,
  };
}

/** Quick-add from the lightweight nav/cart index (default variant). */
export function quickAddItem(p: NavProduct): Omit<CartItem, "quantity"> {
  return {
    id: `${p.handle}::default`,
    productHandle: p.handle,
    title: p.title,
    brand: p.brand,
    variantId: "default",
    variantTitle: "One size",
    price: p.price,
    subscribe: false,
    tone: "sand",
    image: p.image,
  };
}
