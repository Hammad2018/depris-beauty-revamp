import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { Guide } from "@/lib/guides";
import { concernLabels } from "@/lib/taxonomy";

const accentBg: Record<Guide["accent"], string> = {
  jade: "bg-teal-glow/20 text-bronze-deep",
  periwinkle: "bg-periwinkle-soft/25 text-indigo",
  blush: "bg-blush/35 text-[#8c3f36]",
  lilac: "bg-lilac/60 text-indigo",
  gold: "bg-gold/25 text-[#7a5a12]",
};

const audienceLabel = (g: Guide) => (g.audience === "clinics" ? "For clinics" : g.audience === "beginners" ? "Start here" : "Everyone");

/**
 * Guide tile. `layout="lead"`: tall photo with the title card overlapping its lower edge.
 * `layout="row"`: photo left, words right. `layout="stack"`: photo above words.
 */
export function GuideCard({ guide, layout = "stack" }: { guide: Guide; layout?: "lead" | "row" | "stack" }) {
  const tag = (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${accentBg[guide.accent]}`}>{audienceLabel(guide)}</span>
      <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">{guide.readMins} min</span>
    </div>
  );
  const read = (
    <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-camellia">
      Read the guide <ArrowRight size={14} className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
    </p>
  );
  const concerns = <p className="mt-2 text-xs text-ink-soft">{guide.concerns.map((c) => concernLabels[c]).join(" · ")}</p>;

  if (layout === "lead") {
    return (
      <Link href={`/guides/${guide.slug}`} className="group relative block cursor-pointer">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-sand shadow-lift sm:mr-16">
          <Image src={guide.image} alt="" fill sizes="(max-width: 1024px) 90vw, 46vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        </div>
        <div className="relative -mt-20 ml-6 mr-0 rounded-[1.5rem] bg-porcelain p-6 shadow-lift sm:absolute sm:bottom-10 sm:right-0 sm:mt-0 sm:w-[60%] sm:p-7">
          {tag}
          <h3 className="mt-3 font-display text-3xl leading-tight text-ink transition-colors group-hover:text-camellia">{guide.title}</h3>
          <p className="mt-2 text-ink-soft">{guide.deck}</p>
          {read}
        </div>
      </Link>
    );
  }

  if (layout === "row") {
    return (
      <Link href={`/guides/${guide.slug}`} className="group grid cursor-pointer grid-cols-[7.5rem_1fr] items-center gap-5 sm:grid-cols-[10rem_1fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-sand shadow-soft">
          <Image src={guide.image} alt="" fill sizes="160px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
        </div>
        <div className="min-w-0">
          {tag}
          <h3 className="mt-2 font-display text-2xl leading-snug text-ink transition-colors group-hover:text-camellia">{guide.title}</h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-ink-soft">{guide.deck}</p>
          {read}
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/guides/${guide.slug}`} className="group block cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-sand shadow-soft">
        <Image src={guide.image} alt="" fill sizes="(max-width: 1024px) 90vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
      </div>
      <div className="mt-5">{tag}</div>
      <h3 className="mt-2 font-display text-2xl leading-tight text-ink transition-colors group-hover:text-camellia">{guide.title}</h3>
      <p className="mt-2 max-w-md text-ink-soft">{guide.deck}</p>
      {read}
      {concerns}
    </Link>
  );
}
