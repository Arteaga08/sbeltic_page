import Hero from '@/components/public/home/Hero'
import TreatmentsSection from '@/components/public/home/TreatmentsSection'
import ClinicSection from '@/components/public/home/ClinicSection'
import DividerBanner from '@/components/public/home/DividerBanner'
import ProductsSection from '@/components/public/home/ProductsSection'
import BestsellerSection from '@/components/public/home/BestsellerSection'
import PackagesSection from '@/components/public/home/PackagesSection'
import SocialSection from '@/components/public/home/SocialSection'
import { publicCategories, publicProducts } from '@/lib/api-public'

export const metadata = {
  title: 'Sbeltic — Clínica Estética',
  description: 'Tratamientos estéticos profesionales y productos de skincare premium.',
}

export default async function HomePage() {
  const [categoriesRes, productsRes, bestsellerRes] = await Promise.all([
    publicCategories.list({ type: 'treatment', active: true }),
    publicProducts.list({ isFeatured: true, limit: 6, active: true }),
    publicProducts.list({ isFeatured: true, limit: 1, active: true }),
  ])

  const categories = categoriesRes.data ?? []
  const products = productsRes.data ?? []
  const bestseller = bestsellerRes.data?.[0] ?? null

  return (
    <>
      <Hero />
      <TreatmentsSection categories={categories} />
      <ClinicSection />
      <DividerBanner />
      <ProductsSection products={products} />
      {bestseller && <BestsellerSection product={bestseller} />}
      <PackagesSection />
      <SocialSection />
    </>
  )
}
