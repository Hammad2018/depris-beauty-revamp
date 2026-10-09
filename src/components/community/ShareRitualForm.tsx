"use client";

import { useState } from "react";
import { Check } from "@phosphor-icons/react";

/** "Share your ritual" form. Front-end only: confirms and keeps a local copy until a backend exists. */
export function ShareRitualForm({ productTitles }: { productTitles: { handle: string; title: string }[] }) {
  const [sent, setSent] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  if (sent) {
    return (
      <div className="r-petal-alt bg-porcelain p-8 text-center shadow-soft">
        <p className="inline-flex items-center gap-2 font-display text-2xl text-ink"><Check size={20} weight="bold" className="text-camellia" /> Thank you.</p>
        <p className="mt-2 text-ink-soft">We read every ritual. If yours is featured, you will hear from us first.</p>
      </div>
    );
  }
  return (
    <form
      className="r-petal-alt bg-porcelain p-6 shadow-soft sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget).entries());
        try { window.localStorage.setItem("depris:ritual-draft", JSON.stringify({ ...data, products: picked })); } catch {}
        setSent(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-ink-soft">First name</span>
          <input name="name" required className="mt-1 w-full rounded-2xl border border-sand bg-cream px-4 py-2.5 text-ink focus:border-camellia focus:outline-none" />
        </label>
        <label className="block text-sm">
          <span className="text-ink-soft">City</span>
          <input name="city" className="mt-1 w-full rounded-2xl border border-sand bg-cream px-4 py-2.5 text-ink focus:border-camellia focus:outline-none" />
        </label>
      </div>
      <label className="mt-4 block text-sm">
        <span className="text-ink-soft">Your ritual, in a few lines</span>
        <textarea name="ritual" required rows={4} className="mt-1 w-full rounded-2xl border border-sand bg-cream px-4 py-2.5 text-ink focus:border-camellia focus:outline-none" placeholder="Toner, then…" />
      </label>
      <p className="mt-4 text-sm text-ink-soft">Which products are in it?</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {productTitles.map((p) => {
          const on = picked.includes(p.handle);
          return (
            <button key={p.handle} type="button" aria-pressed={on} onClick={() => setPicked(on ? picked.filter((h) => h !== p.handle) : [...picked, p.handle])}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${on ? "border-camellia bg-camellia/10 text-ink" : "border-sand text-ink-soft hover:border-camellia/60"}`}>
              {p.title}
            </button>
          );
        })}
      </div>
      <button type="submit" className="btn-primary mt-6">Share my ritual</button>
      <p className="mt-2 text-xs text-ink-soft/70">By sharing you agree we may feature it, first name and city only.</p>
    </form>
  );
}
