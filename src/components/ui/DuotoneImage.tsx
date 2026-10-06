import Image from "next/image";

type Palette = "cool" | "warm" | "lilac" | "jade";

// Literal class names so Tailwind's content scanner keeps them (dynamic
// `duotone-${palette}` would be purged from @layer utilities).
const paletteClass: Record<Palette, string> = {
  cool: "duotone-cool",
  warm: "duotone-warm",
  lilac: "duotone-lilac",
  jade: "duotone-jade",
};

/**
 * Duotone image: grayscale photo blended (luminosity) onto a brand gradient so
 * mixed-source photography reads as one editorial palette. Without a `src`,
 * renders a soft botanical duotone composition so layouts never show blank media.
 */
export function DuotoneImage({
  src,
  alt,
  palette = "cool",
  className = "",
  priority = false,
}: {
  src?: string;
  alt: string;
  palette?: Palette;
  className?: string;
  priority?: boolean;
}) {
  return (
    // Positioning is owned by the caller (`relative` here would out-rank a passed `absolute`
    // in Tailwind's output order and collapse the box to 0px tall).
    <div className={`${paletteClass[palette]} overflow-hidden ${className || "relative"}`} role={src ? undefined : "img"} aria-label={src ? undefined : alt}>
      {src ? (
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" priority={priority} />
      ) : (
        <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full opacity-50" aria-hidden preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id={`dg-${palette}`} cx="50%" cy="45%" r="42%">
              <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="140" r="130" fill={`url(#dg-${palette})`} />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} cx="200" cy="95" rx="22" ry="48" fill="#fff" fillOpacity="0.12" transform={`rotate(${a} 200 150)`} />
          ))}
          <circle cx="200" cy="150" r="26" fill="#fff" fillOpacity="0.22" />
          <circle cx="78" cy="238" r="3" fill="#fff" fillOpacity="0.8" />
          <circle cx="322" cy="62" r="2.5" fill="#fff" fillOpacity="0.8" />
          <circle cx="340" cy="250" r="2" fill="#fff" fillOpacity="0.7" />
        </svg>
      )}
    </div>
  );
}
