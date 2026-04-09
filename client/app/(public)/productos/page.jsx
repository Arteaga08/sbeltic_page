import { publicProducts, publicCategories } from '@/lib/api-public'
import ProductsPage from '@/components/public/ProductsPage'

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

  return <ProductsPage initialProducts={products} categories={categories} />
}
