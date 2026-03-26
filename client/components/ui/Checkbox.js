export default function Checkbox({ label, checked, onChange, name, className = '' }) {
  return (
    <label className={`inline-flex items-center gap-2 cursor-pointer text-sm text-text ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-border text-primary cursor-pointer accent-primary"
      />
      {label}
    </label>
  )
}
