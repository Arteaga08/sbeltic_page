import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import { WA_NUMBER } from "./constants";

export default function CtaSection({ treatment }) {
  const waMessage = encodeURIComponent(
    `Hola, me interesa el tratamiento: ${treatment.name}${treatment.price ? ` ($${treatment.price.toLocaleString("es-MX")} MXN)` : ""}`,
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  return (
    <section
      className="w-full py-20 md:py-32"
      style={{ background: "var(--pub-cream)" }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <p
          className="text-xs font-bold tracking-[0.3em] uppercase mb-6"
          style={{ color: "var(--pub-gold)" }}
        >
          ¿Lista para comenzar?
        </p>
        <h2
          className="font-bold leading-tight mb-6"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--pub-text)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
          }}
        >
          Agenda tu cita hoy
        </h2>
        <p
          className="font-light leading-[1.8] mb-12 max-w-xl mx-auto"
          style={{
            color: "var(--pub-text-muted)",
            fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
          }}
        >
          Consulta con nuestras especialistas sobre{" "}
          <strong style={{ color: "var(--pub-text)", fontWeight: 600 }}>
            {treatment.name}
          </strong>{" "}
          y diseña tu plan personalizado.
        </p>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 px-12 py-5 text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]"
          style={{
            background: "var(--pub-accent)",
            color: "#fff",
            borderRadius: "var(--radius-md)",
          }}
        >
          <WhatsappLogoIcon size={22} weight="regular" aria-hidden />
          Consultar por WhatsApp
        </a>
      </div>
    </section>
  );
}
