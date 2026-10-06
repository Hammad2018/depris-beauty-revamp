/** Decorative SVG wave divider to stitch dark/light section boundaries. */
export function WaveDivider({
  fill = "#F4F6FC",
  flip = false,
  className = "",
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden className={`${flip ? "rotate-180" : ""} ${className}`} style={{ lineHeight: 0 }}>
      <svg viewBox="0 0 1440 70" width="100%" height="70" preserveAspectRatio="none" className="block">
        <path d="M0,34 C240,72 480,4 720,30 C960,58 1200,10 1440,38 L1440,70 L0,70 Z" fill={fill} />
      </svg>
    </div>
  );
}
