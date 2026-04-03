import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import { WA_NUMBER } from "./constants";

export default function CtaSection({ treatment }) {
  const waMessage = encodeURIComponent(
    `Hola, me interesa el tratamiento: ${treatment.name}${treatment.price ? ` ($${treatment.price.toLocaleString("es-MX")} MXN)` : ""}`,
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  return (
    <section
      className="w-full py-24 md:py-32"
      style={{ background: "var(--pub-dark)" }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <p
          className="text-xs font-bold tracking-[0.3em] uppercase mb-6"
          style={{ color: "var(--pub-accent)" }}
        >
          ¿Lista para comenzar?
        </p>
        <h2
          className="font-bold uppercase leading-tight mb-6"
          style={{
            fontFamily: "var(--font-heading)",
            color: "#ffffff",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
          }}
        >
          Agenda Tu
          <br />
          Cita Hoy
        </h2>
        <p
          className="font-light leading-[1.8] mb-12 max-w-xl mx-auto text-justify"
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
          }}
        >
          Consulta con nuestras especialistas sobre{" "}
          <strong style={{ color: "#ffffff", fontWeight: 600 }}>
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
