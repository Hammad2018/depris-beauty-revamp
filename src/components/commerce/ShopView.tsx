"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Product, Concern, Ingredient } from "@/lib/commerce/types";
import { filterProducts, sortProducts, type Facets, type SortKey } from "@/lib/filter";
import { concernLabels, ingredientLabels } from "@/lib/taxonomy";
import { PRO_CATEGORIES } from "@/lib/nav";
import { X } from "@phosphor-icons/react";
import { ProductGrid } from "./ProductGrid";

const concernKeys = Object.keys(concernLabels) as Concern[];
const ingredientKeys = Object.keys(ingredientLabels) as Ingredient[];

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

export type ShopCategory = { handle: string; title: string };

/**
 * Shop grid with real-category chips (skincare / professional), concern + ingredient
 * lenses, price cap, sort and free-text search. `q`, `category` and `view` sync with the URL.
 */
export function ShopView({ products, categories = [], lockedCategory }: { products: Product[]; categories?: ShopCategory[]; lockedCategory?: string }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [cats, setCats] = useState<string[]>(params.get("category") ? [params.get("category") as string] : []);
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [priceMax, setPriceMax] = useState<number | undefined>(undefined);
  const [sort, setSort] = useState<SortKey>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const concernFirst = params.get("view") === "concern";

  // keep q + category shareable in the URL without a navigation
  useEffect(() => {
    const sp = new URLSearchParams(params.toString());
    if (query) sp.set("q", query); else sp.delete("q");
    if (cats.length === 1) sp.set("category", cats[0]); else sp.delete("category");
    const next = sp.toString();
    if (next !== params.toString()) router.replace(`${pathname}${next ? `?${next}` : ""}`, { scroll: false });
  }, [query, cats, params, pathname, router]);

  const visible = useMemo(() => {
    const facets: Facets = { concerns, ingredients, priceMax, categories: lockedCategory ? undefined : cats, query };
    return sortProducts(filterProducts(products, facets), sort);
  }, [products, concerns, ingredients, priceMax, cats, query, sort, lockedCategory]);

  const activeCount = concerns.length + ingredients.length + (priceMax ? 1 : 0) + cats.length + (query ? 1 : 0);
  const consumer = categories.filter((c) => !PRO_CATEGORIES.includes(c.handle));
  const pro = categories.filter((c) => PRO_CATEGORIES.includes(c.handle));

  const chip = (on: boolean) =>
    `rounded-full border px-3 py-1.5 text-sm transition ${on ? "border-camellia bg-camellia/10 text-ink" : "border-sand text-ink-soft hover:border-bronze/60"}`;

  const CategoryFacets = !lockedCategory && categories.length > 0 && (
    <>
      <div>
        <p className="eyebrow mb-3">Skincare</p>
        <div className="flex flex-wrap gap-2">
          {consumer.map((c) => (
            <button key={c.handle} onClick={() => setCats((v) => toggle(v, c.handle))} aria-pressed={cats.includes(c.handle)} className={chip(cats.includes(c.handle))}>{c.title}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="eyebrow mb-3 text-indigo">Professional</p>
        <div className="flex flex-wrap gap-2">
          {pro.map((c) => (
            <button key={c.handle} onClick={() => setCats((v) => toggle(v, c.handle))} aria-pressed={cats.includes(c.handle)} className={chip(cats.includes(c.handle))}>{c.title}</button>
          ))}
        </div>
      </div>
    </>
  );

  const ConcernFacet = (
    <FacetGroup title="Concern" keys={concernKeys} labels={concernLabels} selected={concerns} onToggle={(v) => setConcerns((c) => toggle(c, v))} />
  );

  const Filters = (
    <div className="space-y-7">
      <label className="block">
        <span className="eyebrow mb-2 block">Search</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Peptide, Glutanex, SPF…"
          className="w-full rounded-full border border-sand bg-porcelain px-4 py-2 text-sm text-ink outline-none focus:border-camellia"
          aria-label="Search products"
        />
      </label>
      {concernFirst ? (<>{ConcernFacet}{CategoryFacets}</>) : (<>{CategoryFacets}{ConcernFacet}</>)}
      <FacetGroup title="Ingredient" keys={ingredientKeys} labels={ingredientLabels} selected={ingredients} onToggle={(v) => setIngredients((c) => toggle(c, v))} />
      <div>
        <p className="eyebrow mb-3">Max price</p>
        <div className="flex flex-wrap gap-2">
          {[20, 40, 75, undefined].map((p) => (
            <button key={String(p)} onClick={() => setPriceMax(p)} className={chip(priceMax === p)}>{p ? `Under $${p}` : "Any"}</button>
          ))}
        </div>
      </div>
      {activeCount > 0 && (
        <button onClick={() => { setConcerns([]); setIngredients([]); setPriceMax(undefined); setCats([]); setQuery(""); }} className="text-sm font-medium text-camellia underline">
          Clear all ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="shell grid gap-10 py-12 lg:grid-cols-[17rem_1fr]">
      <h2 className="sr-only">Products</h2>
      <aside className="hidden lg:block">
        <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-auto pr-2">{Filters}</div>
      </aside>

      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-soft">
            {visible.length} {visible.length === 1 ? "product" : "products"}{query ? <> for <span className="font-medium text-ink">“{query}”</span></> : null}
          </p>
          <div className="flex items-center gap-3">
            <button className="rounded-full border border-sand px-4 py-2 text-sm lg:hidden" onClick={() => setMobileFiltersOpen(true)}>
              Filters{activeCount > 0 ? ` (${activeCount})` : ""}
            </button>
            <label className="sr-only" htmlFor="sort">Sort</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="rounded-full border border-sand bg-porcelain px-4 py-2 text-sm text-ink focus:border-camellia focus:outline-none">
              <option value="featured">Featured</option>
              <option value="bestselling">Bestselling</option>
              <option value="rating">Top rated</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {(cats.length > 0 || query) && (
          <div className="mb-5 flex flex-wrap gap-2">
            {query && <button onClick={() => setQuery("")} className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1 text-xs text-porcelain">“{query}” <X size={10} /></button>}
            {cats.map((c) => (
              <button key={c} onClick={() => setCats((v) => toggle(v, c))} className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1 text-xs text-porcelain">{categories.find((x) => x.handle === c)?.title ?? c} <X size={10} /></button>
            ))}
          </div>
        )}

        {visible.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-ink/15 p-10 text-center">
            <p className="font-display text-2xl text-ink">Nothing matches yet.</p>
            <p className="mt-2 text-sm text-ink-soft">Try fewer filters, or search an active like “peptide” or a brand like “Glutanex”.</p>
          </div>
        ) : (
          <ProductGrid products={visible} />
        )}
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button className="absolute inset-0 bg-ink/30" aria-label="Close filters" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-cream p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close"><X size={18} /></button>
            </div>
            {Filters}
            <button className="btn-primary mt-6 w-full" onClick={() => setMobileFiltersOpen(false)}>Show {visible.length} products</button>
          </div>
        </div>
      )}
    </div>
  );
}

function FacetGroup<T extends string>({ title, keys, labels, selected, onToggle }: { title: string; keys: T[]; labels: Record<T, string>; selected: T[]; onToggle: (v: T) => void }) {
  return (
    <div>
      <p className="eyebrow mb-3">{title}</p>
      <div className="flex flex-wrap gap-2">
        {keys.map((k) => (
          <button key={k} onClick={() => onToggle(k)} aria-pressed={selected.includes(k)} className={`rounded-full border px-3 py-1.5 text-sm transition ${selected.includes(k) ? "border-camellia bg-camellia/10 text-ink" : "border-sand text-ink-soft hover:border-bronze/60"}`}>
            {labels[k]}
          </button>
        ))}
      </div>
    </div>
  );
}
