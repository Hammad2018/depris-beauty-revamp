/** Skeleton for the product stage + buy box while the product loads. */
export default function Loading() {
  return (
    <section className="celestial text-white" aria-busy="true" aria-label="Loading product">
      <div className="shell grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="aspect-square rounded-[2.5rem] bg-white/10" />
        <div className="space-y-4">
          <div className="h-3 w-32 rounded bg-white/20" />
          <div className="h-10 w-3/4 rounded bg-white/20" />
          <div className="h-4 w-1/2 rounded bg-white/15" />
          <div className="mt-6 h-56 rounded-3xl bg-white/15" />
        </div>
      </div>
    </section>
  );
}
