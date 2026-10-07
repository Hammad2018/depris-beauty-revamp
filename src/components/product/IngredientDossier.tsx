import type { HeroIngredient } from "@/lib/commerce/types";
import { dossierFor } from "@/lib/dossier";

/** Spec-sheet accordion per hero active: INCI, %, source, weight, stability. */
export function IngredientDossier({ ingredients }: { ingredients: HeroIngredient[] }) {
  if (!ingredients.length) return null;
  return (
    <div>
      <p className="mono-label text-camellia">Ingredient dossier</p>
      <ul className="mt-3 divide-y divide-ink/10 rounded-3xl border border-ink/10 bg-porcelain/70">
        {ingredients.map((ing, i) => {
          const d = dossierFor(ing);
          return (
            <li key={ing.name}>
              <details className="group" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 marker:content-['']">
                  <span>
                    <span className="font-display text-lg text-ink">{ing.name}</span>
                    <span className="ml-3 rounded-full bg-camellia/10 px-2 py-0.5 font-mono text-[11px] text-camellia">{d.concentration}</span>
                  </span>
                  <span className="text-ink-soft transition-transform group-open:rotate-45">+</span>
                </summary>
                <dl className="grid gap-x-6 gap-y-2 px-5 pb-5 text-sm sm:grid-cols-2">
                  {[["INCI", ing.inci], ["Role", d.role], ["Source", d.source], ["Mol. weight", d.weight], ["Stability", d.stability]].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 border-b border-ink/5 pb-1.5">
                      <dt className="mono-label mono-label-plain text-ink-soft">{k}</dt>
                      <dd className="text-right text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
