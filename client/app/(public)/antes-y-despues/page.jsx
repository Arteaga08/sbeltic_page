import { Suspense } from "react";
import { publicCategories, publicTreatments } from "@/lib/api-public";
import BeforeAfterPage from "@/components/public/BeforeAfterPage";

export const metadata = {
  title: "Antes y Después — Sbeltic",
  description:
    "Descubre los resultados reales de nuestros tratamientos estéticos. Galería de antes y después organizada por categoría.",
};

export default async function AntesYDespuesRoute() {
  const [categoriesRes, treatmentsRes] = await Promise.all([
    publicCategories.list({ type: "treatment", active: true }),
    publicTreatments.list({ active: true, limit: 200 }),
  ]);

  const categories = categoriesRes.data ?? [];
  // Solo tratamientos que tienen imágenes de antes/después
  const treatments = (treatmentsRes.data ?? []).filter(
    (t) => t.beforeImages?.length > 0 && t.afterImages?.length > 0
  );

  return (
    <Suspense>
      <BeforeAfterPage categories={categories} treatments={treatments} />
    </Suspense>
  );
}
