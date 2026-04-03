import SectionEyebrow from "@/components/public/home/shared/SectionEyebrow";
import GoldDivider from "@/components/public/home/shared/GoldDivider";

function ChipGroup({ label, items, bgColor, textColor }) {
  if (!items?.length) return null;
  return (
    <div className="mt-10 text-center">
      <p
        className="text-xs font-bold tracking-[0.3em] uppercase mb-5"
        style={{ color: "var(--pub-text-muted)" }}
      >
        {label}
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {items.map((item) => (
          <span
            key={item}
            className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase"
            style={{ background: bgColor, color: textColor }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function BenefitsSection({ treatment }) {
  return (
    <section
      className="w-full py-24 md:py-32"
      style={{ background: "var(--pub-surface)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <SectionEyebrow variant="gold" className="mb-5">
            Beneficios
          </SectionEyebrow>
          <h2
            className="font-bold uppercase leading-tight mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--pub-text)",
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
            }}
          >
            Lo Que Puedes
            <br />
            <span style={{ color: "var(--pub-accent)" }}>Esperar</span>
          </h2>
          <GoldDivider size="sm" />
          {treatment.benefitsText && (
            <p
              className="font-light leading-[1.85] tracking-wide mt-8 max-w-2xl mx-auto text-justify"
              style={{
                color: "var(--pub-text)",
                fontSize: "clamp(1rem, 1.15vw, 1.125rem)",
                opacity: 0.8,
              }}
            >
              {treatment.benefitsText}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treatment.benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex flex-col p-8 md:p-10"
              style={{
                background: "var(--pub-bg)",
                borderRadius: "var(--radius-lg)",
                borderTop: "2px solid var(--pub-gold)",
              }}
            >
              {/* Número decorativo */}
              <span
                className="font-bold mb-4 leading-none select-none"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(2rem, 3vw, 2.5rem)",
                  color: "var(--pub-gold)",
                  opacity: 0.3,
                }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                className="font-light leading-[1.75] text-justify"
                style={{
                  color: "var(--pub-text)",
                  fontSize: "clamp(1rem, 1.15vw, 1.125rem)",
                }}
              >
                {benefit}
              </p>
            </div>
          ))}
        </div>

        <ChipGroup
          label="Zonas de tratamiento"
          items={treatment.targetAreas}
          bgColor="var(--pub-accent-light)"
          textColor="var(--pub-accent)"
        />
        <ChipGroup
          label="Tipo de piel ideal"
          items={treatment.skinTypes}
          bgColor="var(--pub-gold-light)"
          textColor="var(--pub-gold-dark)"
        />
      </div>
    </section>
  );
}
