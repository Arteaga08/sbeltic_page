import { publicProducts, publicCategories } from '@/lib/api-public'
import ProductosPage from '@/components/public/ProductosPage'

export const metadata = {
  title: 'Productos — Sbeltic',
  description:
    'Descubre nuestra selección de productos de skincare premium, elegidos por especialistas para llevar los resultados de la clínica a tu hogar.',
}

export default async function ProductosRoute() {
  const [categoriesRes, productsRes] = await Promise.all([
    publicCategories.list({ type: 'product', active: true }),
    publicProducts.list({ active: true, limit: 100 }),
  ])

  const categories = categoriesRes.data ?? []
  const products = productsRes.data ?? []

  return <ProductosPage initialProducts={products} categories={categories} />
}
