import { useMemo } from "react";
import { getUniqueValues, toggleArrayItem } from "./helpers";
import FilterAccordion from "./FilterAccordion";

export default function FilterSidebar({
  products,
  filters,
  setFilters,
  accordionOpen,
  setAccordionOpen,
}) {
  const skinTypes = useMemo(
    () => getUniqueValues(products, "skinTypes"),
    [products],
  );
  const brands = useMemo(() => getUniqueValues(products, "brand"), [products]);
  const concerns = useMemo(
    () => getUniqueValues(products, "skinConcerns"),
    [products],
  );

  const hasActiveFilters =
    filters.skinTypes.length > 0 ||
    filters.brands.length > 0 ||
    filters.concerns.length > 0;

  function clearAll() {
    setFilters({ skinTypes: [], brands: [], concerns: [] });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 border-b border-black/10 pb-4">
        <h3
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "var(--pub-text)" }}
        >
          Filtrar por
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-[11px] uppercase tracking-widest font-medium cursor-pointer transition-colors duration-200 underline"
            style={{ color: "var(--pub-text-muted)" }}
          >
            Limpiar
          </button>
        )}
      </div>

      {skinTypes.length > 0 && (
        <FilterAccordion
          title="Tipo de Piel"
          items={skinTypes}
          selected={filters.skinTypes}
          onToggle={(item) =>
            setFilters((prev) => ({
              ...prev,
              skinTypes: toggleArrayItem(prev.skinTypes, item),
            }))
          }
          isOpen={accordionOpen.skinType}
          onToggleOpen={() =>
            setAccordionOpen((prev) => ({ ...prev, skinType: !prev.skinType }))
          }
        />
      )}

      {brands.length > 0 && (
        <FilterAccordion
          title="Marca"
          items={brands}
          selected={filters.brands}
          onToggle={(item) =>
            setFilters((prev) => ({
              ...prev,
              brands: toggleArrayItem(prev.brands, item),
            }))
          }
          isOpen={accordionOpen.brand}
          onToggleOpen={() =>
            setAccordionOpen((prev) => ({ ...prev, brand: !prev.brand }))
          }
        />
      )}

      {concerns.length > 0 && (
        <FilterAccordion
          title="Preocupación"
          items={concerns}
          selected={filters.concerns}
          onToggle={(item) =>
            setFilters((prev) => ({
              ...prev,
              concerns: toggleArrayItem(prev.concerns, item),
            }))
          }
          isOpen={accordionOpen.concern}
          onToggleOpen={() =>
            setAccordionOpen((prev) => ({ ...prev, concern: !prev.concern }))
          }
        />
      )}
    </div>
  );
}
