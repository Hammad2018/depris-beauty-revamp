/**
 * Global SVG clip paths (object-bounding-box units) so any element can take a petal
 * silhouette with `clip-path: url(#petal-clip)` or `url(#lotus-clip)`.
 */
export function PetalDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <defs>
        <clipPath id="petal-clip" clipPathUnits="objectBoundingBox">
          <path d="M0.5 0 C0.72 0.05 0.98 0.3 1 0.56 C1 0.82 0.78 1 0.5 1 C0.22 1 0 0.82 0 0.56 C0.02 0.3 0.28 0.05 0.5 0 Z" />
        </clipPath>
        <clipPath id="leaf-clip" clipPathUnits="objectBoundingBox">
          <path d="M0 1 C0 0.4 0.4 0 1 0 C1 0.6 0.6 1 0 1 Z" />
        </clipPath>
        <clipPath id="lotus-clip" clipPathUnits="objectBoundingBox">
          <path d="M0.5 0 C0.78 0.06 0.94 0.22 1 0.5 C0.94 0.78 0.78 0.94 0.5 1 C0.22 0.94 0.06 0.78 0 0.5 C0.06 0.22 0.22 0.06 0.5 0 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
