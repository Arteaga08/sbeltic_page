import SectionEyebrow from "@/components/public/home/shared/SectionEyebrow";
import GoldDivider from "@/components/public/home/shared/GoldDivider";

const VALORES = [
  {
    numeral: "I",
    titulo: "Excelencia",
    descripcion: "Utilizamos tecnología de vanguardia y protocolos de alta precisión para garantizar resultados reales y duraderos.",
  },
  {
    numeral: "II",
    titulo: "Confianza",
    descripcion: "Cada tratamiento comienza con una valoración honesta. Tu bienestar y seguridad son nuestra prioridad.",
  },
  {
    numeral: "III",
    titulo: "Personalización",
    descripcion: "No existen dos pieles iguales. Diseñamos cada plan a la medida de tus objetivos y características únicas.",
  },
];

export default function ValoresSection() {
  return (
    <section
      className="w-full py-24 md:py-32"
      style={{ background: "var(--pub-accent-light)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <SectionEyebrow variant="gold" className="mb-5">
            Nuestra filosofía
          </SectionEyebrow>
          <h2
            className="font-bold uppercase leading-tight mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--pub-text)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            Lo que nos
            <br />
            <span style={{ color: "var(--pub-accent)" }}>define</span>
          </h2>
          <GoldDivider size="sm" />
        </div>

        {/* Grid de valores — mismo patrón que AntesYDespuesPage */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 border-t border-b"
          style={{ borderColor: "var(--pub-gold-light)" }}
        >
          {VALORES.map((v, i) => (
            <div
              key={v.numeral}
              className="flex flex-col items-center text-center px-8 md:px-12 py-12 md:py-16 border-b sm:border-b-0 sm:border-l last:border-b-0 first:border-l-0"
              style={{ borderColor: "var(--pub-gold-light)" }}
            >
              <span
                className="font-light mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                  color: "var(--pub-gold)",
                  opacity: 0.5,
                }}
              >
                {v.numeral}
              </span>
              <h3
                className="font-semibold uppercase tracking-widest mb-4"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                  color: "var(--pub-text)",
                }}
              >
                {v.titulo}
              </h3>
              <p
                className="font-light leading-relaxed text-sm"
                style={{ color: "var(--pub-text-muted)" }}
              >
                {v.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
