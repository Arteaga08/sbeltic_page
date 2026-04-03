import GoldDivider from "@/components/public/home/shared/GoldDivider";

export default function WhySbelticSection({ treatment }) {
  if (!treatment.whySbeltic) return null;

  const paragraphs = treatment.whySbeltic.split(/\n+/).filter(Boolean);

  return (
    <section
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--pub-surface)" }}
    >
      {/* ── Líneas decorativas laterales ── */}
      <div
        className="absolute top-0 left-10 bottom-0 w-px pointer-events-none hidden md:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--pub-border), transparent)",
          opacity: 0.3,
        }}
      />
      <div
        className="absolute top-0 right-10 bottom-0 w-px pointer-events-none hidden md:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--pub-border), transparent)",
          opacity: 0.3,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 flex flex-col items-center text-center">
        {/* ── Encabezado estilo Alchemy 43 ── */}
        <p
          className="font-semibold tracking-[0.35em] uppercase mb-3"
          style={{
            color: "var(--pub-text)",
            opacity: 0.55,
            fontSize: "clamp(0.65rem, 1vw, 0.75rem)",
          }}
        >
          ¿Por qué elegir
        </p>

        <h2
          className="font-bold uppercase leading-none tracking-widest mb-3"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--pub-accent)",
            fontSize: "clamp(2.75rem, 6vw, 4.5rem)",
            letterSpacing: "0.08em",
          }}
        >
          Sbeltic
        </h2>

        <p
          className="font-semibold tracking-[0.3em] uppercase mb-8"
          style={{
            color: "var(--pub-text)",
            opacity: 0.55,
            fontSize: "clamp(0.65rem, 1vw, 0.75rem)",
          }}
        >
          para tu {treatment.name}?
        </p>

        <GoldDivider size="sm" centered={true} className="mb-14 opacity-80" color="--pub-accent" />

        {/* ── Cuerpo de texto ── */}
        <div className="w-full space-y-7">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="font-light leading-[1.85] tracking-wide text-justify"
              style={{
                color: "var(--pub-text)",
                fontSize: "clamp(1rem, 1.15vw, 1.125rem)",
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
