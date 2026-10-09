import { StarRating } from "@/components/ui/StarRating";
import type { SourcedReview } from "@/lib/reviews";

/** A customer voice. Real ones link back to the live store; samples carry a visible tag. */
export function VoiceCard({ r, tone = "light" }: { r: SourcedReview; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const inner = (
    <>
      <div className="flex items-center justify-between gap-3">
        <StarRating rating={r.rating} showValue={false} />
        {r.sample ? (
          <span className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${dark ? "bg-white/10 text-white/70" : "bg-ink/5 text-ink-soft"}`}>Sample</span>
        ) : (
          <span className={`font-mono text-[10px] uppercase tracking-wide ${dark ? "text-teal-glow" : "text-sage"}`}>Verified · deprisbeauty.com</span>
        )}
      </div>
      <blockquote className={`mt-3 font-display text-lg leading-snug ${dark ? "text-white" : "text-ink"}`}>“{r.body.length > 180 ? r.body.slice(0, 177).trimEnd() + "…" : r.body}”</blockquote>
      <figcaption className={`mt-4 text-sm ${dark ? "text-white/65" : "text-ink-soft"}`}>
        <span className={`font-medium ${dark ? "text-white/90" : "text-ink"}`}>{r.author}</span> on {r.product.title}
      </figcaption>
    </>
  );
  const cls = `block h-full r-petal-alt p-6 shadow-soft ${dark ? "glass-dark" : "bg-porcelain"}`;
  return r.product.external && !r.sample ? (
    <a href={r.product.external} target="_blank" rel="noopener noreferrer" className={`${cls} transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lift`}>
      <figure>{inner}</figure>
    </a>
  ) : (
    <figure className={cls}>{inner}</figure>
  );
}
