import { MagnifyingGlassIcon as Search } from '@phosphor-icons/react/dist/ssr'
import Select from '@/components/ui/Select'

const ACTIVE_OPTIONS = [
  { value: 'all', label: 'Todos' },
  { value: 'true', label: 'Activos' },
  { value: 'false', label: 'Inactivos' },
]

export default function TableToolbar({ search, onSearch, activeFilter, onActiveFilter }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle pointer-events-none"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Buscar por nombre…"
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-md border border-border bg-surface text-text placeholder:text-text-subtle outline-none focus:border-[var(--color-border-focus)] focus:ring-2 focus:ring-primary/15 transition-all"
        />
      </div>
      <Select
        value={activeFilter}
        onChange={(e) => onActiveFilter(e.target.value)}
        options={ACTIVE_OPTIONS}
        className="sm:w-40"
      />
    </div>
  )
}
