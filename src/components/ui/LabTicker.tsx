import { Marquee } from "./Marquee";

const defaults = [
  "LOT 2611-D", "pH 5.5", "GHK-Cu 3.0%", "12-WEEK STUDY", "N = 84", "DERM-TESTED",
  "FRAGRANCE-FREE", "COLD-CHAIN SHIPPED", "BOTTLED 09.26", "FORMULATED IN KOREA",
];

/** Lab-data as texture: a slow mono ticker of lot / pH / study facts. */
export function LabTicker({ items = defaults, tone = "dark", className = "" }: { items?: string[]; tone?: "dark" | "light"; className?: string }) {
  const color = tone === "dark" ? "text-white/60" : "text-ink-soft";
  const dot = tone === "dark" ? "bg-teal-glow" : "bg-camellia";
  return (
    <div className={`border-y ${tone === "dark" ? "border-white/10" : "border-ink/10"} py-3 ${className}`}>
      <Marquee className="mask-fade-x [&>div]:gap-10 [&>div]:[animation-duration:48s]">
        {items.map((t) => (
          <span key={t} className={`mono-label mono-label-plain flex items-center gap-3 whitespace-nowrap ${color}`}>
            <span className={`h-1 w-1 rounded-full ${dot}`} />
            {t}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
