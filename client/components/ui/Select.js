export default function Select({ options = [], placeholder, error, className = '', ...props }) {
  return (
    <select
      className={`w-full rounded-md border px-3.5 py-2.5 text-base bg-surface text-text outline-none transition-all duration-150 cursor-pointer appearance-none
        ${error
          ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/20'
          : 'border-border focus:border-[var(--color-border-focus)] focus:ring-2 focus:ring-primary/15'
        } ${className}`}
      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '18px', paddingRight: '40px' }}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}
