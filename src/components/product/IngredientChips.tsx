import Link from "next/link";
import type { Ingredient } from "@/lib/commerce/types";
import { ingredientLabels } from "@/lib/taxonomy";
import { ingredientAnchor } from "@/lib/connections";
import { Petal } from "@/components/petals/Petal";

/** Ingredient chips that link into the Science page section for that active. */
export function IngredientChips({ ingredients, tone = "dark" }: { ingredients: Ingredient[]; tone?: "dark" | "light" }) {
  if (ingredients.length === 0) return null;
  const dark = tone === "dark";
  return (
    <ul className="flex flex-wrap gap-2">
      {ingredients.map((ing) => {
        const anchor = ingredientAnchor[ing];
        const cls = `inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${dark ? "border-white/25 text-white/85 hover:border-teal-glow hover:text-white" : "border-sand text-ink-soft hover:border-camellia hover:text-ink"}`;
        const inner = <><Petal tone="jade" size={10} opacity={0.95} />{ingredientLabels[ing]}</>;
        return (
          <li key={ing}>
            {anchor ? <Link href={`/science#${anchor}`} className={cls}>{inner}</Link> : <span className={cls}>{inner}</span>}
          </li>
        );
      })}
    </ul>
  );
}
