import Link from "next/link";
import GalleryHero from "./GalleryHero";
import SectionEyebrow from "@/components/public/home/shared/SectionEyebrow";
import GoldDivider from "@/components/public/home/shared/GoldDivider";
import BookingBanner from "@/components/public/home/shared/BookingBanner";

export default function BeforeAfterPage({ categories, treatments }) {
  // Agrupar tratamientos por categoría
  const treatmentsByCategory = {};
  treatments.forEach((t) => {
    const catId = t.category?._id;
    if (!catId) return;
    if (!treatmentsByCategory[catId]) treatmentsByCategory[catId] = [];
    treatmentsByCategory[catId].push(t);
  });

  // Solo categorías que tienen al menos un tratamiento con beforeAfterImages
  const activeCategories = categories.filter(
    (c) => treatmentsByCategory[c._id]?.length > 0,
  );

  return (
    <>
      <GalleryHero />

      <section
        className="w-full py-24 md:py-32"
        style={{ background: "var(--pub-accent-light)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          {/* Encabezado de sección */}
         

          {/* Estado vacío */}
          {activeCategories.length === 0 && (
            <p
              className="text-center font-light"
              style={{
                color: "var(--pub-text-muted)",
                fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
              }}
            >
              Pronto tendremos resultados para mostrar.
            </p>
          )}

          {/* Grid de categorías */}
          {activeCategories.length > 0 && (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-b"
              style={{ borderColor: "var(--pub-gold-light)" }}
            >
              {activeCategories.map((cat) => (
                <div
                  key={cat._id}
                  className="flex flex-col items-center text-center px-8 md:px-12 py-12 md:py-16 border-b sm:border-b-0 sm:border-l last:border-b-0 first:border-l-0"
                  style={{ borderColor: "var(--pub-gold-light)" }}
                >
                  {/* Nombre de categoría */}
                  <h3
                    className="font-light tracking-[0.08em] uppercase mb-8"
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                      color: "var(--pub-text)",
                    }}
                  >
                    {cat.name}
                  </h3>

                  {/* Lista de tratamientos */}
                  <ul className="space-y-4">
                    {treatmentsByCategory[cat._id].map((t) => (
                      <li key={t._id}>
                        <Link
                          href={`/antes-y-despues/${t.slug}`}
                          className="text-sm md:text-base font-medium transition-opacity duration-200 hover:opacity-60 cursor-pointer"
                          style={{ color: "var(--pub-gold)" }}
                        >
                          {t.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <BookingBanner />
    </>
  );
}
