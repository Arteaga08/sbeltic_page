import { notFound } from "next/navigation";
import { publicTreatments } from "@/lib/api-public";
import TreatmentDetail from "@/components/public/TreatmentDetail";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await publicTreatments.get(slug);
  if (!res?.data) return {};

  const t = res.data;
  const ogImage = t.images?.[0] ? `${BASE_URL}${t.images[0]}` : undefined;

  return {
    title: `${t.name} — Sbeltic`,
    description: t.shortDescription || t.description?.slice(0, 160),
    openGraph: {
      title: t.name,
      description: t.shortDescription,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function TreatmentPage({ params }) {
  const { slug } = await params;

  const [res, allRes] = await Promise.all([
    publicTreatments.get(slug),
    publicTreatments.list({ active: true, limit: 10 }),
  ]);

  if (!res?.success || !res?.data) notFound();

  const treatment = res.data;
  const related = (allRes?.data ?? [])
    .filter((t) => t.slug !== slug && t.category?._id === treatment.category?._id)
    .slice(0, 3);

  // Si no hay suficientes de la misma categoría, completar con otros
  const fallback = related.length < 3
    ? (allRes?.data ?? [])
        .filter((t) => t.slug !== slug && !related.find((r) => r._id === t._id))
        .slice(0, 3 - related.length)
    : [];

  return <TreatmentDetail treatment={treatment} related={[...related, ...fallback]} />;
}
