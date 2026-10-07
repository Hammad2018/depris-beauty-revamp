/** Potency window: fraction of shelf life remaining given bottling, expiry, open date and storage. */
export type Storage = "fridge" | "room";

export function potencyWindow(opts: { bottled: string; expires: string; opened?: string | null; storage: Storage; now: Date }) {
  const bottled = new Date(opts.bottled).getTime();
  let end = new Date(opts.expires).getTime();
  if (opts.opened) {
    // opened: 6 months in the fridge, 3 at room temperature, never beyond printed expiry
    const months = opts.storage === "fridge" ? 6 : 3;
    const o = new Date(opts.opened);
    o.setMonth(o.getMonth() + months);
    end = Math.min(end, o.getTime());
  } else if (opts.storage === "room") {
    end = Math.min(end, bottled + 1000 * 60 * 60 * 24 * 365);
  }
  const start = opts.opened ? new Date(opts.opened).getTime() : bottled;
  const total = Math.max(1, end - start);
  const left = Math.max(0, Math.min(1, (end - opts.now.getTime()) / total));
  const daysLeft = Math.max(0, Math.round((end - opts.now.getTime()) / 86_400_000));
  return { fraction: left, daysLeft, bestBy: new Date(end).toISOString().slice(0, 10) };
}
