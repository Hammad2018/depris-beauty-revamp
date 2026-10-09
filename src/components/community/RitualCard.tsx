import Image from "next/image";
import Link from "next/link";
import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";
import type { Ritual } from "@/lib/community";

export function RitualCard({ r, titles, tilt = 0 }: { r: Ritual; titles: Record<string, string>; tilt?: number }) {
  return (
    <article className="group relative" style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}>
      <div className="relative aspect-[4/5] overflow-hidden r-petal shadow-lift">
        <Image src={r.image} alt="" fill sizes="(max-width: 640px) 90vw, 30vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/20 to-transparent" />
        <span className="absolute left-4 top-4 rounded-md bg-ink/70 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white/80">Sample</span>
        <span className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full glass-dark text-white">
          {r.when === "night" ? <Moon size={14} weight="fill" /> : <Sun size={14} weight="fill" />}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="font-display text-lg leading-snug">“{r.quote}”</p>
          <p className="mt-2 text-xs text-white/70">{r.name} · {r.place} · {r.skin}</p>
        </div>
      </div>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {r.products.map((h) => (
          <li key={h}>
            <Link href={`/products/${h}`} className="rounded-full border border-sand bg-porcelain px-2.5 py-1 text-xs text-ink-soft transition-colors hover:border-camellia hover:text-ink">
              {titles[h] ?? h}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
