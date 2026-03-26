import Link from 'next/link'
import Image from 'next/image'

export default function DividerBanner({
  imageSrc = '/images/divider-banner.jpg',
  buttonText = 'Agenda tu Consulta',
  buttonHref = '/contacto',
}) {
  return (
    <section
      className="relative flex items-center justify-center h-64 md:h-80 overflow-hidden"
    >
      {/* Imagen de fondo */}
      <Image
        src={imageSrc}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority={false}
      />

      {/* Overlay oscuro */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.48)' }}
      />

      {/* CTA centrado */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6">
        <p
          className="text-xs font-semibold tracking-[0.3em] uppercase"
          style={{ color: 'rgba(255,255,255,0.7)' }}
        >
          Resultados reales, cuidado profesional
        </p>
        <Link
          href={buttonHref}
          className="px-10 py-4 rounded-full text-sm font-bold tracking-widest uppercase border-2 border-white text-white transition-colors hover:bg-white hover:text-black"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  )
}
