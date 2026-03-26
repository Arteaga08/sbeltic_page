import Link from 'next/link'

export default function StatCard({ title, subtitle, value, href, loading = false, icon: Icon, iconBg = 'bg-primary-light', iconColor = 'text-primary' }) {
  return (
    <Link href={href}>
      <div className="bg-surface rounded-xl border border-border p-6 hover:border-primary hover:shadow-(--shadow-md) transition-all duration-150 cursor-pointer group">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text-muted mb-1">{title}</p>
            {loading ? (
              <div className="h-9 w-20 bg-bg rounded-md animate-pulse mt-1" />
            ) : (
              <p className="text-3xl font-semibold text-text leading-none">{value ?? '—'}</p>
            )}
            {subtitle && !loading && (
              <p className="text-xs text-text-subtle mt-1.5">{subtitle}</p>
            )}
          </div>
          {Icon && (
            <div className={`h-11 w-11 rounded-xl ${iconBg} flex items-center justify-center shrink-0 ml-4`}>
              <Icon size={22} weight="duotone" className={iconColor} />
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
