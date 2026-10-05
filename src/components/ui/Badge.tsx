import type { ReactNode } from "react";

type Tone = "bestseller" | "new" | "sale" | "neutral";

const styles: Record<Tone, string> = {
  bestseller: "bg-bronze/15 text-bronze-deep",
  new: "bg-sage/20 text-sage",
  sale: "bg-camellia/15 text-camellia",
  neutral: "bg-sand text-ink-soft",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${styles[tone]}`}>
      {children}
    </span>
  );
}
