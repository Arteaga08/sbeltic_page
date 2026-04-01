import Image from "next/image";

export default function BookingBanner({
  imageUrl = "https://res.cloudinary.com/demo/image/upload/v1/family_bench.jpg",
  titleTop = "RENUEVA",
  titleBottom = "TU RUTINA",
  locations = "DURANGO • MÉXICO",
  description = "El cuidado personal no debería ser complicado. Agenda tu cita hoy y vive la estética hecha a la perfección con resultados naturales.",
  buttonText = "Agendar cita",
  buttonLink = "https://wa.me/5216180000000",
  phoneNumber = "(618) 000-0000",
}) {
  return (
    /* AJUSTE: pt-8 en móvil para quitar el hueco blanco y py-32 en desktop */
    <section className="relative w-full pt-8 pb-20 md:py-32 overflow-hidden bg-[#111111]">
      {/* ─── Background & Filters ─── */}
      <div className="absolute inset-0 z-0 bg-black">
        <Image
          src={imageUrl}
          alt="Reserva tu cita"
          fill
          className="object-cover object-center opacity-60 md:opacity-100"
          unoptimized
        />
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{ backgroundColor: "var(--pub-accent)", opacity: 0.5 }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-24 items-center">
          {/* Columna Izquierda: Títulos Re-equilibrados */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex flex-col mb-8 md:mb-12">
              <h2
                className="text-6xl md:text-8xl leading-none font-medium mb-0"
                style={{
                  color: "var(--pub-accent)",
                  fontFamily: "var(--font-heading)",
                  textTransform: "uppercase",
                }}
              >
                {titleTop}
              </h2>

              <h3
                className="text-xl md:text-3xl tracking-[0.3em] md:tracking-[0.5em] font-light text-white uppercase -mt-2 md:-mt-4 opacity-95"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {titleBottom}
              </h3>

              <div
                className="w-12 md:w-20 h-px mt-6 md:mt-8 self-center lg:self-start"
                style={{ backgroundColor: "var(--pub-accent)" }}
              />
            </div>

            <div className="hidden md:flex items-center gap-4 text-[10px] tracking-[0.5em] font-bold text-white/50 uppercase">
              {locations}
            </div>
          </div>

          {/* Columna Derecha: Acción Directa */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <p className="hidden md:block text-lg text-white/90 font-light leading-relaxed mb-10 max-w-md">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10 w-full sm:w-auto">
              <a
                href={buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-full text-center"
                style={{
                  backgroundColor: "var(--pub-accent)",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "var(--pub-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--pub-accent)";
                  e.currentTarget.style.color = "white";
                }}
              >
                {buttonText}
              </a>

              <a
                href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                className="text-2xl md:text-3xl font-light tracking-tighter transition-opacity hover:opacity-70"
                style={{
                  color: "var(--pub-accent)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {phoneNumber}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
