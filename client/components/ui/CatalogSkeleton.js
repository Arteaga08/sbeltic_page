import { SkeletonBlock } from "./Skeleton"

/* ── Card skeleton (shared between treatments & products) ── */
function CardSkeleton() {
  return (
    <div
      className="flex flex-col pb-2"
      style={{
        background: "var(--pub-surface)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "4/5",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
        }}
      >
        <SkeletonBlock className="absolute inset-0 rounded-none" />
        {/* Badge */}
        <SkeletonBlock className="absolute top-3 right-3 h-6 w-14 rounded-full" />
      </div>

      {/* Info */}
      <div className="px-4 pt-4 pb-3 flex flex-col gap-2.5 flex-1">
        <SkeletonBlock className="h-3 w-24 rounded" />
        <SkeletonBlock className="h-5 w-3/4 rounded" />
        <SkeletonBlock className="h-3 w-full rounded" />
        <SkeletonBlock className="h-3 w-2/3 rounded" />
        <SkeletonBlock className="h-5 w-28 rounded mt-1" />
      </div>

      {/* CTA button */}
      <div className="px-4 pb-4 mt-auto">
        <SkeletonBlock
          className="w-full h-11 rounded-lg"
          style={{ borderRadius: "var(--radius-md)" }}
        />
      </div>
    </div>
  )
}

/* ── Filter accordion skeleton ── */
function FilterGroupSkeleton() {
  return (
    <div className="py-5">
      <SkeletonBlock className="h-4 w-32 rounded mb-4" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="flex items-center gap-3">
            <SkeletonBlock className="h-4 w-4 rounded-sm shrink-0" />
            <SkeletonBlock className={`h-3 rounded ${i % 2 === 0 ? "w-28" : "w-20"}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Main catalog skeleton ── */
export default function CatalogSkeleton({ filterGroups = 2 }) {
  return (
    <div style={{ background: "var(--pub-accent-light)", minHeight: "100vh" }}>
      {/* ─── Collection Header ─── */}
      <section className="w-full pt-28 md:pt-50 pb-10 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row w-full min-h-75 md:min-h-112.5 border border-black/20 bg-white">
          {/* Left panel — title */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-black/20">
            <SkeletonBlock className="h-12 md:h-16 w-3/4 rounded-lg" />
          </div>
          {/* Right panel — image */}
          <div className="flex-1 relative min-h-62.5 md:min-h-0">
            <SkeletonBlock className="absolute inset-0 rounded-none" />
          </div>
        </div>
      </section>

      {/* ─── Category Nav ─── */}
      <nav
        className="overflow-hidden border-b border-black/5"
        style={{ background: "var(--pub-accent-light)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-3 py-4 md:py-5">
          {[28, 20, 24, 18, 22, 20].map((w, i) => (
            <SkeletonBlock
              key={i}
              className={`shrink-0 h-10 md:h-13 rounded-full`}
              style={{ width: `${w * 4}px` }}
            />
          ))}
        </div>
      </nav>

      {/* ─── Mobile filter bar ─── */}
      <div className="md:hidden flex items-center gap-3 px-6 py-4">
        <SkeletonBlock className="h-10 w-36 rounded" />
        <SkeletonBlock className="h-3 w-24 rounded ml-auto" />
      </div>

      {/* ─── Main content ─── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="flex gap-12 lg:gap-16">
          {/* Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <SkeletonBlock className="h-4 w-20 rounded" />
            </div>
            <div
              className="divide-y"
              style={{ borderColor: "var(--pub-border)" }}
            >
              {Array.from({ length: filterGroups }, (_, i) => (
                <FilterGroupSkeleton key={i} />
              ))}
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {/* Results count */}
            <div className="hidden md:flex justify-end mb-8">
              <SkeletonBlock className="h-3 w-28 rounded" />
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16">
              {Array.from({ length: 6 }, (_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>

            {/* Pagination */}
            <div
              className="mt-12 pt-8 flex items-center justify-between border-t"
              style={{ borderColor: "var(--pub-border)" }}
            >
              <SkeletonBlock className="h-3 w-32 rounded" />
              <div className="flex items-center gap-3">
                <SkeletonBlock className="h-10 w-10 rounded" />
                <SkeletonBlock className="h-4 w-16 rounded" />
                <SkeletonBlock className="h-10 w-10 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
