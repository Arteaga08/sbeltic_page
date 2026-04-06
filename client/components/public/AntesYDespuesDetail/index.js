import Link from "next/link";
import ComparisonSlider from "./ComparisonSlider";
import GoldDivider from "@/components/public/home/shared/GoldDivider";
import BookingBanner from "@/components/public/home/shared/BookingBanner";
import InfiniteCarousel from "../home/shared/InfiniteCarousel";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const WA_NUMBER = "5215512345678"; // TODO: reemplazar con número real

export default function AntesYDespuesDetail({ treatment }) {
  const pairs = treatment.beforeImages
    .map((img, i) => ({
      before: `${BASE_URL}${img}`,
      after: treatment.afterImages[i]
        ? `${BASE_URL}${treatment.afterImages[i]}`
        : null,
    }))
    .filter((p) => p.before && p.after);

  const waMessage = encodeURIComponent(
    `Hola, me interesa el tratamiento: ${treatment.name}`,
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  return (
    <article>
      {/* Main content */}
      <section
        className="w-full pt-28 md:pt-36 pb-20 md:pb-32"
        style={{ background: "var(--pub-accent-light)" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Breadcrumb */}
          <nav className="mb-8 md:mb-12" aria-label="Breadcrumb">
            <ol
              className="flex items-center gap-2 text-xs"
              style={{ color: "var(--pub-text)", opacity: 0.6 }}
            >
              <li>
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  Inicio
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/antes-y-despues"
                  className="hover:opacity-80 transition-opacity"
                >
                  Antes y Después
                </Link>
              </li>
              <li>/</li>
              <li style={{ opacity: 1, fontWeight: 600 }}>{treatment.name}</li>
            </ol>
          </nav>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* LEFT — Treatment info */}
            <div className="flex flex-col order-2 lg:order-1">
              <h1
                className="font-bold uppercase leading-tight mb-6"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--pub-text)",
                  fontSize: "clamp(2.6rem, 4vw, 3.5rem)",
                }}
              >
                {treatment.name}
              </h1>

              <GoldDivider size="sm" centered={false} className="mb-8" />

              {treatment.shortDescription && (
                <p
                  className="font-light leading-relaxed mb-8"
                  style={{
                    color: "var(--pub-text)",
                    fontSize: "clamp(1rem, 1.2vw, 1.125rem)",
                  }}
                >
                  {treatment.shortDescription}
                </p>
              )}

              {/* Benefits */}
              {treatment.benefits?.length > 0 && (
                <ul className="space-y-3 mb-10">
                  {treatment.benefits.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: "var(--pub-text)" }}
                    >
                      <span
                        className="mt-0.5 shrink-0"
                        style={{ color: "var(--pub-accent)", fontWeight: 700 }}
                      >
                        &#10003;
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {/* Stats */}
              {(treatment.price ||
                treatment.duration ||
                treatment.sessions) && (
                <div className="flex flex-wrap gap-6 mb-10">
                  {treatment.price != null && (
                    <Stat
                      label="Inversión"
                      value={`$${treatment.price.toLocaleString("es-MX")}`}
                    />
                  )}
                  {treatment.duration && (
                    <Stat label="Duración" value={treatment.duration} />
                  )}
                  {treatment.sessions && (
                    <Stat label="Sesiones" value={treatment.sessions} />
                  )}
                </div>
              )}

              {/* CTA */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-200 hover:opacity-85"
                style={{ backgroundColor: "var(--pub-accent)", color: "white" }}
              >
                Agendar valoración
              </a>

              {/* Link to full treatment */}
              <Link
                href={`/tratamientos/${treatment.slug}`}
                className="mt-4 text-xs font-medium uppercase tracking-wider hover:opacity-70 transition-opacity"
                style={{ color: "var(--pub-gold)" }}
              >
                Ver tratamiento completo &rarr;
              </Link>
            </div>

            {/* RIGHT — Comparison slider */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-32">
              <ComparisonSlider pairs={pairs} treatmentName={treatment.name} />
            </div>
          </div>
        </div>
      </section>
      <InfiniteCarousel />
      <BookingBanner />
    </article>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.2em]"
        style={{ color: "var(--pub-text)", opacity: 0.6 }}
      >
        {label}
      </span>
      <span className="text-lg font-light" style={{ color: "var(--pub-text)" }}>
        {value}
      </span>
    </div>
  );
}
