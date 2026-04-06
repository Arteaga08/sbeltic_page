// app/(public)/productos/[slug]/page.jsx
import ProductDetail from "@/components/public/ProductDetailPage";
import { publicProducts } from "@/lib/api-public";
import { notFound } from "next/navigation";
import BookingBanner from "@/components/public/home/shared/BookingBanner";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await publicProducts.get(slug);

  if (!res?.data) return { title: "Producto no encontrado | Sbeltic" };

  const p = res.data;
  const ogImage = p.images?.[0] ? `${BASE_URL}${p.images[0]}` : undefined;

  return {
    title: `${p.name} | Sbeltic Skincare`,
    description:
      p.shortDescription || "Descubre nuestra línea de productos profesionales.",
    openGraph: {
      title: p.name,
      description: p.shortDescription,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const [res, allRes] = await Promise.all([
    publicProducts.get(slug),
    publicProducts.list({ active: true, limit: 20 }),
  ]);

  if (!res?.success || !res?.data) {
    notFound();
  }

  const product = res.data;

  const related = (allRes?.data ?? [])
    .filter((p) => p.slug !== slug && p.category?._id === product.category?._id)
    .slice(0, 3);

  const fallback =
    related.length < 3
      ? (allRes?.data ?? [])
          .filter(
            (p) => p.slug !== slug && !related.find((r) => r._id === p._id)
          )
          .slice(0, 3 - related.length)
      : [];

  const relatedProducts = [...related, ...fallback];

  return (
    <main className="min-h-screen pt-28 md:pt-36" style={{ background: "var(--pub-accent-light)" }}>
      <ProductDetail product={product} relatedProducts={relatedProducts} />
 
      <BookingBanner />
    </main>
  );
}
