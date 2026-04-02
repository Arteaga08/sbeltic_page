import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import SectionEyebrow from "@/components/public/home/shared/SectionEyebrow";
import GoldDivider from "@/components/public/home/shared/GoldDivider";

function ChipGroup({ label, items, bgColor, textColor }) {
  if (!items?.length) return null;
  return (
    <div className="mt-10">
      <p
        className="text-xs font-bold tracking-[0.3em] uppercase mb-5"
        style={{ color: "var(--pub-text-muted)" }}
      >
        {label}
      </p>
      <div className="flex flex-wrap gap-3">
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
      className="w-full py-20 md:py-32"
      style={{ background: "var(--pub-surface)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <SectionEyebrow variant="gold" className="mb-5">
            Beneficios
          </SectionEyebrow>
          <h2
            className="font-bold leading-tight mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--pub-text)",
              fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
            }}
          >
            Lo Que Puedes{" "}
            <span style={{ color: "var(--pub-accent)" }}>Esperar</span>
          </h2>
          <GoldDivider size="sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatment.benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex gap-5 p-7"
              style={{
                background: "var(--pub-bg)",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <CheckCircleIcon
                size={32}
                weight="duotone"
                className="shrink-0 mt-0.5"
                style={{ color: "var(--pub-accent)" }}
                aria-hidden
              />
              <p
                className="font-light leading-[1.7]"
                style={{
                  color: "var(--pub-text)",
                  fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
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
