export default function Textarea({ error, rows = 4, className = '', ...props }) {
  return (
    <textarea
      rows={rows}
      className={`w-full rounded-md border px-3.5 py-2.5 text-base bg-surface text-text placeholder:text-text-subtle outline-none transition-all duration-150 resize-y
        ${error
          ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/20'
          : 'border-border focus:border-[var(--color-border-focus)] focus:ring-2 focus:ring-primary/15'
        } ${className}`}
      {...props}
    />
  )
}
