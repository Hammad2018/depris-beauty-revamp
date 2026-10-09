import type { Product, Concern, SkinType, RoutineStep } from "../commerce/types";

export interface QuizAnswers {
  skinType?: SkinType;
  concerns: Concern[];
}

export interface RoutineItem {
  step: RoutineStep;
  product: Product;
  reason: string;
}

const ORDER: RoutineStep[] = ["cleanse", "tone", "treat", "boost", "moisturize", "spf"];
const ALWAYS: ReadonlySet<RoutineStep> = new Set<RoutineStep>(["cleanse", "treat", "moisturize", "spf"]);

const STEP_LABEL: Record<RoutineStep, string> = {
  cleanse: "Cleanse",
  tone: "Tone",
  treat: "Treat",
  boost: "Boost",
  moisturize: "Moisturize",
  spf: "Protect",
  pro: "Pro",
};

function score(p: Product, answers: QuizAnswers): { value: number; overlap: number } {
  const overlap = p.concerns.filter((c) => answers.concerns.includes(c)).length;
  const skinMatch = answers.skinType && p.skinTypes.includes(answers.skinType) ? 1 : 0;
  return { value: overlap * 2 + skinMatch + p.rating * 0.1, overlap };
}

/**
 * Build an ordered skincare routine (cleanse → protect) from the catalog.
 * Always returns the core steps; adds tone/boost when a concern match exists.
 */
export function recommendRoutine(products: Product[], answers: QuizAnswers): RoutineItem[] {
  const routine: RoutineItem[] = [];
  for (const step of ORDER) {
    const candidates = products.filter((p) => p.routineStep === step);
    if (candidates.length === 0) continue;
    let best = candidates[0];
    let bestScore = score(best, answers);
    for (const c of candidates.slice(1)) {
      const s = score(c, answers);
      if (s.value > bestScore.value) {
        best = c;
        bestScore = s;
      }
    }
    const include = ALWAYS.has(step) || bestScore.overlap > 0;
    if (!include) continue;
    const matched = best.concerns.filter((c) => answers.concerns.includes(c));
    routine.push({
      step,
      product: best,
      reason: matched.length
        ? `${STEP_LABEL[step]}, targets ${matched.join(" & ")}`
        : `${STEP_LABEL[step]}, a gentle everyday essential`,
    });
  }
  return routine;
}

export const CONCERN_OPTIONS: { value: Concern; label: string }[] = [
  { value: "dryness", label: "Dryness & dehydration" },
  { value: "dullness", label: "Dullness & uneven glow" },
  { value: "aging", label: "Fine lines & firmness" },
  { value: "acne", label: "Breakouts & congestion" },
  { value: "pigmentation", label: "Dark spots & tone" },
  { value: "redness", label: "Redness & sensitivity" },
  { value: "pores", label: "Enlarged pores & oil" },
];

export const SKIN_TYPE_OPTIONS: { value: SkinType; label: string }[] = [
  { value: "dry", label: "Dry" },
  { value: "oily", label: "Oily" },
  { value: "combination", label: "Combination" },
  { value: "normal", label: "Normal" },
  { value: "sensitive", label: "Sensitive" },
];
