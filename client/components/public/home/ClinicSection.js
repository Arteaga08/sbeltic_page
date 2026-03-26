import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

export default function ClinicSection() {
  return (
    <section className="flex flex-col md:flex-row min-h-[520px]">
      {/* Panel izquierdo — texto */}
      <div
        className="flex-1 flex flex-col justify-between px-10 py-16 md:px-16 md:py-20"
        style={{ background: 'var(--pub-accent)' }}
      >
        <div className="flex flex-col gap-6 max-w-sm">
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Nuestra clínica
          </p>

          <h2
            className="text-4xl md:text-5xl font-extrabold uppercase leading-[1.1] text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Profesionales
            <br />
            certificados
          </h2>

          <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
            Cada tratamiento es aplicado por especialistas con formación médica y
            estética, usando tecnología de vanguardia para resultados seguros y
            duraderos.
          </p>
        </div>

        <Link
          href="/nosotros"
          className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-70 mt-10 w-fit"
          style={{ color: '#fff' }}
        >
          Conoce a nuestro equipo
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>

      {/* Panel derecho — imagen */}
      <div
        className="flex-1 relative min-h-[320px] md:min-h-[520px]"
        style={{ background: 'var(--pub-accent-light)' }}
      >
        <Image
          src="/images/clinic-interior.jpg"
          alt="Interior de la clínica Sbeltic"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          // placeholder="blur" — agregar cuando haya imagen real
        />

        {/* Overlay de texto sobre la imagen */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-10"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)',
          }}
        >
          <Link
            href="/contacto"
            className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase w-fit text-white transition-opacity hover:opacity-70"
          >
            Agenda tu visita
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  )
}
