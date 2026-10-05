import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

const steps = [
  { n: "01", label: "Cleanse", note: "Start fresh" },
  { n: "02", label: "Treat", note: "Target concerns" },
  { n: "03", label: "Boost", note: "Supercharge" },
  { n: "04", label: "Protect", note: "Lock it in" },
];

export function RoutineStrip() {
  return (
    <section className="shell py-16">
      <div className="rounded-[2.5rem] bg-gradient-to-br from-[#FBECE6] via-cream to-[#E6EEE2] p-8 sm:p-12">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-md">
            <Eyebrow className="text-camellia">No guesswork</Eyebrow>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink">Build your routine in four steps</h2>
            <p className="mt-3 text-ink-soft">
              Take the 60-second skin quiz and we&apos;ll build a routine tailored to your skin — add it to your bag in one tap.
            </p>
            <div className="mt-6">
              <ButtonLink href="/quiz" variant="primary">
                Start the quiz
              </ButtonLink>
            </div>
          </div>
          <ol className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:w-[28rem]">
            {steps.map((s) => (
              <li key={s.n} className="rounded-2xl bg-porcelain/70 p-4">
                <p className="font-display text-2xl text-bronze">{s.n}</p>
                <p className="mt-1 font-medium text-ink">{s.label}</p>
                <p className="text-xs text-ink-soft">{s.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
