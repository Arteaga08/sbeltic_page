import Link from "next/link";
import SectionEyebrow from "./shared/SectionEyebrow";

export default function Hero() {
  return (
    <>
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video de fondo */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/hero-poster.jpg"
      >
        <source src="https://res.cloudinary.com/demo/video/upload/q_auto,f_auto/sea_turtle.mp4" type="video/mp4" />
      </video>

      {/* Overlay con degradado */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 pb-16 pt-24 md:pt-36">
        <SectionEyebrow variant="light" className="mb-5">
          Clínica Estética Profesional
        </SectionEyebrow>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] text-white mb-6 max-w-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Tu mejor versión
          <br />
          <em className="not-italic" style={{ color: "var(--pub-gold)" }}>
            empieza aquí
          </em>
        </h1>

        <p
          className="text-base md:text-lg max-w-xl mb-10 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          Tratamientos estéticos y productos de skincare respaldados por
          profesionales certificados.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/contacto"
            className="px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-85"
            style={{ background: "var(--pub-accent)", color: "#fff" }}
          >
            Agenda una consulta
          </Link>
          <Link
            href="/tratamientos"
            className="px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase border-2 border-white text-white transition-colors hover:bg-white/10"
          >
            Ver tratamientos
          </Link>
        </div>
      </div>
    </section>

    {/* Divisor entre Hero y Tratamientos */}
    <div
      className="w-24 h-px mx-auto"
      style={{ background: 'var(--pub-gold)', opacity: 0.6 }}
    />
    </>
  );
}
