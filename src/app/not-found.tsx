import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="eyebrow text-camellia">404</p>
      <h1 className="mt-3 font-display text-4xl text-ink">This page slipped away</h1>
      <p className="mt-3 max-w-md text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist — but your next skincare hero might be a tap away.
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
