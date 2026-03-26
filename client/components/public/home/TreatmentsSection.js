import Link from "next/link";
import Image from "next/image";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function CategoryCard({ category }) {
  const imgSrc = category.image ? `${BASE_URL}${category.image}` : null;

  return (
    <Link
      href={`/tratamientos?categoria=${category.slug}`}
      // Magia móvil: w-[43vw] asegura que quepan 2 perfectas. En desktop cambia a w-64.
      className="group shrink-0 w-[43vw] max-w-45 sm:max-w-50 md:max-w-none md:w-64 flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-1"
    >
      {/* Imagen oval — Usamos w-full para que respete el contenedor padre */}
      <div
        className="relative w-full overflow-hidden shadow-sm transition-shadow duration-500 group-hover:shadow-xl"
        style={{
          borderRadius: "9999px",
          aspectRatio: "3/5",
          background: "var(--pub-accent-light)",
        }}
      >
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={category.name}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 256px"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-sm font-medium px-4 text-center"
            style={{ color: "var(--pub-accent)" }}
          >
            {category.name}
          </div>
        )}

        {/* Label overlay — Estilo "Cintillo" cruzando la foto */}
        <div
          className="absolute bottom-8 md:bottom-12 inset-x-0 px-2 py-3 md:py-3.5 backdrop-blur-md transition-colors duration-300"
          style={{ background: "rgba(45, 90, 71, 0.85)" }}
        >
          <p className="text-white text-[9px] md:text-[11px] font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-center leading-tight">
            {category.name}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function TreatmentsSection({ categories = [] }) {
  return (
    <section
      className="py-20 md:py-28"
      style={{ background: "var(--pub-surface)" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-normal uppercase tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--pub-text)",
            }}
          >
            Nuestros tratamientos
          </h2>

          {/* Subrayado */}
          <div
            className="w-3/4 max-w-70 md:max-w-100 h-0.5 mx-auto mb-6"
            style={{ background: "var(--pub-gold)" }}
          />

          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ color: "var(--pub-text-muted)" }}
          >
            Rostro &amp; Cuerpo
          </p>
        </div>

        {/* Tarjetas — gap-3 en móvil para que encajen perfectas, gap-7 en desktop */}
        {categories.length > 0 ? (
          <div className="flex gap-3 md:gap-7 overflow-x-auto pb-6 md:justify-center snap-x snap-mandatory scrollbar-hide">
            {categories.map((cat) => (
              <div key={cat._id} className="snap-start pt-2">
                <CategoryCard category={cat} />
              </div>
            ))}
          </div>
        ) : (
          <p
            className="text-center py-10"
            style={{ color: "var(--pub-text-muted)" }}
          >
            Las categorías de tratamientos aparecerán aquí una vez que las crees
            desde el admin.
          </p>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 mt-10 md:mt-14">
          <Link
            href="/contacto"
            className="w-full sm:w-auto text-center px-10 md:px-12 py-4 md:py-5 rounded-full text-sm md:text-base font-bold tracking-widest uppercase bg-(--pub-accent) text-white transition-all duration-300 hover:bg-(--pub-accent-hover) hover:shadow-xl hover:-translate-y-1"
          >
            Agendar consulta
          </Link>
          <Link
            href="/tratamientos"
            className="w-full sm:w-auto text-center px-10 md:px-12 py-4 md:py-5 rounded-full text-sm md:text-base font-bold tracking-widest uppercase border-2 border-(--pub-accent) text-(--pub-accent) transition-all duration-300 hover:bg-(--pub-accent) hover:text-white hover:shadow-xl hover:-translate-y-1"
          >
            Ver todos los tratamientos
          </Link>
        </div>
      </div>
    </section>
  );
}
