import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

export default function PackagesSection() {
  return (
    <section className="relative min-h-96 md:min-h-112 flex items-center">
      {/* Imagen fija de fondo */}
      <Image
        src="https://res.cloudinary.com/dnppruwh4/image/upload/v1769825914/skin1004-others--madagascar-centella-travel-kit-36440453349622_1440x_jv61vx.jpg"
        alt="Rutinas Sbeltic — Paquetes de skincare"
        fill
        unoptimized
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(26,22,20,0.85) 0%, rgba(26,22,20,0.55) 60%, rgba(26,22,20,0.3) 100%)',
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full py-16 md:py-20">
        <div className="max-w-lg">
          <p
            className="text-[10px] font-semibold tracking-[0.3em] uppercase mb-4"
            style={{ color: 'var(--pub-accent)' }}
          >
            Paquetes exclusivos
          </p>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="font-light text-white">Rutinas</span>
            <br />
            <span className="font-bold" style={{ color: 'var(--pub-accent)' }}>Sbeltic</span>
          </h2>

          <p className="text-sm md:text-base leading-relaxed max-w-md mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Paquetes curados por nuestros especialistas para potenciar tus resultados con una rutina completa de skincare.
          </p>

          <Link
            href="/productos?isPackage=true"
            className="inline-flex items-center gap-2.5 py-3.5 px-8 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            style={{ background: 'var(--pub-accent)', color: '#fff' }}
          >
            Ver paquetes
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  )
}
