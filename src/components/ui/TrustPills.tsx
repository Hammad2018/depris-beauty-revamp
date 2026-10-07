import { RevealGroup, RevealItem } from "./Reveal";

const pills = [
  { k: "Derm-tested", v: "Independent panel, 12 weeks" },
  { k: "Clinically dosed", v: "GHK-Cu at 3.0%, pH 5.5" },
  { k: "Formulated in Korea", v: "Shipped same-day from the US" },
];

/** Three glass trust cards that overlap the hero's bottom edge. */
export function TrustPills({ className = "" }: { className?: string }) {
  return (
    <RevealGroup className={`grid gap-3 sm:grid-cols-3 ${className}`}>
      {pills.map((p) => (
        <RevealItem key={p.k} className="glass-dark rounded-2xl px-5 py-4 text-white shadow-lift">
          <p className="mono-label text-teal-glow">{p.k}</p>
          <p className="mt-1.5 text-sm text-white/75">{p.v}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
