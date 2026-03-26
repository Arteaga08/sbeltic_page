import Link from 'next/link'
import { InstagramLogo, FacebookLogo, TiktokLogo, Phone, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'

const TRATAMIENTOS = [
  { label: 'Facial', href: '/tratamientos?cat=facial' },
  { label: 'Corporal', href: '/tratamientos?cat=corporal' },
  { label: 'Láser', href: '/tratamientos?cat=laser' },
  { label: 'Ver todos', href: '/tratamientos' },
]

const PRODUCTOS = [
  { label: 'Skincare', href: '/productos?cat=skincare' },
  { label: 'Hidratación', href: '/productos?cat=hidratacion' },
  { label: 'Protección solar', href: '/productos?cat=solar' },
  { label: 'Ver todos', href: '/productos' },
]

const EMPRESA = [
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Antes y después', href: '/antes-y-despues' },
  { label: 'Contacto', href: '/contacto' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#141414', color: '#d4d0cb' }}>
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Columna 1: Marca */}
        <div className="flex flex-col gap-4">
          <span
            className="text-2xl font-extrabold tracking-[0.22em] uppercase"
            style={{ color: '#fff', fontFamily: 'var(--font-heading)' }}
          >
            Sbeltic
          </span>
          <p className="text-sm leading-relaxed" style={{ color: '#9e9a94' }}>
            Clínica estética profesional con tratamientos y productos de alta calidad para el cuidado de tu piel.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://instagram.com/sbeltic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-opacity hover:opacity-70"
              style={{ color: '#fff' }}
            >
              <InstagramLogo size={20} weight="fill" />
            </a>
            <a
              href="https://facebook.com/sbeltic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-opacity hover:opacity-70"
              style={{ color: '#fff' }}
            >
              <FacebookLogo size={20} weight="fill" />
            </a>
            <a
              href="https://tiktok.com/@sbeltic"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="transition-opacity hover:opacity-70"
              style={{ color: '#fff' }}
            >
              <TiktokLogo size={20} weight="fill" />
            </a>
          </div>
        </div>

        {/* Columna 2: Tratamientos */}
        <div className="flex flex-col gap-4">
          <h3
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: '#fff', fontFamily: 'var(--font-heading)' }}
          >
            Tratamientos
          </h3>
          <ul className="flex flex-col gap-2.5">
            {TRATAMIENTOS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: '#9e9a94' }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 3: Productos */}
        <div className="flex flex-col gap-4">
          <h3
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: '#fff', fontFamily: 'var(--font-heading)' }}
          >
            Productos
          </h3>
          <ul className="flex flex-col gap-2.5">
            {PRODUCTOS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: '#9e9a94' }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 4: Contacto */}
        <div className="flex flex-col gap-4">
          <h3
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: '#fff', fontFamily: 'var(--font-heading)' }}
          >
            Contacto
          </h3>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="tel:+52-55-0000-0000"
                className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                style={{ color: '#9e9a94' }}
              >
                <Phone size={15} weight="fill" />
                (55) 0000-0000
              </a>
            </li>
            <li>
              <a
                href="mailto:hola@sbeltic.com"
                className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                style={{ color: '#9e9a94' }}
              >
                <EnvelopeSimple size={15} weight="fill" />
                hola@sbeltic.com
              </a>
            </li>
            {EMPRESA.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: '#9e9a94' }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t px-6 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
        style={{ borderColor: '#2a2a2a', color: '#6b6760' }}
      >
        <p>© {new Date().getFullYear()} Sbeltic. Todos los derechos reservados.</p>
        <div className="flex gap-4">
          <Link href="/privacidad" className="transition-colors hover:text-white">Aviso de privacidad</Link>
          <Link href="/terminos" className="transition-colors hover:text-white">Términos de uso</Link>
        </div>
      </div>
    </footer>
  )
}
