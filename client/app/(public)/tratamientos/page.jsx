import { publicTreatments, publicCategories } from '@/lib/api-public'
import TratamientosPage from '@/components/public/TratamientosPage'
import { Suspense } from 'react'

export const metadata = {
  title: 'Tratamientos — Sbeltic',
  description:
    'Descubre nuestra selección de tratamientos clínicos especializados para rostro y cuerpo, diseñados por expertos para resultados visibles y duraderos.',
}

export default async function TratamientosRoute() {
  const [categoriesRes, treatmentsRes] = await Promise.all([
    publicCategories.list({ type: 'treatment', active: true }),
    publicTreatments.list({ active: true, limit: 100 }),
  ])

  const categories = categoriesRes.data ?? []
  const treatments = treatmentsRes.data ?? []

  return (
    <Suspense>
      <TratamientosPage initialTreatments={treatments} categories={categories} />
    </Suspense>
  )
}
