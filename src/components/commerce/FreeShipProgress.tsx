import { freeShipProgress, type ShipTier } from "@/lib/cart/totals";
import { money } from "@/lib/format";

export function FreeShipProgress({ subtotal, tiers }: { subtotal: number; tiers: ShipTier[] }) {
  const progress = freeShipProgress(subtotal, tiers);
  const message = progress.nextTier
    ? `Add ${money(progress.remaining)} to unlock ${progress.nextTier.label}`
    : "Every perk unlocked.";

  return (
    <div className="rounded-2xl bg-sand/50 p-4">
      <p className="text-sm font-medium text-ink">{message}</p>
      <div className="relative mt-3 h-2 w-full rounded-full bg-porcelain">
        <div
          className="h-2 w-full origin-left rounded-full bg-gradient-to-r from-blush to-camellia transition-transform duration-300 ease-out"
          style={{ transform: `scaleX(${progress.percent / 100})` }}
          role="progressbar"
          aria-valuenow={progress.percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progress toward free shipping and gift"
        />
      </div>
      <div className="mt-2 flex justify-between text-[11px] font-medium uppercase tracking-wide text-ink-soft">
        {tiers
          .slice()
          .sort((a, b) => a.threshold - b.threshold)
          .map((t) => (
            <span key={t.threshold} className={subtotal >= t.threshold ? "text-sage" : ""}>
              {subtotal >= t.threshold ? "✓ " : ""}
              {t.label}
            </span>
          ))}
      </div>
    </div>
  );
}
