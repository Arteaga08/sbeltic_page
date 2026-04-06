import SectionEyebrow from "@/components/public/home/shared/SectionEyebrow";
import GoldDivider from "@/components/public/home/shared/GoldDivider";

export default function HistoriaSection() {
  return (
    <section
      className="w-full py-24 md:py-32"
      style={{ background: "var(--pub-accent-light)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Texto */}
          <div>
            <SectionEyebrow variant="gold" className="mb-5">
              Nuestra historia
            </SectionEyebrow>
            <h2
              className="font-bold uppercase leading-tight mb-6"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--pub-text)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              Un espacio diseñado
              <br />
              <span style={{ color: "var(--pub-accent)" }}>para ti</span>
            </h2>
            <GoldDivider size="sm" centered={false} className="mb-8" />
            <p
              className="font-light leading-relaxed mb-6"
              style={{
                color: "var(--pub-text)",
                fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              }}
            >
              {/* TODO: Reemplazar con texto real de la clínica */}
              En Sbeltic creemos que cada persona merece sentirse segura y
              radiante en su propia piel. Desde nuestros inicios, hemos
              combinado tecnología de vanguardia con atención personalizada para
              ofrecer tratamientos estéticos de primer nivel.
            </p>
            <p
              className="font-light leading-relaxed"
              style={{
                color: "var(--pub-text)",
                fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
              }}
            >
              Nuestras instalaciones fueron diseñadas pensando en tu comodidad y
              privacidad, creando un ambiente de bienestar desde el momento en
              que cruzas la puerta.
            </p>
          </div>

          {/* Imagen placeholder */}
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{ aspectRatio: "4/5", background: "var(--pub-gold-light)" }}
          >
            {/* TODO: Reemplazar con imagen real de la clínica */}
          </div>
        </div>
      </div>
    </section>
  );
}
