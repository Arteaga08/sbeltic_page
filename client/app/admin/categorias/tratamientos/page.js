'use client'

import { useEffect, useState } from 'react'
import { PlusIcon as Plus, FoldersIcon as Folders } from '@phosphor-icons/react'
import { categories } from '@/lib/api'
import { useConfirm } from '@/hooks/useConfirm'
import { useToast } from '@/context/ToastContext'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/admin/DataTable'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import CategoryForm from '@/components/forms/CategoryForm'

const COLUMNS = [
  { key: 'name', label: 'Nombre' },
  { key: 'active', label: 'Estado', render: (v) => <Badge active={v} /> },
]

export default function CategoriasTratamientosPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [drawer, setDrawer] = useState({ open: false, item: null, key: 0 })
  const { confirm, ConfirmModal } = useConfirm()
  const { addToast } = useToast()

  async function load() {
    try {
      const res = await categories.list({ limit: 100, type: 'treatment', active: 'all' })
      setData(res.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function openNew() { setDrawer((prev) => ({ open: true, item: null, key: prev.key + 1 })) }
  function openEdit(item) { setDrawer((prev) => ({ open: true, item, key: prev.key + 1 })) }
  function closeDrawer() { setDrawer((prev) => ({ ...prev, open: false, item: null })) }

  function handleSuccess() {
    addToast(drawer.item ? 'Categoría actualizada' : 'Categoría creada')
    closeDrawer()
    load()
  }

  function handleDelete(item) {
    confirm({
      title: 'Eliminar categoría',
      message: `¿Eliminar "${item.name}"? Esta acción no se puede deshacer.`,
      onConfirm: async () => {
        await categories.delete(item._id)
        setData((prev) => prev.filter((c) => c._id !== item._id))
        addToast('Categoría eliminada', 'info')
      },
    })
  }

  const filtered = search
    ? data.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    : data

  const activeCount = data.filter((c) => c.active).length

  return (
    <div>
      <PageHeader
        eyebrow="Categorías"
        icon={Folders}
        title="Tratamientos"
        badge={`${activeCount} activas`}
        subtitle="Categorías para los tratamientos estéticos"
        action={{ label: 'Nueva categoría', onClick: openNew }}
        backHref="/admin/categorias"
      />

      <div className="bg-surface border border-border rounded-xl shadow-(--shadow-sm) overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <p className="text-sm text-text-subtle">{filtered.length} categorías</p>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar…"
            className="px-3 py-1.5 text-sm rounded-md border border-border bg-bg text-text placeholder:text-text-subtle outline-none focus:border-(--color-border-focus) focus:ring-1 focus:ring-primary/15 transition-all w-48"
          />
        </div>
        <DataTable
          columns={COLUMNS}
          data={filtered}
          loading={loading}
          onEdit={openEdit}
          onDelete={handleDelete}
          flat
        />
      </div>

      <ConfirmModal />

      <Drawer
        open={drawer.open}
        onClose={closeDrawer}
        title={drawer.item ? 'Editar categoría' : 'Nueva categoría — Tratamientos'}
      >
        <CategoryForm
          key={drawer.key}
          initial={drawer.item}
          lockedType="treatment"
          onSuccess={handleSuccess}
          onCancel={closeDrawer}
        />
      </Drawer>
    </div>
  )
}
