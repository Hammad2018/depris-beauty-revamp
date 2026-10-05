import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ink" | "ghost";

const cls: Record<Variant, string> = {
  primary: "btn-primary",
  ink: "btn-ink",
  ghost: "btn-ghost",
};

export function ButtonLink({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: { href: string; variant?: Variant; children: ReactNode; className?: string } & Omit<ComponentProps<typeof Link>, "href">) {
  return (
    <Link href={href} className={`${cls[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...rest
}: { variant?: Variant; children: ReactNode; className?: string } & ComponentProps<"button">) {
  return (
    <button className={`${cls[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
