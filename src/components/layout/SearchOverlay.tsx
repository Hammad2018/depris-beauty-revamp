"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { money } from "@/lib/format";
import { searchIndex, type NavProduct } from "@/lib/nav";

const quick = [
  { label: "Copper peptides", href: "/collections/cosmetic-peps" },
  { label: "Skin boosters", href: "/collections/mesotherapy-skin-boosters" },
  { label: "Glutanex", href: "/shop?q=glutanex" },
  { label: "Sunscreen", href: "/collections/sunscreen-bb-cc-cream" },
  { label: "Take the skin quiz", href: "/quiz" },
];

/** Command-palette search over the real catalog. ⌘K / Ctrl+K opens it. */
export function SearchOverlay({ open, onClose, index }: { open: boolean; onClose: () => void; index: NavProduct[] }) {
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = useMemo(() => searchIndex(index, q, 6), [index, q]);

  useEffect(() => {
    if (!open) return;
    setQ(""); setCursor(0);
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { clearTimeout(t); document.body.style.overflow = prev; };
  }, [open]);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(results.length - 1, c + 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(0, c - 1)); }
    if (e.key === "Enter") {
      e.preventDefault();
      const r = results[cursor];
      router.push(r ? `/products/${r.handle}` : `/shop?q=${encodeURIComponent(q)}`);
      onClose();
    }
    if (e.key === "Escape") onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        /* ⌘K is keyboard-initiated and used constantly: it opens and closes instantly, no animation. */
        <div
          role="dialog" aria-modal="true" aria-label="Search"
          className="fixed inset-0 z-[90] flex items-start justify-center bg-navy-deep/70 px-4 pt-[12vh] backdrop-blur-md"
          onClick={onClose}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/60 bg-cream shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-ink/10 px-5 py-4">
              <span aria-hidden className="text-ink-soft">⌕</span>
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => { setQ(e.target.value); setCursor(0); }}
                onKeyDown={onKey}
                placeholder="Search products, actives, brands…"
                className="flex-1 bg-transparent text-lg text-ink outline-none placeholder:text-ink-soft/60"
                aria-label="Search products"
              />
              <kbd className="mono-label mono-label-plain rounded-md border border-ink/15 px-1.5 py-0.5 text-ink-soft">esc</kbd>
            </div>

            {q && results.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-ink-soft">Nothing for “{q}”. Try an active like <button className="underline" onClick={() => setQ("peptide")}>peptide</button>.</p>
            )}

            {results.length > 0 && (
              <ul className="max-h-[52vh] overflow-auto py-2">
                {results.map((r, i) => (
                  <li key={r.handle}>
                    <Link
                      href={`/products/${r.handle}`}
                      onClick={onClose}
                      onMouseEnter={() => setCursor(i)}
                      className={`flex items-center gap-4 px-5 py-3 transition ${i === cursor ? "bg-sand/60" : "hover:bg-sand/40"}`}
                    >
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-sand">
                        {r.image && <Image src={r.image} alt="" fill sizes="56px" className="object-cover" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="mono-label mono-label-plain block text-camellia">{r.brand} · {r.category.replace(/-/g, " ")}</span>
                        <span className="block truncate font-medium text-ink">{r.title}</span>
                      </span>
                      <span className="font-display text-lg text-ink">{money(r.price, r.currency)}</span>
                    </Link>
                  </li>
                ))}
                <li className="px-5 pt-2">
                  <Link href={`/shop?q=${encodeURIComponent(q)}`} onClick={onClose} className="text-sm text-camellia underline-offset-4 hover:underline">See all results for “{q}” →</Link>
                </li>
              </ul>
            )}

            {!q && (
              <div className="px-5 py-5">
                <p className="mono-label text-camellia">Popular</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {quick.map((l) => (
                    <Link key={l.href} href={l.href} onClick={onClose} className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink hover:border-camellia hover:text-camellia">{l.label}</Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
