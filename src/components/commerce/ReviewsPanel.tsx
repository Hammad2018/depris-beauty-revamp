"use client";

import { useMemo, useState } from "react";
import { PencilSimpleLine, Check } from "@phosphor-icons/react";
import type { SkinType } from "@/lib/commerce/types";
import { skinTypeLabels } from "@/lib/taxonomy";
import { summarize, type SourcedReview } from "@/lib/reviews";
import { StarRating } from "@/components/ui/StarRating";
import { VoiceCard } from "@/components/community/VoiceCard";

const SKIN: SkinType[] = ["dry", "oily", "combination", "normal", "sensitive"];

/** Reviews with a rating breakdown, skin and star filters, a write form and an honest empty state. */
export function ReviewsPanel({ reviews, productTitle }: { reviews: SourcedReview[]; productTitle: string }) {
  const [skin, setSkin] = useState<SkinType | "all">("all");
  const [stars, setStars] = useState<number | 0>(0);
  const [writing, setWriting] = useState(false);
  const [sent, setSent] = useState(false);
  const s = useMemo(() => summarize(reviews), [reviews]);
  const filtered = reviews.filter((r) => (skin === "all" || r.skinType === skin) && (!stars || Math.round(r.rating) === stars));
  const chip = (on: boolean) => `rounded-full border px-3 py-1.5 text-sm transition-colors ${on ? "border-camellia bg-camellia/10 text-ink" : "border-sand text-ink-soft hover:border-camellia/60"}`;

  return (
    <section id="reviews" className="shell border-t border-sand py-16 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">What skin like yours is saying</h2>
          {s.count > 0 ? (
            <>
              <div className="mt-4 flex items-end gap-4">
                <p className="font-display text-6xl leading-none text-ink">{s.average.toFixed(1)}</p>
                <div className="pb-1">
                  <StarRating rating={s.average} showValue={false} />
                  <p className="text-sm text-ink-soft">{s.count} review{s.count === 1 ? "" : "s"}{s.hasSample ? ", includes sample reviews" : ""}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-1.5">
                {([5, 4, 3, 2, 1] as const).map((n) => {
                  const v = s.distribution[n];
                  const pct = s.count ? Math.round((v / s.count) * 100) : 0;
                  const on = stars === n;
                  return (
                    <li key={n}>
                      <button type="button" onClick={() => setStars(on ? 0 : n)} aria-pressed={on} className="group flex w-full items-center gap-3 text-sm">
                        <span className={`w-8 text-right font-mono ${on ? "text-ink" : "text-ink-soft"}`}>{n}★</span>
                        <span className="h-2 flex-1 overflow-hidden rounded-full bg-sand">
                          <span className="block h-full origin-left rounded-full bg-camellia transition-transform duration-300 ease-out" style={{ transform: `scaleX(${pct / 100})` }} />
                        </span>
                        <span className="w-10 text-ink-soft">{pct}%</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p className="mt-4 text-ink-soft">No reviews yet for {productTitle}. Be the first, your skin type helps the next person choose.</p>
          )}
          <button type="button" onClick={() => setWriting((w) => !w)} className="btn mt-6 border border-ink/15 bg-porcelain text-ink hover:border-camellia">
            <PencilSimpleLine size={16} /> Write a review
          </button>
        </div>

        <div>
          {writing && !sent && (
            <form
              className="mb-8 r-petal-alt bg-porcelain p-6 shadow-soft"
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            >
              <p className="font-display text-xl text-ink">Your review of {productTitle}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm"><span className="text-ink-soft">Rating</span>
                  <select name="rating" required className="mt-1 w-full rounded-2xl border border-sand bg-cream px-4 py-2.5 text-ink focus:border-camellia focus:outline-none" defaultValue="5">
                    {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{"★".repeat(n)}</option>)}
                  </select>
                </label>
                <label className="block text-sm"><span className="text-ink-soft">Skin type</span>
                  <select name="skin" required className="mt-1 w-full rounded-2xl border border-sand bg-cream px-4 py-2.5 text-ink focus:border-camellia focus:outline-none" defaultValue="combination">
                    {SKIN.map((k) => <option key={k} value={k}>{skinTypeLabels[k]}</option>)}
                  </select>
                </label>
              </div>
              <label className="mt-4 block text-sm"><span className="text-ink-soft">What happened on your skin</span>
                <textarea name="body" required rows={4} className="mt-1 w-full rounded-2xl border border-sand bg-cream px-4 py-2.5 text-ink focus:border-camellia focus:outline-none" />
              </label>
              <button type="submit" className="btn-primary mt-5">Submit review</button>
            </form>
          )}
          {sent && (
            <p className="mb-8 inline-flex items-center gap-2 rounded-full bg-camellia/10 px-4 py-2 text-sm text-ink"><Check size={16} weight="bold" className="text-camellia" /> Thank you. Reviews appear after a quick check.</p>
          )}

          {s.count > 0 && (
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setSkin("all")} aria-pressed={skin === "all"} className={chip(skin === "all")}>All skin</button>
              {SKIN.filter((k) => reviews.some((r) => r.skinType === k)).map((k) => (
                <button key={k} type="button" onClick={() => setSkin(k)} aria-pressed={skin === k} className={chip(skin === k)}>{skinTypeLabels[k]}</button>
              ))}
            </div>
          )}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {filtered.map((r) => <VoiceCard key={r.id} r={r} />)}
            {s.count > 0 && filtered.length === 0 && <p className="text-ink-soft">No reviews match that filter yet.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
