import { BASE_URL } from "./constants";

export default function ProcedureSection({ treatment }) {
  if (!treatment.procedureSteps?.length) return null;

  return (
    <section className="relative w-full overflow-hidden">
      {/* ── Imagen de fondo ── */}
      {treatment.procedureBackgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${BASE_URL}${treatment.procedureBackgroundImage})`,
          }}
          aria-hidden
        />
      )}

      {/* ── Overlay con color principal (INTACTO) ── */}
      <div
        className="absolute inset-0"
        style={{
          background: treatment.procedureBackgroundImage
            ? "linear-gradient(135deg, rgba(62,166,163, 0.65) 0%, rgba(62,166,163, 0.68) 100%)"
            : "var(--pub-accent)",
        }}
        aria-hidden
      />

      {/* ── Patrón sutil sobre el overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.02) 60px, rgba(255,255,255,0.02) 61px)",
        }}
        aria-hidden
      />

      {/* ── Contenido ── */}
      <div className="relative z-10 w-full py-24 md:py-32 px-6 md:px-10 flex flex-col items-center text-center">
        {/* ── Encabezado ── */}
        <p
          className="font-semibold tracking-[0.35em] uppercase mb-3"
          style={{
            color: "rgba(255,255,255,0.9)", // Aumentamos opacidad (antes 0.65)
            fontSize: "clamp(0.65rem, 1vw, 0.75rem)",
            textShadow: "0 2px 10px rgba(0,0,0,0.2)", // Sombra para separar del fondo
          }}
        >
          Conoce el
        </p>

        <h2
          className="font-bold uppercase leading-none mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            color: "#ffffff",
            fontSize: "clamp(2.75rem, 6vw, 4.5rem)",
            letterSpacing: "0.06em",
            textShadow: "0 4px 20px rgba(0,0,0,0.15)", // Sombra elegante para el título
          }}
        >
          Procedimiento
        </h2>

        <p
          className="font-semibold uppercase mb-10"
          style={{
            color: "rgba(255,255,255,0.9)", // Aumentamos opacidad
            fontSize: "clamp(0.6rem, 0.9vw, 0.7rem)",
            letterSpacing: "0.3em",
            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          ¿Cómo es el {treatment.name}?
        </p>

        {/* Divisor blanco */}
        <div
          className="w-16 h-px mx-auto mb-14"
          style={{
            background: "rgba(255,255,255,0.6)", // Un poco más visible
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
          aria-hidden
        />

        {/* ── Texto introductorio ── */}
        {treatment.procedureIntroText && (
          <p
            className="max-w-2xl font-light leading-[1.85] tracking-wide mb-14 text-justify"
            style={{
              color: "#ffffff",
              fontSize: "clamp(1rem, 1.15vw, 1.125rem)",
              textShadow: "0 2px 12px rgba(0,0,0,0.25)", // Mejora drástica de legibilidad
            }}
          >
            {treatment.procedureIntroText}
          </p>
        )}

        {/* ── Pasos numerados — Contenedor Oscurecido (Dark Glassmorphism) ── */}
        <div
          className="w-full max-w-3xl space-y-8 p-8 md:p-12"
          style={{
            background: "rgba(0,0,0,0.18)", // Negro transparente en lugar de blanco transparente
            backdropFilter: "blur(8px)", // Difumina la imagen de fondo para que no estorbe al texto
            WebkitBackdropFilter: "blur(8px)", // Soporte para Safari
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.3)", // Sombra para separar la tarjeta del fondo
          }}
        >
          {treatment.procedureSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-5 text-left">
              {/* Badge numérico */}
              <span
                className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold"
                style={{
                  border: "1.5px solid rgba(255,255,255,0.8)",
                  color: "#ffffff",
                  background: "rgba(255,255,255,0.1)",
                  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                {i + 1}
              </span>
              <p
                className="leading-[1.85] tracking-wide pt-1.5 text-justify font-light"
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(1rem, 1.15vw, 1.125rem)",
                  textShadow: "0 1px 8px rgba(0,0,0,0.3)", // El texto de los pasos ahora flotará perfecto
                }}
              >
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
