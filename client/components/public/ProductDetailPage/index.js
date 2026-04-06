// components/public/ProductDetail/index.js
import ProductGallery from "./ProductGallery";
import AddToCartForm from "./AddToCartForm";
import ProductAccordions from "./ProductAccordions";
import RelatedProductsSection from "./RelatedProductsSection";
import InfiniteCarousel from "@/components/public/home/shared/InfiniteCarousel";
import { StarIcon } from "@phosphor-icons/react/dist/ssr/Star";

export default function ProductDetail({ product, relatedProducts }) {
  return (
    <>
      {/* Ajustamos el padding top en móvil para que no choque con el Navbar */}
      <section className="w-full pb-20 pt-8 md:pt-12 bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          {/* Cambiamos gap-12 a gap-10 en móvil, y alineamos arriba (items-start) */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* 1. GALERÍA MÁS PEQUEÑA: En desktop toma el 50%. En móvil le pusimos un max-w-md para que no sea gigante */}
            <div className="w-full lg:w-[50%] max-w-md mx-auto lg:max-w-none">
              <div className="lg:sticky lg:top-28">
                <ProductGallery product={product} />
              </div>
            </div>

            {/* Columna Derecha: Información (Aumenta a 50%) */}
            <div className="w-full lg:w-[50%] flex flex-col mt-4 lg:mt-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex" style={{ color: "var(--pub-gold)" }}>
                  <StarIcon weight="fill" size={16} />
                  <StarIcon weight="fill" size={16} />
                  <StarIcon weight="fill" size={16} />
                  <StarIcon weight="fill" size={16} />
                  <StarIcon weight="fill" size={16} />
                </div>
              </div>

              {/* Aumentamos texto de la marca */}
              <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-black/40 mb-3">
                {product.brand || "Sbeltic Skincare"}
              </p>

              {/* 2. TÍTULO MÁS GRANDE */}
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-5"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--pub-text)",
                }}
              >
                {product.name}
              </h1>

              {/* 3. TEXTO DESCRIPTIVO MÁS GRANDE */}
              <p className="text-base md:text-lg font-light leading-relaxed text-black/70 mb-8">
                {product.shortDescription ||
                  product.description?.slice(0, 160) + "..."}
              </p>

              <AddToCartForm product={product} />
              <ProductAccordions product={product} />
            </div>
          </div>
        </div>
      </section>
      <InfiniteCarousel />
      <RelatedProductsSection products={relatedProducts} />
    </>
  );
}
