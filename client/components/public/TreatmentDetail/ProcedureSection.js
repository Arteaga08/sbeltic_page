import GoldDivider from "@/components/public/home/shared/GoldDivider";

export default function ProcedureSection({ treatment }) {
  if (!treatment.procedureSteps?.length) return null;

  return (
    <section className="relative w-full overflow-hidden">
      {/* ── Imagen de fondo ── */}
      {treatment.procedureBackgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${treatment.procedureBackgroundImage})` }}
          aria-hidden
        />
      )}

      {/* ── Overlay con color principal ── */}
      <div
        className="absolute inset-0"
        style={{
          background: treatment.procedureBackgroundImage
            ? "linear-gradient(135deg, rgba(var(--pub-accent-rgb, 62,166,163), 0.88) 0%, rgba(var(--pub-accent-rgb, 62,166,163), 0.75) 100%)"
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
      <div className="relative z-10 w-full py-28 md:py-40 px-6 md:px-10 flex flex-col items-center text-center">

        {/* ── Espacio para Logo ── */}
        <div
          className="w-24 h-24 md:w-28 md:h-28 rounded-full mb-14 flex items-center justify-center"
          style={{
            border: "2px solid rgba(255,255,255,0.6)",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(4px)",
          }}
          aria-hidden
        >
          {/* Reemplazar con <Image src="/logo-white.svg" ... /> cuando esté disponible */}
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Logo
          </span>
        </div>

        {/* ── Encabezado ── */}
        <p
          className="font-semibold tracking-[0.35em] uppercase mb-3"
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "clamp(0.65rem, 1vw, 0.75rem)",
          }}
        >
          Conoce el
        </p>

        <h2
          className="font-bold uppercase leading-none mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--pub-gold)",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            letterSpacing: "0.06em",
          }}
        >
          Procedimiento
        </h2>

        <p
          className="font-semibold uppercase mb-10"
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "clamp(0.6rem, 0.9vw, 0.7rem)",
            letterSpacing: "0.3em",
          }}
        >
          ¿Cómo es el {treatment.name}?
        </p>

        <GoldDivider size="sm" centered={true} className="mb-14 opacity-70" />

        {/* ── Pasos numerados ── */}
        <div className="w-full max-w-3xl space-y-8">
          {treatment.procedureSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-5 text-left">
              {/* Badge numérico */}
              <span
                className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full text-sm font-semibold"
                style={{
                  border: "1.5px solid var(--pub-gold)",
                  color: "var(--pub-gold)",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                {i + 1}
              </span>
              <p
                className={`leading-[1.85] tracking-wide pt-1.5 ${
                  i === 0 ? "font-light" : "font-extralight"
                }`}
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "clamp(1rem, 1.3vw, 1.12rem)",
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
