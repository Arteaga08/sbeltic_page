import { useMemo } from "react";
import { getUniqueValues, toggleArrayItem } from "./helpers";
import FilterAccordion from "./FilterAccordion";

export default function FilterSidebar({
  treatments,
  filters,
  setFilters,
  accordionOpen,
  setAccordionOpen,
}) {
  const targetAreas = useMemo(
    () => getUniqueValues(treatments, "targetAreas"),
    [treatments],
  );
  const skinTypes = useMemo(
    () => getUniqueValues(treatments, "skinTypes"),
    [treatments],
  );

  const hasActiveFilters =
    filters.targetAreas.length > 0 || filters.skinTypes.length > 0;

  function clearAll() {
    setFilters({ targetAreas: [], skinTypes: [] });
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
            className="text-[11px] uppercase tracking-widest font-medium cursor-pointer transition-all duration-200 underline hover:text-(--pub-text) active:scale-[0.97]"
            style={{ color: "var(--pub-text-muted)" }}
          >
            Limpiar
          </button>
        )}
      </div>

      {targetAreas.length > 0 && (
        <FilterAccordion
          title="Zona de Tratamiento"
          items={targetAreas}
          selected={filters.targetAreas}
          onToggle={(item) =>
            setFilters((prev) => ({
              ...prev,
              targetAreas: toggleArrayItem(prev.targetAreas, item),
            }))
          }
          isOpen={accordionOpen.targetArea}
          onToggleOpen={() =>
            setAccordionOpen((prev) => ({
              ...prev,
              targetArea: !prev.targetArea,
            }))
          }
        />
      )}

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
            setAccordionOpen((prev) => ({
              ...prev,
              skinType: !prev.skinType,
            }))
          }
        />
      )}
    </div>
  );
}
