"use client";

import { useMemo, useState } from "react";
import type { Product, Concern, Ingredient } from "@/lib/commerce/types";
import { filterProducts, sortProducts, type Facets, type SortKey } from "@/lib/filter";
import { concernLabels, ingredientLabels } from "@/lib/taxonomy";
import { ProductGrid } from "./ProductGrid";

const concernKeys = Object.keys(concernLabels) as Concern[];
const ingredientKeys = Object.keys(ingredientLabels) as Ingredient[];

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

export function ShopView({ products }: { products: Product[] }) {
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [priceMax, setPriceMax] = useState<number | undefined>(undefined);
  const [sort, setSort] = useState<SortKey>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const visible = useMemo(() => {
    const facets: Facets = { concerns, ingredients, priceMax };
    return sortProducts(filterProducts(products, facets), sort);
  }, [products, concerns, ingredients, priceMax, sort]);

  const activeCount = concerns.length + ingredients.length + (priceMax ? 1 : 0);

  const Filters = (
    <div className="space-y-7">
      <FacetGroup
        title="Concern"
        keys={concernKeys}
        labels={concernLabels}
        selected={concerns}
        onToggle={(v) => setConcerns((c) => toggle(c, v))}
      />
      <FacetGroup
        title="Ingredient"
        keys={ingredientKeys}
        labels={ingredientLabels}
        selected={ingredients}
        onToggle={(v) => setIngredients((c) => toggle(c, v))}
      />
      <div>
        <p className="eyebrow mb-3">Max price</p>
        <div className="flex flex-wrap gap-2">
          {[20, 40, 75, undefined].map((p) => (
            <button
              key={String(p)}
              onClick={() => setPriceMax(p)}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                priceMax === p ? "border-camellia bg-camellia/10 text-ink" : "border-sand text-ink-soft hover:border-bronze/60"
              }`}
            >
              {p ? `Under $${p}` : "Any"}
            </button>
          ))}
        </div>
      </div>
      {activeCount > 0 && (
        <button
          onClick={() => {
            setConcerns([]);
            setIngredients([]);
            setPriceMax(undefined);
          }}
          className="text-sm font-medium text-camellia underline"
        >
          Clear all ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="shell grid gap-10 py-12 lg:grid-cols-[16rem_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-28">{Filters}</div>
      </aside>

      <div>
        <div className="mb-6 flex items-center justify-between gap-3">
          <p className="text-sm text-ink-soft">{visible.length} products</p>
          <div className="flex items-center gap-3">
            <button
              className="rounded-full border border-sand px-4 py-2 text-sm lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              Filters{activeCount > 0 ? ` (${activeCount})` : ""}
            </button>
            <label className="sr-only" htmlFor="sort">
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-sand bg-porcelain px-4 py-2 text-sm text-ink focus:border-camellia focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="bestselling">Bestselling</option>
              <option value="rating">Top rated</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        <ProductGrid products={visible} />
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button className="absolute inset-0 bg-ink/30" aria-label="Close filters" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-cream p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close">
                ✕
              </button>
            </div>
            {Filters}
            <button className="btn-primary mt-6 w-full" onClick={() => setMobileFiltersOpen(false)}>
              Show {visible.length} products
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FacetGroup<T extends string>({
  title,
  keys,
  labels,
  selected,
  onToggle,
}: {
  title: string;
  keys: T[];
  labels: Record<T, string>;
  selected: T[];
  onToggle: (v: T) => void;
}) {
  return (
    <div>
      <p className="eyebrow mb-3">{title}</p>
      <div className="flex flex-wrap gap-2">
        {keys.map((k) => (
          <button
            key={k}
            onClick={() => onToggle(k)}
            aria-pressed={selected.includes(k)}
            className={`rounded-full border px-3 py-1.5 text-sm transition ${
              selected.includes(k) ? "border-camellia bg-camellia/10 text-ink" : "border-sand text-ink-soft hover:border-bronze/60"
            }`}
          >
            {labels[k]}
          </button>
        ))}
      </div>
    </div>
  );
}
