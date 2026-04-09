const BASE = "animate-pulse rounded-md"
const COLOR = "bg-[var(--pub-border)]"

export function SkeletonBlock({ className = "", style }) {
  return <div className={`${BASE} ${COLOR} ${className}`} style={style} />
}

export function SkeletonText({
  lines = 3,
  lastLineWidth = "w-3/4",
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className={`${BASE} ${COLOR} h-4 ${
            i === lines - 1 ? lastLineWidth : "w-full"
          }`}
        />
      ))}
    </div>
  )
}

export function SkeletonHeading({ className = "" }) {
  return <div className={`${BASE} ${COLOR} h-8 w-3/4 ${className}`} />
}

export function SkeletonEyebrow({ className = "" }) {
  return <div className={`${BASE} ${COLOR} h-3 w-32 ${className}`} />
}
