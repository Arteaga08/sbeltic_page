import Image from "next/image";
import GoldDivider from "@/components/public/home/shared/GoldDivider";

export default function AboutTreatmentSection({ treatment }) {
  if (!treatment.aboutTreatment) return null;

  const paragraphs = treatment.aboutTreatment.split(/\n+/).filter(Boolean);

  return (
    <section
      className="relative w-full py-24 md:py-36 overflow-hidden"
      style={{ background: "var(--pub-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

        {/* ── Columna texto ── */}
        <div className="flex flex-col items-start text-left">

          {/* Eyebrow */}
          <p
            className="font-semibold tracking-[0.35em] uppercase mb-3"
            style={{
              color: "var(--pub-text)",
              opacity: 0.5,
              fontSize: "clamp(0.65rem, 1vw, 0.75rem)",
            }}
          >
            Descubre el
          </p>

          {/* Título principal */}
          <h2
            className="font-bold uppercase leading-none mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--pub-gold)",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              letterSpacing: "0.06em",
            }}
          >
            Tratamiento
          </h2>

          {/* Subtítulo */}
          <p
            className="font-semibold uppercase mb-8"
            style={{
              color: "var(--pub-text)",
              opacity: 0.5,
              fontSize: "clamp(0.65rem, 1vw, 0.75rem)",
              letterSpacing: "0.3em",
            }}
          >
            ¿En qué consiste el {treatment.name}?
          </p>

          <GoldDivider size="sm" centered={false} className="mb-12 opacity-80" />

          {/* Cuerpo */}
          <div className="space-y-6">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className={`leading-[1.85] tracking-wide ${i === 0 ? "font-light" : "font-extralight"}`}
                style={{
                  color: "var(--pub-text)",
                  fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                  opacity: i === 0 ? 0.9 : 0.75,
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* ── Columna imagen ── */}
        {treatment.aboutTreatmentImage && (
          <div className="flex justify-center md:justify-end">
            {/* Marco oval / arco */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                maxWidth: "460px",
                aspectRatio: "3 / 4",
                borderRadius: "50% 50% 50% 50% / 12% 12% 12% 12%",
                border: "1.5px solid",
                borderColor: "var(--pub-gold)",
                boxShadow: "0 0 0 8px var(--pub-bg), 0 0 0 9.5px rgba(var(--pub-gold-rgb, 180,148,90), 0.2)",
              }}
            >
              <Image
                src={treatment.aboutTreatmentImage}
                alt={`Tratamiento ${treatment.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        )}

        {/* Si no hay imagen, el texto ocupa todo el ancho */}
      </div>
    </section>
  );
}
