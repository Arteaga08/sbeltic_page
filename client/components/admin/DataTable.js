import { PencilSimpleIcon as PencilSimple, TrashIcon as Trash, TrayIcon as Tray } from '@phosphor-icons/react/dist/ssr'
import Spinner from '@/components/ui/Spinner'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function DataTable({ columns, data, onEdit, onDelete, loading, flat = false }) {
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!data?.length) {
    return (
      <div className="text-center py-20">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-slate-50 border border-border">
            <Tray size={32} weight="thin" className="text-text-subtle" />
          </div>
        </div>
        <p className="text-base font-medium text-text-muted">Nada por aquí todavía</p>
        <p className="text-sm text-text-subtle mt-1">Usa el botón de arriba para crear el primero.</p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop table */}
      <div className={`hidden md:block overflow-x-auto bg-surface ${flat ? '' : 'rounded-xl border border-border shadow-(--shadow-sm)'}`}>
        <table className="w-full">
          <thead>
            <tr className="bg-bg border-b border-border">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-5 py-3.5 text-xs font-semibold text-text-subtle uppercase tracking-wider whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-text-subtle uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item._id}
                className="border-b border-border last:border-0 transition-colors duration-150 hover:bg-bg/60"
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-5 py-4 text-sm text-text ${col.mono ? 'font-mono' : ''}`}>
                    {col.type === 'image'
                      ? <TableImage src={item[col.key]?.[0] ?? item[col.key]} />
                      : col.render
                        ? col.render(item[col.key], item)
                        : (item[col.key] ?? '—')}
                  </td>
                ))}
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 rounded-md text-text-muted hover:text-primary hover:bg-primary-light transition-colors duration-150"
                      title="Editar"
                    >
                      <PencilSimple size={15} weight="bold" />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="p-2 rounded-md text-text-muted hover:text-danger hover:bg-danger-light transition-colors duration-150"
                      title="Eliminar"
                    >
                      <Trash size={15} weight="bold" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-3">
        {data.map((item) => (
          <MobileCard key={item._id} columns={columns} item={item} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </>
  )
}

function TableImage({ src }) {
  if (!src) {
    return (
      <div className="h-10 w-10 rounded-md bg-bg border border-border flex items-center justify-center text-text-subtle text-xs">
        —
      </div>
    )
  }
  return (
    <div className="h-10 w-10 rounded-md overflow-hidden border border-border bg-bg shrink-0">
      <img src={`${BASE_URL}${src}`} alt="" className="h-full w-full object-cover" />
    </div>
  )
}

function MobileCard({ columns, item, onEdit, onDelete }) {
  const imageCol = columns.find((c) => c.type === 'image')
  const rest = columns.filter((c) => c.key !== 'name' && c.type !== 'image')

  return (
    <div className="bg-surface border border-border rounded-xl p-4 shadow-(--shadow-sm)">
      <div className="flex items-start gap-3">
        {imageCol && (
          <TableImage src={item[imageCol.key]?.[0] ?? item[imageCol.key]} />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-text text-base leading-snug truncate">
            {item.name ?? '—'}
          </p>
          {item.shortDescription && (
            <p className="text-xs text-text-muted mt-0.5 line-clamp-1">{item.shortDescription}</p>
          )}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
            {rest.map((col) => (
              <span key={col.key} className="text-xs text-text-muted">
                {col.render ? col.render(item[col.key], item) : (item[col.key] ?? '—')}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          <button
            onClick={() => onEdit(item)}
            className="p-2 rounded-md text-text-muted hover:text-primary hover:bg-primary-light transition-colors duration-150"
          >
            <PencilSimple size={15} weight="bold" />
          </button>
          <button
            onClick={() => onDelete(item)}
            className="p-2 rounded-md text-text-muted hover:text-danger hover:bg-danger-light transition-colors duration-150"
          >
            <Trash size={15} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  )
}
