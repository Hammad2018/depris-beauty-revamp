export function ClinicalClaim({ claim }: { claim: string }) {
  const match = claim.match(/^(\d+%)/);
  const stat = match?.[1];
  const rest = stat ? claim.slice(stat.length).trim() : claim;
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-sage/10 p-5">
      {stat && <span className="font-display text-3xl text-sage">{stat}</span>}
      <p className="text-sm leading-relaxed text-ink">{rest.replace(/^[—–-]\s*/, "")}</p>
    </div>
  );
}
