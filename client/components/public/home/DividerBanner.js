"use client";

import Link from "next/link";
import Image from "next/image";
import SectionEyebrow from "./shared/SectionEyebrow";
import GoldDivider from "./shared/GoldDivider";

export default function DividerBanner({
  imageSrc = "https://res.cloudinary.com/dnppruwh4/image/upload/v1774578089/Captura_de_pantalla_2026-03-26_a_la_s_8.20.24_p.m._xxhxag.png",
  imageAlt = "Programa Primera Visita",
  label = "PROGRAMA PRIMERA VISITA",
  headingLight = "",
  headingBold = "10%",
  subheading = "Primera Visita",
  description = "Obten un Cupon del 10% de descuento al visitarnos por primera vez",
  buttonText = "Agendar",
  buttonHref = "/contacto",
  marqueeText = "Cuidado Experto Para Tu Piel",
}) {
  return (
    <>
      {/* Marquee separador — header */}
      <div className="w-full border-y border-black/10 overflow-hidden py-5 md:py-6 bg-white">
        <div className="flex w-max animate-[marquee_25s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex whitespace-nowrap items-center"
            >
              {[...Array(6)].map((_, j) => (
                <span
                  key={j}
                  className="text-lg md:text-xl italic font-light px-8 md:px-12"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--pub-text)",
                  }}
                >
                  {marqueeText}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Banner de dos paneles */}
      <section
        className="relative flex flex-col-reverse md:flex-row w-full overflow-hidden"
        style={{
          minHeight: "clamp(500px, 58vh, 640px)",
          background: "var(--pub-surface)",
        }}
      >
        {/* Línea vertical de acento — borde derecho de toda la sección */}
        <div
          className="hidden md:block absolute right-0 top-0 bottom-0 w-2"
          style={{ background: "var(--pub-accent)" }}
        />
        {/* Panel izquierdo — Imagen que toca borde superior e inferior */}
        <div
          className="flex-none w-full md:w-1/2 min-h-80 md:min-h-0 relative"
          style={{ background: "var(--pub-surface)" }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </div>

        {/* Panel derecho — texto centrado */}
        <div className="flex-1 md:flex-none md:w-1/2 flex flex-col justify-center items-center text-center px-8 pt-12 pb-8 md:py-14 md:px-12 lg:px-20">
          {/* Label eyebrow */}
          <SectionEyebrow className="mb-3">{label}</SectionEyebrow>

          {/* Línea decorativa bajo el label */}
          <GoldDivider size="lg" className="mb-6" />

          {/* Grupo de encabezados (Serif + Script) */}
          <div className="flex flex-col items-center">
            {headingLight && (
              <span
                className="text-2xl md:text-3xl font-light leading-tight"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--pub-text)",
                }}
              >
                {headingLight}
              </span>
            )}

            {headingBold && (
              <span
                className="text-7xl md:text-8xl lg:text-[9rem] font-normal uppercase leading-none tracking-tight"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--pub-text)",
                }}
              >
                {headingBold}
              </span>
            )}

            {subheading && (
              <span
                className="text-4xl md:text-5xl mt-2 md:mt-3"
                style={{
                  fontFamily: "var(--font-script, cursive)",
                  color: "var(--pub-text)",
                }}
              >
                {subheading}
              </span>
            )}
          </div>

          {/* Divider gold bajo los headings */}
          <GoldDivider size="md" className="mt-4 mb-5" />

          {/* Descripción antes del botón */}
          {description && (
            <p
              className="text-sm md:text-base leading-relaxed max-w-xs mb-8"
              style={{ color: "var(--pub-text-muted)" }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {/* Botón CTA */}
          <Link
            href={buttonHref}
            className="px-12 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-(--pub-accent-hover) hover:shadow-xl hover:-translate-y-1"
            style={{ background: "var(--pub-accent)", color: "#ffffff" }}
          >
            {buttonText}
          </Link>
        </div>
      </section>
    </>
  );
}
