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

/** Guide tile: petal-cut image, audience tag, concerns. `shape` varies the silhouette per slot. */
export function GuideCard({ guide, shape = "petal", size = "md" }: { guide: Guide; shape?: "petal" | "leaf" | "lotus"; size?: "md" | "lg" }) {
  const mask = shape === "leaf" ? "leaf-mask" : shape === "lotus" ? "lotus-mask" : "petal-mask";
  return (
    <Link href={`/guides/${guide.slug}`} className="group block">
      <div className={`relative overflow-hidden ${mask} ${size === "lg" ? "aspect-[4/5]" : "aspect-square"} bg-sand`}>
        <Image src={guide.image} alt="" fill sizes="(max-width: 1024px) 90vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${accentBg[guide.accent]}`}>
          {guide.audience === "clinics" ? "For clinics" : guide.audience === "beginners" ? "Start here" : "Everyone"}
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">{guide.readMins} min</span>
      </div>
      <h3 className={`mt-2 font-display leading-tight text-ink transition-colors group-hover:text-camellia ${size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{guide.title}</h3>
      <p className="mt-2 max-w-md text-ink-soft">{guide.deck}</p>
      <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-camellia">
        Read the guide <ArrowRight size={14} className="transition-transform duration-200 ease-out group-hover:translate-x-1" />
        <span className="ml-auto text-xs font-normal text-ink-soft">{guide.concerns.map((c) => concernLabels[c]).join(" · ")}</span>
      </p>
    </Link>
  );
}
