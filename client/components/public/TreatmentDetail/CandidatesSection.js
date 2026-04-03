import Image from "next/image";
import { BASE_URL } from "./constants";

export default function CandidatesSection({ treatment }) {
  const hasText = Boolean(treatment.candidatesText);
  const hasBullets = treatment.candidatesBullets?.length > 0;
  const hasImage = Boolean(treatment.candidatesImage);

  if (!hasText && !hasBullets) return null;

  return (
    <section
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--pub-dark)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

        {/* ── Columna imagen (izquierda) ── */}
        {hasImage && (
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <div
              className="relative w-full overflow-hidden"
              style={{
                maxWidth: "460px",
                aspectRatio: "3 / 4",
                borderRadius: "999px 999px 40px 40px",
                border: "1.5px solid rgba(255,255,255,0.15)",
                boxShadow: "0 0 0 8px var(--pub-dark), 0 0 0 9.5px rgba(255,255,255,0.08)",
              }}
            >
              <Image
                src={`${BASE_URL}${treatment.candidatesImage}`}
                alt={`Candidatos para ${treatment.name}`}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        )}

        {/* ── Columna texto (derecha) ── */}
        <div
          className={`flex flex-col items-start text-left order-1 md:order-2 ${
            !hasImage ? "md:col-span-2 max-w-3xl mx-auto" : ""
          }`}
        >
          {/* Eyebrow */}
          <p
            className="font-semibold tracking-[0.35em] uppercase mb-3"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "clamp(0.65rem, 1vw, 0.75rem)",
            }}
          >
            Descubre si eres
          </p>

          {/* Título principal */}
          <h2
            className="font-bold uppercase leading-none mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              color: "#ffffff",
              fontSize: "clamp(2.75rem, 6vw, 4.5rem)",
              letterSpacing: "0.06em",
            }}
          >
            Un candidato
          </h2>

          {/* Subtítulo */}
          <p
            className="font-semibold uppercase mb-8"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "clamp(0.65rem, 1vw, 0.75rem)",
              letterSpacing: "0.3em",
            }}
          >
            ¿Es el {treatment.name} para mí?
          </p>

          {/* Divider blanco */}
          <div
            className="w-12 h-0.5 mb-12"
            style={{ background: "rgba(255,255,255,0.3)" }}
            aria-hidden
          />

          {/* Párrafo introductorio */}
          {hasText && (
            <p
              className="font-light leading-[1.85] tracking-wide mb-8 text-justify"
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "clamp(1rem, 1.15vw, 1.125rem)",
              }}
            >
              {treatment.candidatesText}
            </p>
          )}

          {/* Lista de viñetas */}
          {hasBullets && (
            <ul className="flex flex-col gap-4 w-full">
              {treatment.candidatesBullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span
                    className="mt-[0.45em] shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--pub-accent)" }}
                    aria-hidden
                  />
                  <span
                    className="font-extralight leading-[1.75] tracking-wide"
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "clamp(1rem, 1.15vw, 1.125rem)",
                    }}
                  >
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
