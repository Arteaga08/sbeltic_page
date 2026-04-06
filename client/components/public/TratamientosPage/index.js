"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  Funnel,
  SlidersHorizontal,
} from "@phosphor-icons/react/dist/ssr";
import BookingBanner from "@/components/public/home/shared/BookingBanner";
import InfiniteCarousel from "@/components/public/home/shared/InfiniteCarousel";
import CollectionHeader from "./CollectionHeader";
import CategoryNav from "./CategoryNav";
import FilterSidebar from "./FilterSidebar";
import MobileFilterPanel from "./MobileFilterPanel";
import TreatmentCard from "./TreatmentCard";
import Pagination from "./Pagination";

const TREATMENTS_PER_PAGE = 20;

export default function TratamientosPage({
  initialTreatments = [],
  categories = [],
}) {
  const searchParams = useSearchParams();
  const initialCategory = (() => {
    const slug = searchParams.get("categoria");
    if (!slug) return "todos";
    const match = categories.find((c) => c.slug === slug);
    return match ? match._id : "todos";
  })();

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [filters, setFilters] = useState({
    targetAreas: [],
    skinTypes: [],
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState({
    targetArea: true,
    skinType: true,
  });
  const [page, setPage] = useState(1);
  const gridRef = useRef(null);

  const activeFilterCount =
    filters.targetAreas.length + filters.skinTypes.length;

  const filteredTreatments = useMemo(() => {
    return initialTreatments.filter((t) => {
      if (activeCategory !== "todos" && t.category?._id !== activeCategory)
        return false;
      if (
        filters.targetAreas.length &&
        !filters.targetAreas.some((a) => t.targetAreas?.includes(a))
      )
        return false;
      if (
        filters.skinTypes.length &&
        !filters.skinTypes.some((s) => t.skinTypes?.includes(s))
      )
        return false;
      return true;
    });
  }, [initialTreatments, activeCategory, filters]);

  useEffect(() => {
    setPage(1);
  }, [activeCategory, filters]);

  const totalPages = Math.ceil(filteredTreatments.length / TREATMENTS_PER_PAGE);
  const paginatedTreatments = filteredTreatments.slice(
    (page - 1) * TREATMENTS_PER_PAGE,
    page * TREATMENTS_PER_PAGE,
  );

  function handlePageChange(newPage) {
    setPage(newPage);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const activeCategoryObj =
    activeCategory !== "todos"
      ? (categories.find((c) => c._id === activeCategory) ?? null)
      : null;

  return (
    <div style={{ background: "var(--pub-accent-light)", minHeight: "100vh" }}>
      <CollectionHeader
        category={activeCategoryObj}
        fallbackTitle="Todos los Tratamientos"
      />

      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onSelect={(id) => {
          setActiveCategory(id);
          setFilters({ targetAreas: [], skinTypes: [] });
        }}
      />

      {/* Barra de filtros móvil */}
      <div className="md:hidden flex items-center gap-3 px-6 py-4">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-widest uppercase cursor-pointer border border-black/20 transition-all duration-200 hover:bg-black/4 hover:border-black/35 active:bg-black/8 active:scale-[0.97]"
          style={{ color: "var(--pub-text)", background: "transparent" }}
        >
          Filtrar / Ordenar
          {activeFilterCount > 0 && (
            <span
              className="w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-bold ml-1"
              style={{ background: "var(--pub-text)", color: "#fff" }}
            >
              {activeFilterCount}
            </span>
          )}
        </button>
        <span
          className="text-[11px] uppercase tracking-widest ml-auto"
          style={{ color: "var(--pub-text-muted)" }}
        >
          {filteredTreatments.length} tratamientos
        </span>
      </div>

      <MobileFilterPanel
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      >
        <FilterSidebar
          treatments={initialTreatments}
          filters={filters}
          setFilters={setFilters}
          accordionOpen={accordionOpen}
          setAccordionOpen={setAccordionOpen}
        />
      </MobileFilterPanel>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="flex gap-12 lg:gap-16">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <FilterSidebar
              treatments={initialTreatments}
              filters={filters}
              setFilters={setFilters}
              accordionOpen={accordionOpen}
              setAccordionOpen={setAccordionOpen}
            />
          </aside>

          {/* Grid de tratamientos */}
          <div className="flex-1" ref={gridRef}>
            <div className="hidden md:flex justify-end mb-8">
              <span
                className="text-[11px] uppercase tracking-widest"
                style={{ color: "var(--pub-text-muted)" }}
              >
                {filteredTreatments.length} tratamientos
              </span>
            </div>

            {paginatedTreatments.length > 0 ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16">
                  {paginatedTreatments.map((treatment) => (
                    <TreatmentCard key={treatment._id} treatment={treatment} />
                  ))}
                </div>
                <Pagination
                  page={page}
                  pages={totalPages}
                  total={filteredTreatments.length}
                  perPage={TREATMENTS_PER_PAGE}
                  onChange={handlePageChange}
                />
              </>
            ) : (
              <div className="py-32 text-center flex flex-col items-center">
                <SlidersHorizontal
                  size={48}
                  weight="light"
                  style={{ color: "var(--pub-border)", marginBottom: "24px" }}
                />
                <p
                  className="text-xl font-light mb-2"
                  style={{
                    color: "var(--pub-text)",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  No se encontraron tratamientos
                </p>
                <p
                  className="text-sm font-light"
                  style={{ color: "var(--pub-text-muted)" }}
                >
                  Intenta ajustar los filtros o seleccionar otra categoría.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <InfiniteCarousel />
      <BookingBanner />
      
    </div>
  );
}
