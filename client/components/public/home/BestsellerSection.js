import Link from "next/link";
import Image from "next/image";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import SectionEyebrow from "./shared/SectionEyebrow";
import SectionHeading from "./shared/SectionHeading";
import GoldDivider from "./shared/GoldDivider";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function BestsellerSection({ product }) {
  if (!product) return null;

  const imgSrc = product.images?.[0] ? `${BASE_URL}${product.images[0]}` : null;
  const imgSrc2 = product.images?.[1]
    ? `${BASE_URL}${product.images[1]}`
    : null;
  const lifestyleImg = product.images?.[2]
    ? `${BASE_URL}${product.images[2]}`
    : imgSrc2 || "/images/bestseller-lifestyle.jpg";

  return (
    <section className="flex flex-col-reverse md:flex-row">
      {/* Panel izquierdo — producto */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-5 py-10 md:px-10 md:py-12 gap-6"
        style={{ background: "var(--pub-surface)" }}
      >
        {/* Título estilizado (Ampliamos un poco el contenedor para que respire el texto grande) */}
        <div className="w-full max-w-70 md:max-w-75 flex flex-col gap-3">
          <SectionEyebrow variant="gold">
            Selección del especialista
          </SectionEyebrow>
          {/* TÍTULO MÁS GRANDE EN MÓVIL */}
          <SectionHeading
            lightText="Nuestro"
            boldText="Bestseller"
            sizeClasses="text-3xl md:text-4xl"
            break
          />
          <GoldDivider size="sm" centered={false} />
          {/* TEXTO DESCRIPTIVO MÁS GRANDE */}
          <p
            className="text-xs md:text-sm leading-relaxed"
            style={{ color: "var(--pub-text-muted)" }}
          >
            Recomendado por nuestros expertos en cuidado de la piel
          </p>
        </div>

        {/* Tarjeta producto */}
        <div
          className="group w-full max-w-70 md:max-w-75 flex flex-col"
          style={{
            background: "var(--pub-surface)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {/* Imagen con hover swap */}
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "4/5", background: "var(--pub-cream)" }}
          >
            {imgSrc ? (
              <>
                <Image
                  src={imgSrc}
                  alt={product.name}
                  fill
                  unoptimized
                  className={`object-cover transition-opacity duration-500 ${imgSrc2 ? "group-hover:opacity-0" : ""}`}
                  sizes="(max-width: 768px) 280px, 300px"
                />
                {imgSrc2 && (
                  <Image
                    src={imgSrc2}
                    alt={`${product.name} - 2`}
                    fill
                    unoptimized
                    className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    sizes="(max-width: 768px) 280px, 300px"
                  />
                )}
              </>
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-xs"
                style={{ color: "var(--pub-text-muted)" }}
              >
                Sin imagen
              </div>
            )}
            {product.compareAtPrice > product.price && (
              <span
                className="absolute top-2.5 right-2.5 text-[10px] font-semibold rounded-full leading-none z-10 shadow-sm"
                style={{
                  background: "var(--pub-accent)",
                  color: "#fff",
                  padding: "5px 10px",
                  letterSpacing: "0.04em",
                }}
              >
                −
                {Math.round((1 - product.price / product.compareAtPrice) * 100)}
                %
              </span>
            )}
          </div>

          {/* Info de la tarjeta */}
          <div className="px-4 py-3.5 flex flex-col gap-1">
            {/* MARCA MÁS GRANDE */}
            <p
              className="text-[11px] font-semibold tracking-widest uppercase"
              style={{ color: "var(--pub-text-muted)" }}
            >
              {product.brand || "Sbeltic"}
            </p>
            {/* NOMBRE MÁS GRANDE */}
            <p
              className="text-base md:text-lg font-semibold leading-tight truncate"
              style={{
                color: "var(--pub-text)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {product.name}
            </p>
            {/* PRECIO MÁS GRANDE */}
            {product.price != null && (
              <div
                className="flex items-center gap-2 flex-wrap mt-1"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {product.compareAtPrice > product.price && (
                  <span
                    className="text-xs line-through"
                    style={{ color: "var(--pub-text-muted)" }}
                  >
                    ${product.compareAtPrice.toLocaleString("es-MX")}
                  </span>
                )}
                <span
                  className="text-sm md:text-base font-bold"
                  style={{ color: "var(--pub-accent)" }}
                >
                  ${product.price.toLocaleString("es-MX")} MXN
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Beneficios - Textos ampliados */}
        {product.benefits?.length > 0 && (
          <ul
            className="w-full max-w-70 md:max-w-75 flex flex-col gap-2 text-xs md:text-sm"
            style={{ color: "var(--pub-text-muted)" }}
          >
            {product.benefits.slice(0, 3).map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircleIcon
                  size={16}
                  weight="fill"
                  style={{
                    color: "var(--pub-accent)",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                />
                <span className="leading-tight">{b}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Botón más amigable para el dedo (más alto y letra más grande) */}
        <Link
          href={`/productos/${product.slug}`}
          className="w-full max-w-70 md:max-w-75 text-center py-3.5 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-200 hover:bg-(--pub-accent-hover) hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97] active:shadow-none"
          style={{ background: "var(--pub-accent)", color: "#fff" }}
        >
          Ver producto
        </Link>
      </div>

      {/* Panel derecho — IMAGEN LIFESTYLE MÁS ALTA EN MÓVIL (h-72 en lugar de h-40) */}
      <div
        className="shrink-0 relative h-72 md:h-auto md:flex-1"
        style={{ background: "var(--pub-text)" }}
      >
        <Image
          src={lifestyleImg}
          alt={`${product.name} — Sbeltic`}
          fill
          unoptimized
          className="object-cover opacity-80"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Texto sobre imagen */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-6 md:p-10"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
          }}
        >
          {/* CATEGORÍA MÁS GRANDE */}
          <p
            className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-2"
            style={{ color: "var(--pub-accent)" }}
          >
            Destacado
          </p>
          {/* TÍTULO MÁS GRANDE */}
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {product.shortDescription || product.name}
          </h2>
        </div>
      </div>
    </section>
  );
}
