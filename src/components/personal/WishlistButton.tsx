"use client";

import { Heart } from "@phosphor-icons/react";
import { toggleWishlist, usePersonal } from "@/lib/personal";

export function WishlistButton({ handle, className = "" }: { handle: string; className?: string }) {
  const p = usePersonal();
  const saved = p?.wishlist.includes(handle) ?? false;
  return (
    <button
      type="button"
      onClick={() => toggleWishlist(handle)}
      aria-pressed={saved}
      aria-label={saved ? "Remove from your shelf" : "Save to your shelf"}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-porcelain text-ink transition-colors hover:border-camellia ${className}`}
    >
      <Heart size={20} weight={saved ? "fill" : "regular"} className={saved ? "text-rose" : ""} />
    </button>
  );
}
