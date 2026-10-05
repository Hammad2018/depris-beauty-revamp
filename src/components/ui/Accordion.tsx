import type { ReactNode } from "react";

export function Accordion({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group border-b border-sand py-4" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-ink marker:content-['']">
        {title}
        <span className="text-ink-soft transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="mt-3 text-sm leading-relaxed text-ink-soft">{children}</div>
    </details>
  );
}
