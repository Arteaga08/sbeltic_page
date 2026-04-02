import Image from "next/image";
import GoldDivider from "@/components/public/home/shared/GoldDivider";

export default function CandidatesSection({ treatment }) {
  const hasText = Boolean(treatment.candidatesText);
  const hasBullets = treatment.candidatesBullets?.length > 0;
  const hasImage = Boolean(treatment.candidatesImage);

  if (!hasText && !hasBullets) return null;

  return (
    <section
      className="relative w-full py-24 md:py-36 overflow-hidden"
      style={{ background: "var(--pub-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

        {/* ── Columna imagen (izquierda) ── */}
        {hasImage && (
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            {/* Marco arco: redondeado arriba, plano abajo */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                maxWidth: "460px",
                aspectRatio: "3 / 4",
                borderRadius: "999px 999px 40px 40px",
                border: "1.5px solid",
                borderColor: "var(--pub-gold)",
                boxShadow:
                  "0 0 0 8px var(--pub-bg), 0 0 0 9.5px rgba(var(--pub-gold-rgb, 180,148,90), 0.2)",
              }}
            >
              <Image
                src={treatment.candidatesImage}
                alt={`Candidatos para ${treatment.name}`}
                fill
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
              color: "var(--pub-text)",
              opacity: 0.5,
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
              color: "var(--pub-gold)",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              letterSpacing: "0.06em",
            }}
          >
            Un candidato
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
            ¿Es el {treatment.name} para mí?
          </p>

          <GoldDivider size="sm" centered={false} className="mb-12 opacity-80" />

          {/* Párrafo introductorio */}
          {hasText && (
            <p
              className="font-light leading-[1.85] tracking-wide mb-8"
              style={{
                color: "var(--pub-text)",
                fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
                opacity: 0.85,
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
                  {/* Bullet dorado */}
                  <span
                    className="mt-[0.45em] shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--pub-gold)" }}
                    aria-hidden
                  />
                  <span
                    className="font-extralight leading-[1.75] tracking-wide"
                    style={{
                      color: "var(--pub-text)",
                      fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
                      opacity: 0.8,
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
