import { LotusMark } from "@/components/ui/LotusMark";
import type { lots } from "@/lib/renders";

type Lot = (typeof lots)[string];

/** Branded, legible "Potency Certificate" — the COA, designed to be read. */
export function PotencyCertificate({ lot, compact = false }: { lot: Lot; compact?: boolean }) {
  const rows = [
    ["Product", lot.product],
    ["Lot", lot.lot],
    ["Bottled", lot.bottled],
    ["Best before", lot.expires],
    ["Assay", lot.assay],
    ["pH", lot.ph],
  ];
  return (
    <div className={`relative overflow-hidden rounded-[1.5rem] border border-ink/10 bg-[#FBF8F1] text-ink shadow-lift ${compact ? "p-5" : "p-8 sm:p-10"}`}>
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-glow/15 blur-2xl" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mono-label text-camellia">Potency certificate</p>
          <h3 className={`mt-2 font-display ${compact ? "text-xl" : "text-3xl"} leading-tight`}>Verified by lot</h3>
        </div>
        <LotusMark size={compact ? 32 : 44} />
      </div>
      <dl className={`mt-5 grid gap-x-6 ${compact ? "gap-y-2 text-xs" : "gap-y-3 text-sm"} sm:grid-cols-2`}>
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-3 border-b border-ink/10 pb-2">
            <dt className="mono-label mono-label-plain text-ink-soft">{k}</dt>
            <dd className="text-right font-medium tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      {!compact && <p className="mt-5 text-xs leading-relaxed text-ink-soft">{lot.notes} Plain-language summary: the peptide is present at the studied strength and the formula is stable for the shelf life printed on your carton.</p>}
      <p className={`mono-label mono-label-plain ${compact ? "mt-3 text-[9px]" : "mt-4"} text-ink-soft/70`}>Illustrative certificate for concept pitch · verify at /verify?lot={lot.lot}</p>
    </div>
  );
}
