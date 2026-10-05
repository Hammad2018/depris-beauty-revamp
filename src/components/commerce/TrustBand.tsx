import { trustPoints } from "@/lib/content";

export function TrustBand() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {trustPoints.map((t) => (
        <div key={t.title} className="rounded-2xl bg-porcelain/70 p-5">
          <p className="font-display text-base text-ink">{t.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{t.body}</p>
        </div>
      ))}
    </div>
  );
}
