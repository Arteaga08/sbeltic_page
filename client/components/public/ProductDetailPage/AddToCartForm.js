// components/public/ProductDetail/AddToCartForm.js
"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react/dist/ssr/Plus";
import { Minus } from "@phosphor-icons/react/dist/ssr/Minus";

export default function AddToCartForm({ product }) {
  const [quantity, setQuantity] = useState(1);
  const price = product?.price || 0;

  return (
    <div className="flex flex-col md:flex-row gap-3 mt-8 w-full">
      {/* Selector de cantidad */}
      <div className="flex items-center border border-black/20 rounded-full h-12 w-full md:w-32 shrink-0">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-10 h-full flex justify-center items-center hover:bg-black/5 rounded-l-full transition-colors"
          aria-label="Disminuir cantidad"
        >
          <Minus size={14} weight="bold" />
        </button>
        <span className="flex-1 text-center text-sm font-medium">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="w-10 h-full flex justify-center items-center hover:bg-black/5 rounded-r-full transition-colors"
          aria-label="Aumentar cantidad"
        >
          <Plus size={14} weight="bold" />
        </button>
      </div>

      {/* Botón Añadir al Carrito */}
      <button
        className="flex-1 h-12 rounded-full font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase text-white transition-transform active:scale-[0.98]"
        style={{ backgroundColor: "var(--pub-accent)" }}
      >
        Añadir al carrito — ${(price * quantity).toLocaleString("es-MX")} MXN
      </button>
    </div>
  );
}
