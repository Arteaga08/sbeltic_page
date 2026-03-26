export default function Card({ children, className = '' }) {
  return (
    <div
      className={`bg-surface rounded-lg border border-border shadow-[var(--shadow-sm)] p-6 ${className}`}
    >
      {children}
    </div>
  )
}
