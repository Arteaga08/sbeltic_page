import {
  SkeletonBlock,
  SkeletonText,
  SkeletonHeading,
  SkeletonEyebrow,
} from "@/components/ui/Skeleton"

/* ── Skeleton color helpers ── */
const DARK_BLOCK = "bg-white/15" // for dark backgrounds

/* ── Section skeletons ── */

function HeroSkeleton() {
  return (
    <section className="relative w-full h-[40vh] md:h-[55vh] overflow-hidden bg-neutral-800">
      <div className="relative z-10 flex flex-col items-center justify-end h-full text-center px-6 pb-12 md:pb-20">
        <SkeletonBlock className={`h-3 w-40 rounded mb-4 ${DARK_BLOCK}`} />
        <SkeletonBlock className={`h-12 md:h-16 w-64 md:w-80 rounded-md mb-3 ${DARK_BLOCK}`} />
        <SkeletonBlock className={`h-3 w-32 rounded mb-6 ${DARK_BLOCK}`} />
        <SkeletonBlock
          className="h-0.5 w-24 md:w-32 rounded-full"
          style={{ background: "var(--pub-gold-light)" }}
        />
      </div>
    </section>
  )
}

function TextImageSkeleton() {
  return (
    <section
      className="w-full py-24 md:py-32"
      style={{ background: "var(--pub-accent-light)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text column */}
          <div>
            <SkeletonEyebrow className="mb-5" />
            <SkeletonHeading className="mb-3" />
            <SkeletonBlock className="h-8 w-1/2 rounded-md mb-6" />
            <SkeletonBlock
              className="h-0.5 w-12 rounded-full mb-8"
              style={{ background: "var(--pub-gold-light)" }}
            />
            <SkeletonText lines={4} className="mb-6" />
            <SkeletonText lines={3} />
          </div>

          {/* Image column */}
          <SkeletonBlock
            className="w-full rounded-2xl"
            style={{ aspectRatio: "4/5" }}
          />
        </div>
      </div>
    </section>
  )
}

function ValuesSkeleton() {
  return (
    <section
      className="w-full py-24 md:py-32"
      style={{ background: "var(--pub-accent-light)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <SkeletonEyebrow className="mb-5" />
          <SkeletonHeading className="mb-3" />
          <SkeletonBlock className="h-8 w-1/3 rounded-md mb-6" />
          <SkeletonBlock
            className="h-0.5 w-12 rounded-full"
            style={{ background: "var(--pub-gold-light)" }}
          />
        </div>

        {/* 3-column grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 border-t border-b"
          style={{ borderColor: "var(--pub-gold-light)" }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center px-8 md:px-12 py-12 md:py-16 border-b sm:border-b-0 sm:border-l first:border-l-0 last:border-b-0"
              style={{ borderColor: "var(--pub-gold-light)" }}
            >
              <SkeletonBlock className="h-12 w-10 rounded mb-4" />
              <SkeletonBlock className="h-4 w-24 rounded mb-4" />
              <SkeletonText lines={3} lastLineWidth="w-2/3" className="w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BannerSkeleton() {
  return (
    <section className="relative w-full pt-8 pb-20 md:py-32 overflow-hidden bg-[#111111]">
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-24 items-center">
          {/* Left — titles */}
          <div className="flex flex-col items-center lg:items-start">
            <SkeletonBlock className={`h-16 md:h-20 w-56 md:w-72 rounded-md mb-2 ${DARK_BLOCK}`} />
            <SkeletonBlock className={`h-6 md:h-8 w-40 md:w-56 rounded mb-6 ${DARK_BLOCK}`} />
            <SkeletonBlock className={`h-px w-12 md:w-20 ${DARK_BLOCK}`} />
          </div>

          {/* Right — text + CTA */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="hidden md:flex flex-col gap-3 mb-10 w-full max-w-md">
              <SkeletonBlock className={`h-4 w-full rounded ${DARK_BLOCK}`} />
              <SkeletonBlock className={`h-4 w-full rounded ${DARK_BLOCK}`} />
              <SkeletonBlock className={`h-4 w-3/4 rounded ${DARK_BLOCK}`} />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10">
              <SkeletonBlock className={`h-12 w-48 rounded-full ${DARK_BLOCK}`} />
              <SkeletonBlock className={`h-8 w-36 rounded ${DARK_BLOCK}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Loading component ── */
export default function NosotrosLoading() {
  return (
    <>
      <HeroSkeleton />
      <TextImageSkeleton />
      <TextImageSkeleton />
      <ValuesSkeleton />
      <BannerSkeleton />
    </>
  )
}
