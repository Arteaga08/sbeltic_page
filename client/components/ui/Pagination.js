import { CaretLeftIcon as CaretLeft, CaretRightIcon as CaretRight } from '@phosphor-icons/react/dist/ssr'

export default function Pagination({ page, pages, total, onChange }) {
  if (pages <= 1) return null

  return (
    <div className="flex items-center justify-between mt-4 px-1">
      <p className="text-sm text-text-subtle">
        {total} {total === 1 ? 'resultado' : 'resultados'}
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm text-text-muted border border-border hover:bg-bg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <CaretLeft size={14} />
          Anterior
        </button>
        <span className="px-3 py-1.5 text-sm text-text font-medium">
          {page} / {pages}
        </span>
        <button
          onClick={() => onChange(page + 1)}
          disabled={page === pages}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm text-text-muted border border-border hover:bg-bg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Siguiente
          <CaretRight size={14} />
        </button>
      </div>
    </div>
  )
}
