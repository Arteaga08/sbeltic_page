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

async function fetchInstagramPosts() {
  try {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN
    if (!token || token === 'pendiente') return []

    const fields = 'id,media_type,media_url,thumbnail_url,permalink,caption'
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=${fields}&limit=9&access_token=${token}`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return []

    const json = await res.json()
    return (json.data ?? []).filter(p =>
      ['IMAGE', 'CAROUSEL_ALBUM'].includes(p.media_type)
    )
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [categoriesRes, productsRes, bestsellerRes, instagramPosts] = await Promise.all([
    publicCategories.list({ type: 'treatment', active: true }),
    publicProducts.list({ isFeatured: true, limit: 6, active: true }),
    publicProducts.list({ isFeatured: true, limit: 1, active: true }),
    fetchInstagramPosts(),
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
      <SocialSection posts={instagramPosts} />
    </>
  )
}
