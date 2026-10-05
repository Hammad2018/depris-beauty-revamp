import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { StarRating } from "@/components/ui/StarRating";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="glow-backdrop absolute inset-0 -z-10" />
      <div className="shell grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <Eyebrow className="text-camellia">Advanced Korean skincare · Stocked in the US</Eyebrow>
          <h1 className="mt-4 text-5xl leading-[1.02] text-ink sm:text-6xl">
            Glass-skin,
            <br />
            <span className="italic text-camellia">backed by science.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
            Copper peptides, exosomes and skin boosters — the advanced actives behind real results, made approachable.
            Fully stocked in Wyoming for same-day shipping.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="/quiz" variant="primary">
              Take the skin quiz
            </ButtonLink>
            <ButtonLink href="/collections/bestsellers" variant="ghost">
              Shop bestsellers
            </ButtonLink>
          </div>
          <div className="mt-6 flex items-center gap-3 text-sm text-ink-soft">
            <StarRating rating={4.8} showValue={false} />
            <span>Loved by 12,000+ skintellectuals</span>
          </div>
        </Reveal>

        <Reveal className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#F7D9D4] via-[#F2E4CF] to-[#E6EEE2]" />
            <div className="absolute left-6 top-8 w-40 rotate-[-6deg] rounded-3xl bg-porcelain p-4 shadow-lift">
              <div className="h-32 rounded-2xl bg-gradient-to-br from-[#E7CFA8] to-[#FBF5ED]" />
              <p className="mt-3 font-display text-sm text-ink">GHK-Cu Copper Peptide Serum</p>
              <p className="text-xs text-ink-soft">The signature active</p>
            </div>
            <div className="absolute bottom-10 right-6 w-40 rotate-[5deg] rounded-3xl bg-porcelain p-4 shadow-lift">
              <div className="h-32 rounded-2xl bg-gradient-to-br from-[#CBDAC9] to-[#FBF5ED]" />
              <p className="mt-3 font-display text-sm text-ink">2XSOME Skin Booster</p>
              <p className="text-xs text-ink-soft">Exosome glow</p>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-ink/90 px-5 py-3 text-center text-porcelain shadow-glow">
              <p className="font-display text-2xl">92%</p>
              <p className="text-[11px] uppercase tracking-wide">firmer-looking skin*</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
