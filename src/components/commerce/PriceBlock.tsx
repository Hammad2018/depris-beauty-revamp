import { money } from "@/lib/format";

export function PriceBlock({
  price,
  compareAtPrice,
  currency = "USD",
  size = "md",
}: {
  price: number;
  compareAtPrice?: number;
  currency?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = { sm: "text-sm", md: "text-base", lg: "text-2xl font-display" };
  return (
    <span className={`inline-flex items-baseline gap-2 ${sizes[size]} text-ink`}>
      <span className="font-medium">{money(price, currency)}</span>
      {compareAtPrice && compareAtPrice > price && (
        <span className="text-sm font-normal text-ink-soft line-through">{money(compareAtPrice, currency)}</span>
      )}
    </span>
  );
}
