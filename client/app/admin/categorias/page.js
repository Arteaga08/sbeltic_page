'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FoldersIcon as Folders, TagIcon as Tag, ArrowRightIcon as ArrowRight } from '@phosphor-icons/react'
import { categories } from '@/lib/api'
import PageHeader from '@/components/ui/PageHeader'

export default function CategoriasPage() {
  const [counts, setCounts] = useState({ treatment: 0, product: 0 })

  useEffect(() => {
    categories.list({ limit: 200 }).then((res) => {
      const data = res.data ?? []
      setCounts({
        treatment: data.filter((c) => c.type === 'treatment' && c.active).length,
        product: data.filter((c) => c.type === 'product' && c.active).length,
      })
    })
  }, [])

  return (
    <div>
      <PageHeader
        eyebrow="Gestión de clínica"
        icon={Folders}
        title="Categorías"
        subtitle="Selecciona el tipo de categorías que deseas gestionar"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NavCard
          href="/admin/categorias/tratamientos"
          icon={Folders}
          title="Tratamientos"
          description="Gestiona las categorías de los tratamientos estéticos"
          count={counts.treatment}
          countLabel="activas"
        />
        <NavCard
          href="/admin/categorias/productos"
          icon={Tag}
          title="Productos"
          description="Gestiona las categorías del catálogo de productos"
          count={counts.product}
          countLabel="activas"
        />
      </div>
    </div>
  )
}

function NavCard({ href, icon: Icon, title, description, count, countLabel }) {
  return (
    <Link href={href} className="group block bg-surface border border-border rounded-xl shadow-(--shadow-sm) p-6 hover:border-primary/30 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="p-3 bg-primary-light rounded-lg border border-primary/10 group-hover:bg-primary/10 transition-colors duration-200">
          <Icon size={24} weight="duotone" className="text-primary" />
        </div>
        <ArrowRight size={18} className="text-text-subtle group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 mt-1" />
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-text">{title}</h2>
        <p className="text-sm text-text-subtle mt-1">{description}</p>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-text-muted border border-border">
          {count} {countLabel}
        </span>
      </div>
    </Link>
  )
}
