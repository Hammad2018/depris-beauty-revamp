"use client";

import { useMemo, useState } from "react";
import type { Review, SkinType } from "@/lib/commerce/types";
import { skinTypeLabels } from "@/lib/taxonomy";
import { StarRating } from "@/components/ui/StarRating";

export function ReviewsPanel({ reviews, rating, reviewCount }: { reviews: Review[]; rating: number; reviewCount: number }) {
  const [skinFilter, setSkinFilter] = useState<SkinType | "all">("all");

  const skinTypesPresent = useMemo(
    () => Array.from(new Set(reviews.map((r) => r.skinType))),
    [reviews],
  );
  const filtered = skinFilter === "all" ? reviews : reviews.filter((r) => r.skinType === skinFilter);

  return (
    <section className="shell border-t border-sand py-14">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-display text-2xl text-ink">What skin like yours is saying</h2>
          <div className="mt-2">
            <StarRating rating={rating} count={reviewCount} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSkinFilter("all")}
            aria-pressed={skinFilter === "all"}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              skinFilter === "all" ? "border-camellia bg-camellia/10" : "border-sand text-ink-soft"
            }`}
          >
            All skin
          </button>
          {skinTypesPresent.map((st) => (
            <button
              key={st}
              onClick={() => setSkinFilter(st)}
              aria-pressed={skinFilter === st}
              className={`rounded-full border px-3 py-1.5 text-sm ${
                skinFilter === st ? "border-camellia bg-camellia/10" : "border-sand text-ink-soft"
              }`}
            >
              {skinTypeLabels[st]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {filtered.map((r, i) => (
          <figure key={i} className="rounded-3xl bg-porcelain p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <StarRating rating={r.rating} showValue={false} />
              {r.verified && <span className="text-xs font-medium text-sage">✓ Verified buyer</span>}
            </div>
            <figcaption className="mt-3 font-medium text-ink">{r.title}</figcaption>
            <blockquote className="mt-1 text-sm text-ink-soft">“{r.body}”</blockquote>
            <p className="mt-3 text-xs text-ink-soft/80">
              {r.author} · {skinTypeLabels[r.skinType]} skin
            </p>
          </figure>
        ))}
        {filtered.length === 0 && <p className="text-ink-soft">No reviews for this skin type yet.</p>}
      </div>
    </section>
  );
}
