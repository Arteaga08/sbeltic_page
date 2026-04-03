// app/(public)/productos/[slug]/page.jsx
import ProductDetail from "@/components/public/ProductDetailPage";
import { notFound } from "next/navigation";

async function getProduct(slug) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const res = await fetch(`${baseUrl}/api/products/${slug}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return { title: "Producto no encontrado | Sbeltic" };

  return {
    title: `${product.name} | Sbeltic Skincare`,
    description:
      product.shortDescription ||
      "Descubre nuestra línea de productos profesionales.",
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    // LA SOLUCIÓN: Agregamos pt-28 (112px) o pt-32 (128px)
    // para empujar todo el contenido hacia abajo, librando el Navbar.
    <main className="min-h-screen bg-white pt-28 md:pt-36">
      <ProductDetail product={product} />
    </main>
  );
}
