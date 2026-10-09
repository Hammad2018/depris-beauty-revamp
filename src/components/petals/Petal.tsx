import type { CSSProperties } from "react";

export type PetalTone = "blush" | "periwinkle" | "jade" | "lilac" | "gold" | "white";
export const petalColor: Record<PetalTone, string> = {
  blush: "#EBB7B0",
  periwinkle: "#8E9FE6",
  jade: "#5CC3B8",
  lilac: "#B9A3DE",
  gold: "#E3B34C",
  white: "#FFFFFF",
};

/** Single petal shape drawn from the logo's lotus. `shape` picks the silhouette. */
export function Petal({
  tone = "blush",
  size = 16,
  shape = "lotus",
  opacity = 0.8,
  className = "",
  style,
}: {
  tone?: PetalTone;
  size?: number;
  shape?: "lotus" | "drop" | "leaf";
  opacity?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const d =
    shape === "drop"
      ? "M10 1C14 7 18 10 18 14A8 8 0 0 1 2 14C2 10 6 7 10 1Z"
      : shape === "leaf"
        ? "M2 18C2 8 9 2 18 2C18 11 12 18 2 18Z"
        : "M10 1C13 5 17 7 19 10C15 12 12 16 10 19C8 16 5 12 1 10C3 7 7 5 10 1Z";
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} style={style}>
      <path d={d} fill={petalColor[tone]} fillOpacity={opacity} />
    </svg>
  );
}

/** Lotus bullet: used as list markers in place of dots. */
export function PetalBullet({ tone = "jade", className = "" }: { tone?: PetalTone; className?: string }) {
  return <Petal tone={tone} size={12} shape="lotus" opacity={0.9} className={`mt-[0.45em] shrink-0 ${className}`} />;
}

/** Five-petal lotus flourish for card corners and headings. */
export function LotusFlourish({ size = 44, tone = "periwinkle", className = "" }: { size?: number; tone?: PetalTone; className?: string }) {
  const c = petalColor[tone];
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 64 64" fill="none" className={className}>
      {[0, 72, 144, 216, 288].map((a, i) => (
        <ellipse key={a} cx="32" cy="17" rx="7" ry="13" fill={c} fillOpacity={0.22 + i * 0.06} transform={`rotate(${a} 32 32)`} />
      ))}
      <circle cx="32" cy="32" r="4" fill="#E3B34C" fillOpacity="0.85" />
    </svg>
  );
}
