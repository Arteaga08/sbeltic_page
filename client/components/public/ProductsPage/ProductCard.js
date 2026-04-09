import Image from "next/image";
import Link from "next/link";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { BASE_URL, WA_NUMBER } from "./constants";

export default function ProductCard({ product }) {
  const imgSrc = product.images?.[0] ? `${BASE_URL}${product.images[0]}` : null;
  const imgSrc2 = product.images?.[1]
    ? `${BASE_URL}${product.images[1]}`
    : null;

  const waMessage = encodeURIComponent(
    `Hola, me interesa el producto: ${product.name}${product.price ? ` ($${product.price.toLocaleString("es-MX")} MXN)` : ""}`,
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  return (
    <div
      className="group flex flex-col transition-shadow duration-200 hover:shadow-md pb-2"
      style={{
        background: "var(--pub-surface)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      {/* Image */}
      <Link
        href={`/productos/${product.slug}`}
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "4/5",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
          background: "var(--pub-cream)",
        }}
      >
        {imgSrc ? (
          <>
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              unoptimized
              className={`object-cover transition-opacity duration-500 ${imgSrc2 ? "group-hover:opacity-0" : ""}`}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {imgSrc2 && (
              <Image
                src={imgSrc2}
                alt={`${product.name} - 2`}
                fill
                unoptimized
                className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            )}
          </>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-sm font-medium"
            style={{ color: "var(--pub-text-muted)" }}
          >
            Sin imagen
          </div>
        )}
        {/* Discount badge */}
        {product.compareAtPrice > product.price && (
          <span
            className="absolute top-3 right-3 text-xs md:text-sm font-semibold rounded-full leading-none z-10 shadow-sm"
            style={{
              background: "var(--pub-accent-light)",
              color: "var(--pub-accent)",
              padding: "6px 12px",
            }}
          >
            −{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="px-4 pt-4 pb-3 flex flex-col gap-1.5 flex-1">
        <p
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "var(--pub-text-muted)" }}
        >
          {product.brand || "Sbeltic"}
        </p>
        <Link
          href={`/productos/${product.slug}`}
          className="text-base md:text-lg font-semibold leading-snug hover:opacity-80 transition-opacity duration-200"
          style={{
            color: "var(--pub-text)",
            fontFamily: "var(--font-heading)",
          }}
        >
          {product.name}
        </Link>
        {product.shortDescription && (
          <p
            className="text-sm leading-relaxed line-clamp-2 mt-0.5"
            style={{ color: "var(--pub-text-muted)" }}
          >
            {product.shortDescription}
          </p>
        )}
        {product.price != null && (
          <div
            className="flex items-center gap-2 flex-wrap mt-2"
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
              className="text-base md:text-lg font-bold"
              style={{ color: "var(--pub-accent)" }}
            >
              ${product.price.toLocaleString("es-MX")} MXN
            </span>
          </div>
        )}
      </div>

      {/* WhatsApp CTA */}
      <div className="px-4 pb-4 mt-auto">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn flex items-center justify-center gap-2.5 w-full py-3.5 px-2 text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase cursor-pointer transition-all duration-200 bg-(--pub-accent) hover:bg-(--pub-accent-hover) hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97] active:shadow-none"
          style={{
            color: "#fff",
            borderRadius: "var(--radius-md)",
          }}
        >
          <WhatsappLogo
            size={16}
            weight="regular"
            className="shrink-0 transition-transform group-hover/btn:scale-110"
          />
          <span className="pl-1 truncate">Pedir por WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
