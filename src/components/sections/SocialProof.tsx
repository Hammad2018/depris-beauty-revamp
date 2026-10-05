import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { pressLogos } from "@/lib/content";

const testimonials = [
  { quote: "My skin has never looked so bouncy. The copper peptide serum is a staple now.", author: "Mina K.", meta: "Combination · Firmness" },
  { quote: "Finally found authentic K-beauty that ships fast. The quiz nailed my routine.", author: "Sofia R.", meta: "Dry · Dullness" },
  { quote: "The exosome booster after microneedling is unreal. Visible glow in days.", author: "Dr. Lena P.", meta: "Normal · Glow" },
];

export function SocialProof() {
  return (
    <section className="py-16">
      <div className="border-y border-sand bg-porcelain/60 py-6">
        <Marquee className="mask-fade-x">
          {pressLogos.map((logo) => (
            <span key={logo} className="font-display text-lg tracking-[0.2em] text-ink-soft/60">
              {logo}
            </span>
          ))}
        </Marquee>
      </div>

      <div className="shell mt-14">
        <SectionHeading eyebrow="Loved by real skin" title="Reviews from the community" align="center" />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.author} className="flex h-full flex-col rounded-3xl bg-porcelain p-6 shadow-soft">
              <StarRating rating={5} showValue={false} />
              <blockquote className="mt-3 flex-1 text-ink">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-medium text-ink">{t.author}</span>
                <span className="block text-ink-soft">{t.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
