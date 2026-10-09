import { RevealGroup, RevealItem } from "./Reveal";

const pills = [
  { k: "Authorized retailer", v: "Sourced directly from Korea" },
  { k: "Stocked in the US", v: "Ships same-day from Wyoming" },
  { k: "Cruelty-free", v: "Korea bans cosmetic animal testing" },
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
