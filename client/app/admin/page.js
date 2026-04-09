'use client'

import { useEffect, useState } from 'react'
import { SparkleIcon as Sparkle, ShoppingBagIcon as ShoppingBag, TagIcon as Tag } from '@phosphor-icons/react/dist/ssr'
import StatCard from '@/components/admin/StatCard'
import { categories, treatments, products } from '@/lib/api'

export default function DashboardPage() {
  const [stats, setStats] = useState({ categories: null, treatments: null, products: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [cats, treats, prods] = await Promise.all([
          categories.list({ limit: 1 }),
          treatments.list({ limit: 1, active: true }),
          products.list({ limit: 1, active: true }),
        ])
        setStats({
          categories: cats.total,
          treatments: treats.total,
          products: prods.total,
        })
      } catch {
        // silencioso
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-2xl font-semibold text-text"
          style={{ fontFamily: 'var(--font-heading), Georgia, serif' }}
        >
          Catálogo General
        </h1>
        <p className="text-sm text-text-muted mt-1">Resumen de disponibilidad</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Tratamientos activos"
          value={stats.treatments}
          subtitle="en el catálogo"
          href="/admin/tratamientos"
          loading={loading}
          icon={Sparkle}
          iconBg="bg-treatment-light"
          iconColor="text-treatment"
        />
        <StatCard
          title="Productos activos"
          value={stats.products}
          subtitle="en el catálogo"
          href="/admin/productos"
          loading={loading}
          icon={ShoppingBag}
          iconBg="bg-product-light"
          iconColor="text-product"
        />
        <StatCard
          title="Categorías"
          value={stats.categories}
          subtitle="en total"
          href="/admin/categorias"
          loading={loading}
          icon={Tag}
          iconBg="bg-primary-light"
          iconColor="text-primary"
        />
      </div>
    </div>
  )
}
