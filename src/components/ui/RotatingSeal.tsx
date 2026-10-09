import { LotusMark } from "./LotusMark";

/** Circular rotating "verified" seal: text on a path, chrome ring, lotus core. Pauses on hover. */
export function RotatingSeal({
  text = "AUTHORIZED RETAILER · SOURCED IN KOREA · STOCKED IN THE US · ",
  size = 150,
  className = "",
  light = false,
}: {
  text?: string;
  size?: number;
  className?: string;
  light?: boolean;
}) {
  const id = light ? "sealPathL" : "sealPathD";
  const fg = light ? "#ffffff" : "#1E2A44";
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 160 160" width={size} height={size} className="animate-spin-slow motion-reduce:animate-none [animation-duration:22s] hover:[animation-play-state:paused]" aria-hidden>
        <defs>
          <path id={id} d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
          <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#CBD6DA" />
            <stop offset="0.5" stopColor="#ffffff" />
            <stop offset="1" stopColor="#8CA0A3" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r="76" fill="none" stroke={`url(#${id}-ring)`} strokeWidth="1.5" />
        <circle cx="80" cy="80" r="44" fill="none" stroke={fg} strokeOpacity="0.25" strokeWidth="0.8" />
        <text fill={fg} fontSize="10.5" fontFamily="var(--font-mono), monospace" letterSpacing="2.2">
          <textPath href={`#${id}`}>{text}{text}</textPath>
        </text>
      </svg>
      <div className="absolute">
        <LotusMark size={Math.round(size * 0.26)} />
      </div>
    </div>
  );
}
