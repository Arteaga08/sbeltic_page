'use client'

import { useEffect, useState, useCallback } from 'react'
import { PackageIcon as Package } from '@phosphor-icons/react'
import { products } from '@/lib/api'
import { useConfirm } from '@/hooks/useConfirm'
import { useToast } from '@/context/ToastContext'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/admin/DataTable'
import TableToolbar from '@/components/admin/TableToolbar'
import Pagination from '@/components/ui/Pagination'
import Drawer from '@/components/ui/Drawer'
import ProductForm from '@/components/forms/ProductForm'

const COLUMNS = [
  { key: 'images', label: '', type: 'image' },
  {
    key: 'name',
    label: 'Nombre',
    render: (v, item) => (
      <div>
        <p className="font-medium text-text">{v}</p>
        {item.brand && (
          <p className="text-xs text-text-muted mt-0.5">{item.brand}</p>
        )}
      </div>
    ),
  },
  {
    key: 'category',
    label: 'Categoría',
    render: (v) => v?.name
      ? <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-product-light text-product">{v.name}</span>
      : <span className="text-text-subtle">—</span>,
  },
  { key: 'price', label: 'Precio', mono: true, render: (v) => v ? `$${v.toLocaleString('es-MX')}` : '—' },
  { key: 'active', label: 'Estado', render: (v) => <Badge active={v} /> },
]

const LIMIT = 20

export default function ProductosPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [drawer, setDrawer] = useState({ open: false, item: null, key: 0 })
  const { confirm, ConfirmModal } = useConfirm()
  const { addToast } = useToast()

  const load = useCallback(async (params) => {
    setLoading(true)
    try {
      const res = await products.list({ limit: LIMIT, ...params })
      setData(res.data)
      setPages(res.pages)
      setTotal(res.total)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1)
      load({ search, active: activeFilter, page: 1 })
    }, 300)
    return () => clearTimeout(timer)
  }, [search, activeFilter, load])

  useEffect(() => {
    load({ search, active: activeFilter, page })
  }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

  function openNew() { setDrawer((prev) => ({ open: true, item: null, key: prev.key + 1 })) }
  function openEdit(item) { setDrawer((prev) => ({ open: true, item, key: prev.key + 1 })) }
  function closeDrawer() { setDrawer((prev) => ({ ...prev, open: false, item: null })) }

  function handleSuccess() {
    const msg = drawer.item ? 'Producto actualizado' : 'Producto creado'
    closeDrawer()
    addToast(msg)
    load({ search, active: activeFilter, page })
  }

  function handleDelete(item) {
    confirm({
      title: 'Eliminar producto',
      message: `¿Eliminar "${item.name}"? Esta acción no se puede deshacer.`,
      onConfirm: async () => {
        await products.delete(item._id)
        addToast('Producto eliminado', 'info')
        load({ search, active: activeFilter, page })
      },
    })
  }

  return (
    <div>
      <PageHeader
        eyebrow="Gestión de clínica"
        icon={Package}
        title="Productos"
        badge={`${total} en total`}
        subtitle="Listado completo de inventario para la web"
        action={{ label: 'Nuevo producto', onClick: openNew }}
      />

      <TableToolbar
        search={search}
        onSearch={setSearch}
        activeFilter={activeFilter}
        onActiveFilter={(v) => { setActiveFilter(v); setPage(1) }}
      />

      <DataTable
        columns={COLUMNS}
        data={data}
        loading={loading}
        onEdit={openEdit}
        onDelete={handleDelete}
      />

      <Pagination page={page} pages={pages} total={total} onChange={setPage} />

      <ConfirmModal />

      <Drawer
        open={drawer.open}
        onClose={closeDrawer}
        title={drawer.item ? 'Editar producto' : 'Nuevo producto'}
      >
        <ProductForm
          key={drawer.key}
          initial={drawer.item}
          onSuccess={handleSuccess}
        />
      </Drawer>
    </div>
  )
}
