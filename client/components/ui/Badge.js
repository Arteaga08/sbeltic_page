export default function Badge({ active }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        active
          ? 'bg-success-light text-success'
          : 'bg-slate-100 text-slate-500'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-success' : 'bg-slate-400'}`} />
      {active ? 'Activo' : 'Inactivo'}
    </span>
  )
}
