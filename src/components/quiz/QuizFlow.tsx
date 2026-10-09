"use client";

import { useState } from "react";
import type { Product, Concern, SkinType } from "@/lib/commerce/types";
import { recommendRoutine, CONCERN_OPTIONS, SKIN_TYPE_OPTIONS } from "@/lib/quiz/logic";
import { RoutineResult } from "./RoutineResult";
import { rememberQuiz } from "@/lib/personal";

export function QuizFlow({ products }: { products: Product[] }) {
  const [step, setStep] = useState(0);
  const [skinType, setSkinType] = useState<SkinType | undefined>();
  const [concerns, setConcerns] = useState<Concern[]>([]);

  const totalSteps = 2;

  if (step >= totalSteps) {
    const routine = recommendRoutine(products, { skinType, concerns });
    return <RoutineResult routine={routine} onRestart={() => setStep(0)} />;
  }

  return (
    <section className="shell max-w-2xl py-16">
      <p className="mono-label text-camellia">Skin quiz · step {step + 1} of {totalSteps}</p>
      <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Build my ritual</h1>
      <p className="mt-3 text-ink-soft">Two questions. Sixty seconds. A routine built for your skin, remembered on this device.</p>
      <div className="mb-8 mt-8 flex items-center gap-2" aria-hidden>
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-camellia" : "bg-sand"}`} />
        ))}
      </div>

      {step === 0 && (
        <fieldset>
          <legend className="font-display text-3xl text-ink">What&apos;s your skin type?</legend>
          <p className="mt-2 text-ink-soft">This helps us pick formulas that feel right on your skin.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {SKIN_TYPE_OPTIONS.map((o) => (
              <button
                key={o.value}
                onClick={() => setSkinType(o.value)}
                aria-pressed={skinType === o.value}
                className={`rounded-2xl border p-4 text-left transition ${
                  skinType === o.value ? "border-camellia bg-camellia/10" : "border-sand hover:border-bronze/60"
                }`}
              >
                <span className="font-medium text-ink">{o.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button className="btn-primary" onClick={() => setStep(1)} disabled={!skinType}>
              Continue
            </button>
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset>
          <legend className="font-display text-3xl text-ink">What are your main concerns?</legend>
          <p className="mt-2 text-ink-soft">Pick up to three. We&apos;ll prioritize these in your routine.</p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CONCERN_OPTIONS.map((o) => {
              const active = concerns.includes(o.value);
              return (
                <button
                  key={o.value}
                  onClick={() =>
                    setConcerns((c) => (active ? c.filter((x) => x !== o.value) : c.length < 3 ? [...c, o.value] : c))
                  }
                  aria-pressed={active}
                  className={`rounded-2xl border p-4 text-left transition ${
                    active ? "border-camellia bg-camellia/10" : "border-sand hover:border-bronze/60"
                  }`}
                >
                  <span className="font-medium text-ink">{o.label}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-8 flex justify-between">
            <button className="btn-ghost" onClick={() => setStep(0)}>
              Back
            </button>
            <button className="btn-primary" onClick={() => { rememberQuiz(skinType, concerns); setStep(2); }}>
              See my routine
            </button>
          </div>
        </fieldset>
      )}
    </section>
  );
}
