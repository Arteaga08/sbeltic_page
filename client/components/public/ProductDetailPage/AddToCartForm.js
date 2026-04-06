// components/public/ProductDetail/AddToCartForm.js
"use client";

import { useState } from "react";
import { Plus } from "@phosphor-icons/react/dist/ssr/Plus";
import { Minus } from "@phosphor-icons/react/dist/ssr/Minus";

export default function AddToCartForm({ product }) {
  const [quantity, setQuantity] = useState(1);
  const price = product?.price || 0;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
      {/* Selector de cantidad (Aseguramos altura de 56px) */}
      <div className="flex items-center border border-black/20 rounded-full h-14 min-h-14 w-full sm:w-36 shrink-0">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-12 h-full flex justify-center items-center rounded-l-full transition-all duration-200 hover:bg-black/5 active:bg-black/10"
          aria-label="Disminuir cantidad"
        >
          <Minus size={16} weight="bold" />
        </button>
        <span className="flex-1 text-center text-base font-medium">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="w-12 h-full flex justify-center items-center rounded-r-full transition-all duration-200 hover:bg-black/5 active:bg-black/10"
          aria-label="Aumentar cantidad"
        >
          <Plus size={16} weight="bold" />
        </button>
      </div>

      {/* Botón Añadir al Carrito (Blindado para que NO se haga delgado) */}
      <button className="w-full sm:flex-1 h-14 min-h-14 shrink-0 rounded-full font-bold text-xs md:text-sm tracking-[0.2em] uppercase text-white transition-all duration-200 bg-(--pub-accent) hover:bg-(--pub-accent-hover) hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97] active:shadow-none active:translate-y-0">
        Añadir al carrito — ${(price * quantity).toLocaleString("es-MX")} MXN
      </button>
    </div>
  );
}
