import SectionEyebrow from "@/components/public/home/shared/SectionEyebrow";
import GoldDivider from "@/components/public/home/shared/GoldDivider";
import ProductCard from "@/components/public/ProductosPage/ProductCard";

export default function RelatedProductsSection({ products }) {
  // Aseguramos mostrar máximo 3 productos para no alargar la página
  const displayProducts = products?.slice(0, 3);

  if (!displayProducts?.length) return null;

  return (
    <section
      // 6. REDUJIMOS ALTURA: Cambiamos py-24 md:py-32 a py-12 md:py-16
      className="w-full py-12 md:py-16"
      style={{ background: "var(--pub-accent-light)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-10">
          {" "}
          {/* mb-14 a mb-10 */}
          <SectionEyebrow variant="gold" className="mb-4">
            También te puede interesar
          </SectionEyebrow>
          <h2
            className="font-bold uppercase leading-tight mb-5"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--pub-text)",
              fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
            }}
          >
            Productos{" "}
            <span style={{ color: "var(--pub-accent)" }}>relacionados</span>
          </h2>
          <GoldDivider size="sm" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
