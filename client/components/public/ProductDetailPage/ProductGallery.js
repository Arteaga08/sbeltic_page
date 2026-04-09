// components/public/ProductDetail/ProductGallery.js
"use client";

import { useState } from "react";
import Image from "next/image";

import { BASE_URL } from "../ProductsPage/constants";

export default function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Mapeo de imágenes con la URL del backend
  const images = product?.images || [];
  const galleryImages =
    images.length > 0
      ? images.map((img) =>
          img.startsWith("http") ? img : `${BASE_URL}${img}`,
        )
      : ["/placeholder-product.jpg"];

  // Lógica para el badge: Solo se muestra si compareAtPrice es mayor que el precio actual
  const price = product?.price || 0;
  const compareAtPrice = product?.compareAtPrice || 0;
  const hasDiscount = compareAtPrice > price;

  // Calcula el porcentaje exacto de descuento
  const discountPercentage = hasDiscount
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Imagen Principal */}
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-[#f9f9f9] border border-black/5">
        {/* ── BADGE DE DESCUENTO ── */}
        {hasDiscount && (
          <div
            className="absolute top-4 right-4 z-10 text-white text-[11px] font-semibold tracking-widest px-3 py-1.5 rounded-full uppercase shadow-md"
            style={{ backgroundColor: "var(--pub-text)" }} // Usamos el color oscuro para un contraste elegante
          >
            -{discountPercentage}% OFF
          </div>
        )}

        <Image
          src={galleryImages[selectedImage]}
          alt={product?.name || "Producto Sbeltic"}
          fill
          className="object-cover transition-opacity duration-500"
          unoptimized
          priority
        />
      </div>

      {/* Miniaturas */}
      {galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative w-20 h-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 active:scale-[0.95] ${
                selectedImage === idx
                  ? "border-(--pub-accent)"
                  : "border-transparent opacity-70 hover:opacity-100 hover:border-(--pub-border)"
              }`}
            >
              <Image
                src={img}
                alt={`${product?.name} miniatura ${idx}`}
                fill
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
