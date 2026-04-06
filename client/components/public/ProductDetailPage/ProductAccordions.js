"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr/CaretDown";

function AccordionItem({ title, content, isOpen, onClick }) {
  // Si no hay contenido o el arreglo está vacío, no renderizamos el acordeón
  if (!content || (Array.isArray(content) && content.length === 0)) return null;

  return (
    <div className="border-b border-black/10">
      <button
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left focus:outline-none transition-colors duration-200 hover:bg-black/3 active:bg-black/6 rounded-sm px-1 -mx-1"
      >
        <span
          className="text-sm md:text-base font-light tracking-wide"
          style={{ color: "var(--pub-text)" }}
        >
          {title}
        </span>
        <span
          className="text-black/50 ml-4 shrink-0 transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          {/* Cambiamos al icono de flecha tipo Skinpharm */}
          <CaretDown size={18} weight="light" />
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-200 opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        <div className="font-light leading-relaxed text-black/70 text-sm md:text-base">
          {Array.isArray(content) ? (
            <ul className="list-disc pl-5 space-y-3">
              {content.map((item, idx) => (
                <li key={idx}>
                  {/* Validamos si es un 'keyIngredient' (objeto) o un 'bestFor' (string) */}
                  {typeof item === "object" && item.name ? (
                    <>
                      <strong className="font-medium text-black">
                        {item.name}
                      </strong>
                      {item.description ? `: ${item.description}` : ""}
                    </>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="whitespace-pre-wrap">{content}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductAccordions({ product }) {
  const [openSection, setOpenSection] = useState(null);

  if (!product) return null;

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="w-full flex flex-col mt-10 border-t border-black/10">
      <AccordionItem
        title="Recomendado para"
        content={product.bestFor}
        isOpen={openSection === "bestFor"}
        onClick={() => toggleSection("bestFor")}
      />

      {/* También incluimos Modo de Uso clásico por si acaso */}
      <AccordionItem
        title="Modo de uso"
        content={product.howToUse}
        isOpen={openSection === "howToUse"}
        onClick={() => toggleSection("howToUse")}
      />

      <AccordionItem
        title="Uso en clínica"
        content={product.howWeUseIt}
        isOpen={openSection === "howWeUseIt"}
        onClick={() => toggleSection("howWeUseIt")}
      />

      <AccordionItem
        title="Ingredientes clave"
        // Le pasamos el arreglo de objetos directamente
        content={product.keyIngredients}
        isOpen={openSection === "keyIngredients"}
        onClick={() => toggleSection("keyIngredients")}
      />

      <AccordionItem
        title="Ingredientes"
        content={product.ingredients}
        isOpen={openSection === "ingredients"}
        onClick={() => toggleSection("ingredients")}
      />
    </div>
  );
}
