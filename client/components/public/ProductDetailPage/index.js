// components/public/ProductDetail/index.js
import ProductGallery from "./ProductGallery";
import AddToCartForm from "./AddToCartForm";
import ProductAccordions from "./ProductAccordions";
import { StarIcon } from "@phosphor-icons/react/dist/ssr/Star";

export default function ProductDetail({ product }) {
  return (
    <section className="w-full bg-white pb-20 pt-10">
      {/* 1. CONTENEDOR MÁS PEQUEÑO: Cambiamos max-w-7xl por max-w-6xl */}
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* 2. ESPACIADO REDUCIDO: Cambiamos gap-24 por gap-16 para acercar la foto al texto */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Columna Izquierda: Galería (Sticky) */}
          <div className="w-full lg:w-[55%]">
            <div className="lg:sticky lg:top-28">
              {/* Pasamos el objeto completo para que el Badge de descuento funcione */}
              <ProductGallery product={product} />
            </div>
          </div>

          {/* Columna Derecha: Información */}
          <div className="w-full lg:w-[45%] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-black">
                <StarIcon weight="fill" size={14} />
                <StarIcon weight="fill" size={14} />
                <StarIcon weight="fill" size={14} />
                <StarIcon weight="fill" size={14} />
                <StarIcon weight="fill" size={14} />
              </div>
              <span className="text-[10px] underline tracking-widest uppercase opacity-60">
                12 reseñas
              </span>
            </div>

            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40 mb-2">
              {product.brand || "Sbeltic Skincare"}
            </p>

            {/* 3. TIPOGRAFÍA AJUSTADA: Redujimos ligeramente el tamaño del título de 5xl a 4xl */}
            <h1
              className="text-3xl md:text-4xl font-light leading-tight mb-4"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--pub-text)",
              }}
            >
              {product.name}
            </h1>

            {/* 4. TEXTO DESCRIPTIVO: Redujimos márgenes inferiores (mb-8 a mb-6) */}
            <p className="text-sm md:text-base font-light leading-relaxed text-black/70 mb-6">
              {product.shortDescription ||
                product.description?.slice(0, 160) + "..."}
            </p>

            <AddToCartForm product={product} />
            <ProductAccordions product={product} />
          </div>
        </div>
      </div>
    </section>
  );
}
