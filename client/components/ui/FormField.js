export default function FormField({ label, error, required = false, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-text">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-danger flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  )
}
