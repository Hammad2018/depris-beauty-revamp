export function StarRating({
  rating,
  count,
  className = "",
  showValue = true,
}: {
  rating: number;
  count?: number;
  className?: string;
  showValue?: boolean;
}) {
  const full = Math.round(rating);
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm text-sage ${className}`}>
      <span aria-hidden className="tracking-tight">
        {"★★★★★".slice(0, full)}
        <span className="text-sage/30">{"★★★★★".slice(full)}</span>
      </span>
      {showValue && <span className="font-medium text-ink-soft">{rating.toFixed(1)}</span>}
      {typeof count === "number" && <span className="text-ink-soft/70">({count})</span>}
      <span className="sr-only">
        Rated {rating} out of 5{typeof count === "number" ? ` from ${count} reviews` : ""}
      </span>
    </span>
  );
}
