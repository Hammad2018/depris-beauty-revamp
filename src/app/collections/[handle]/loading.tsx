/** Skeleton that matches the shelf layout while products stream in. */
export default function Loading() {
  return (
    <div className="shell grid gap-10 py-12 lg:grid-cols-[17rem_1fr]" aria-busy="true" aria-label="Loading products">
      <aside className="hidden space-y-6 lg:block">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-3">
            <div className="h-3 w-20 rounded bg-sand" />
            <div className="flex flex-wrap gap-2">{[0, 1, 2, 3].map((j) => <div key={j} className="h-8 w-24 rounded-full bg-sand/70" />)}</div>
          </div>
        ))}
      </aside>
      <div>
        <div className="mb-6 h-4 w-28 rounded bg-sand" />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-3xl bg-porcelain shadow-soft">
              <div className="aspect-square bg-sand/70" />
              <div className="space-y-2 p-4"><div className="h-3 w-16 rounded bg-sand" /><div className="h-4 w-3/4 rounded bg-sand" /><div className="h-3 w-1/2 rounded bg-sand/70" /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
