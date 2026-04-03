"use client";

import Image from "next/image";
import { BASE_URL, WA_NUMBER } from "./constants";
import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { ClockIcon } from "@phosphor-icons/react/dist/ssr/Clock";
import GoldDivider from "@/components/public/home/shared/GoldDivider";

export default function HeroSection({ treatment }) {
  const imgSrc = treatment.images?.[0]
    ? `${BASE_URL}${treatment.images[0]}`
    : null;

  const waMessage = encodeURIComponent(
    `Hola, me interesa agendar una valoración para: ${treatment.name}`,
  );
  const waLink = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  const heroDescription =
    treatment.shortDescription ||
    (treatment.description
      ? treatment.description.slice(0, 220).trimEnd() +
        (treatment.description.length > 220 ? "…" : "")
      : null);

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:min-h-screen">

        {/* ── Columna izquierda: panel turquesa ─────────────────────── */}
        <div
          className="order-2 lg:order-1 relative flex flex-col justify-center items-center lg:items-start px-6 py-10 pt-24 md:px-12 md:pt-28 lg:px-20 lg:py-20 lg:pt-32 xl:px-28 xl:py-24 xl:pt-36 overflow-hidden"
          style={{ backgroundColor: "var(--pub-accent)" }}
        >

          {/* Arco decorativo — círculo parcial, off-canvas top-right */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "-90px",
              right: "-90px",
              width: "340px",
              height: "340px",
              borderRadius: "50%",
              border: "1.5px solid var(--pub-accent-hover)",
              opacity: 0.35,
            }}
            aria-hidden
          />
          {/* Arco interior */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "-20px",
              right: "-20px",
              width: "190px",
              height: "190px",
              borderRadius: "50%",
              border: "1px solid var(--pub-accent-hover)",
              opacity: 0.2,
            }}
            aria-hidden
          />

          {/* Barra gold — borde izquierdo (decorativa) */}
          <div
            className="absolute left-0 top-1/3 w-0.75 rounded-r-full pointer-events-none"
            style={{ height: "48px", backgroundColor: "var(--pub-gold)", opacity: 0.7 }}
            aria-hidden
          />

          <div className="relative z-10 w-full max-w-xl mx-auto lg:mx-0 text-center lg:text-left flex flex-col items-center lg:items-start">

            {/* Categoría — eyebrow */}
            {treatment.category?.name && (
              <p
                className="mb-5 md:mb-6 font-semibold uppercase"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.3em",
                  color: "var(--pub-text)",
                  opacity: 0.9,
                }}
              >
                {treatment.category.name}
              </p>
            )}

            {/* Título principal */}
            <h1
              className="font-light leading-[0.93] mb-5"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(3.5rem, 5vw, 5.5rem)",
                color: "var(--pub-text)",
                letterSpacing: "-0.01em",
              }}
            >
              {treatment.name}
            </h1>

            {/* Divisor dorado */}
            <GoldDivider size="sm" centered={false} className="mb-8 md:mb-10 mx-auto lg:mx-0" />

            {/* Descripción */}
            {heroDescription && (
              <p
                className="font-light leading-relaxed mb-12 md:mb-16 text-justify"
                style={{
                  fontSize: "clamp(1rem, 1.15vw, 1.125rem)",
                  color: "var(--pub-text)",
                  opacity: 0.85,
                }}
              >
                {heroDescription}
              </p>
            )}

            {/* ── Precio + Sesiones ── */}
            <div className="flex items-end justify-center lg:justify-start gap-8 mb-10 md:mb-14">
              <div className="flex flex-col gap-1">
                <span
                  className="font-semibold uppercase"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "var(--pub-text)",
                    opacity: 0.7,
                  }}
                >
                  Inversión
                </span>
                <div className="flex flex-col">
                  {treatment.compareAtPrice > treatment.price && (
                    <span
                      className="text-xs line-through mb-0.5"
                      style={{ color: "var(--pub-text)", opacity: 0.5 }}
                    >
                      ${treatment.compareAtPrice.toLocaleString("es-MX")}
                    </span>
                  )}
                  <span
                    className="font-light"
                    style={{
                      fontSize: "clamp(2.2rem, 2.8vw, 3.5rem)",
                      fontVariantNumeric: "tabular-nums",
                      color: "var(--pub-text)",
                      lineHeight: 1.1,
                    }}
                  >
                    ${treatment.price?.toLocaleString("es-MX") || "Consulta"}
                  </span>
                </div>
              </div>

              {/* Divisor vertical */}
              <div
                className="self-stretch w-px"
                style={{
                  backgroundColor: "var(--pub-text)",
                  opacity: 0.2,
                  minHeight: "40px",
                }}
                aria-hidden
              />

              <div className="flex flex-col gap-1">
                <span
                  className="font-semibold uppercase"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    color: "var(--pub-text)",
                    opacity: 0.7,
                  }}
                >
                  Sesiones
                </span>
                <span
                  className="font-light"
                  style={{
                    fontSize: "clamp(2.2rem, 2.8vw, 3.5rem)",
                    color: "var(--pub-text)",
                    lineHeight: 1.1,
                  }}
                >
                  {treatment.sessions || "1"}
                </span>
              </div>
            </div>

            {/* ── CTA ── */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-fit px-5 py-3 md:px-6 md:py-4 rounded-full transition-all duration-300 cursor-pointer hover:opacity-85"
              style={{
                backgroundColor: "var(--pub-text)",
                color: "#ffffff",
              }}
            >
              <span className="flex items-center gap-3">
                <WhatsappLogoIcon size={18} weight="regular" aria-hidden />
                <span
                  className="text-xs font-bold uppercase"
                  style={{ letterSpacing: "0.2em" }}
                >
                  Agendar valoración
                </span>
              </span>
            </a>

            {/* ── Trust signals ── */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 mt-5 md:mt-6">
              <span
                className="flex items-center gap-1.5 font-medium"
                style={{ fontSize: "12px", color: "var(--pub-text)", opacity: 0.65 }}
              >
                <ShieldCheckIcon size={13} weight="duotone" aria-hidden />
                Consulta sin compromiso
              </span>
              <span
                className="flex items-center gap-1.5 font-medium"
                style={{ fontSize: "12px", color: "var(--pub-text)", opacity: 0.65 }}
              >
                <ClockIcon size={13} weight="duotone" aria-hidden />
                Respuesta en minutos
              </span>
            </div>

          </div>
        </div>

        {/* ── Columna derecha: imagen ─────────────────────────────── */}
        <div className="order-1 lg:order-2 relative w-full min-h-[40vh] lg:min-h-screen bg-[#1a2a2a]">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={treatment.name}
              fill
              unoptimized
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center font-medium"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Sin imagen
            </div>
          )}

          {/* Gradiente izquierdo — une con panel turquesa (desktop) */}
          <div
            className="absolute inset-y-0 left-0 w-28 hidden lg:block pointer-events-none"
            style={{
              background: "linear-gradient(to right, rgba(61,189,181,0.22), transparent)",
            }}
            aria-hidden
          />

          {/* Gradiente inferior — grounding mobile */}
          <div
            className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.28), transparent)",
            }}
            aria-hidden
          />
        </div>

      </div>
    </section>
  );
}
