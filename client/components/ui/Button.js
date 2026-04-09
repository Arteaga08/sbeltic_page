import Spinner from './Spinner'

const variants = {
  primary:
    'bg-primary text-white hover:bg-primary-hover shadow-[0_1px_3px_0_rgb(61_189_181_/_0.3),0_0_0_1px_rgba(184,146,74,0.12)] hover:shadow-[0_2px_5px_0_rgb(61_189_181_/_0.35),0_0_0_1px_rgba(184,146,74,0.18)] disabled:opacity-60',
  secondary:
    'bg-white text-text border border-border hover:bg-bg hover:border-border shadow-[var(--shadow-sm)] disabled:opacity-60',
  danger:
    'bg-danger text-white hover:bg-danger-hover shadow-[0_1px_2px_0_rgb(220_38_38_/_0.25)] disabled:opacity-60',
  ghost:
    'bg-transparent text-text-muted hover:bg-bg hover:text-text disabled:opacity-60',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  type = 'button',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={loading || props.disabled}
      className={`inline-flex items-center rounded font-medium transition-all duration-150 cursor-pointer disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-1 focus-visible:outline-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  )
}
