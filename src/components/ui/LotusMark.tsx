/** Stylized jade lotus + yin-yang brand mark (echoes the Depris logo). */
export function LotusMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  const petals = [0, 60, 120, 180, 240, 300];
  const gid = "lotusG";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} role="img" aria-label="Depris Beauty">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5CC3B8" />
          <stop offset="1" stopColor="#157A73" />
        </linearGradient>
      </defs>
      {petals.map((a) => (
        <ellipse key={a} cx="32" cy="15" rx="8.5" ry="15" fill={`url(#${gid})`} opacity="0.92" transform={`rotate(${a} 32 32)`} />
      ))}
      <circle cx="32" cy="32" r="10.5" fill="#FFFFFF" />
      <path d="M32 21.5a10.5 10.5 0 0 1 0 21 5.25 5.25 0 0 1 0-10.5 5.25 5.25 0 0 0 0-10.5z" fill="#1E2A44" />
      <circle cx="32" cy="26.75" r="1.7" fill="#FFFFFF" />
      <circle cx="32" cy="37.25" r="1.7" fill="#1E2A44" />
    </svg>
  );
}
