import { notFound } from "next/navigation";
import { publicTreatments } from "@/lib/api-public";
import AntesYDespuesDetail from "@/components/public/AntesYDespuesDetail";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await publicTreatments.get(slug);
  if (!res?.data) return {};

  const t = res.data;
  const ogImage = t.beforeImages?.[0]
    ? `${BASE_URL}${t.beforeImages[0]}`
    : t.images?.[0]
      ? `${BASE_URL}${t.images[0]}`
      : undefined;

  return {
    title: `Antes y Después: ${t.name} — Sbeltic`,
    description:
      t.shortDescription ||
      `Resultados reales del tratamiento ${t.name}`,
    openGraph: {
      title: `Antes y Después: ${t.name}`,
      description: t.shortDescription,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function AntesYDespuesSlugPage({ params }) {
  const { slug } = await params;
  const res = await publicTreatments.get(slug);

  if (!res?.success || !res?.data) notFound();

  const treatment = res.data;

  if (!treatment.beforeImages?.length || !treatment.afterImages?.length) {
    notFound();
  }

  return <AntesYDespuesDetail treatment={treatment} />;
}
