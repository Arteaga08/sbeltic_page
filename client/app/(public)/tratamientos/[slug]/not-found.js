import Link from "next/link";

export default function TreatmentNotFound() {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center"
      style={{ background: "var(--pub-accent-light)" }}
    >
      <p
        className="text-xs font-semibold tracking-[0.3em] uppercase mb-4"
        style={{ color: "var(--pub-gold)" }}
      >
        Error 404
      </p>
      <h1
        className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
        style={{ fontFamily: "var(--font-heading)", color: "var(--pub-text)" }}
      >
        Tratamiento no encontrado
      </h1>
      <p
        className="text-base md:text-lg mb-10 max-w-md font-light leading-relaxed"
        style={{ color: "var(--pub-text-muted)" }}
      >
        El tratamiento que buscas no existe o ya no está disponible.
      </p>
      <Link
        href="/tratamientos"
        className="px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-85"
        style={{ background: "var(--pub-accent)", color: "#fff" }}
      >
        Ver todos los tratamientos
      </Link>
    </section>
  );
}
