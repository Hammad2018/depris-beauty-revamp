import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="font-display text-5xl text-ink">This page slipped away</h1>
      <p className="mt-3 max-w-md text-ink-soft">
        That address doesn&apos;t exist. The shelf is one tap away.
      </p>
      <div className="mt-6 flex gap-3">
        <ButtonLink href="/" variant="primary">
          Back home
        </ButtonLink>
        <ButtonLink href="/shop" variant="ghost">
          Shop all
        </ButtonLink>
      </div>
    </section>
  );
}
