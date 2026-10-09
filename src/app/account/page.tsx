import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Account",
  description: "Sign in to manage your Depris Beauty orders and subscriptions.",
};

export default function AccountPage() {
  return (
    <>
      <PageHero eyebrow="Account" title="Welcome back" intro="Sign in to track orders, manage subscriptions and reorder your favorites." />
      <section className="shell max-w-md py-14">
        <div className="rounded-3xl bg-porcelain p-8 shadow-soft">
          <p className="text-ink-soft">
            Accounts connect to your WooCommerce customer accounts at build. In this concept preview, sign-in and order history will
            appear here.
          </p>
          <div className="mt-6 flex gap-3">
            <ButtonLink href="/shop" variant="primary">
              Continue shopping
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
