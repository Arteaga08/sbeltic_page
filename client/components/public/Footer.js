import Link from "next/link";
import {
  InstagramLogo,
  FacebookLogo,
  TiktokLogo,
  Phone,
  EnvelopeSimple,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

const TRATAMIENTOS = [
  { label: "Facial", href: "/tratamientos?cat=facial" },
  { label: "Corporal", href: "/tratamientos?cat=corporal" },
  { label: "Láser", href: "/tratamientos?cat=laser" },
  { label: "Ver todos", href: "/tratamientos" },
];

const PRODUCTOS = [
  { label: "Skincare", href: "/productos?cat=skincare" },
  { label: "Hidratación", href: "/productos?cat=hidratacion" },
  { label: "Protección solar", href: "/productos?cat=solar" },
  { label: "Ver todos", href: "/productos" },
];

const EMPRESA = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Antes y después", href: "/antes-y-despues" },
  { label: "Contacto", href: "/contacto" },
];

export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{ background: "#111111", color: "#d4d0cb" }}
    >
      {/* Contenedor Principal - Paddings reducidos en móvil (py-10) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-8">
          {/* Columna 1: Marca, Redes y Newsletter */}
          <div className="lg:w-4/12 flex flex-col gap-6 lg:pr-8">
            <div className="flex flex-col gap-3">
              <span
                className="text-3xl font-light tracking-[0.2em] uppercase"
                style={{ color: "#ffffff", fontFamily: "var(--font-heading)" }}
              >
                Sbeltic
              </span>
              <p
                className="text-sm leading-snug font-light max-w-sm"
                style={{ color: "#9e9a94" }}
              >
                Clínica estética profesional. Elevando tu bienestar con
                tratamientos de la más alta calidad.
              </p>

              {/* Redes Sociales compactas */}
              <div className="flex items-center gap-4 mt-1">
                <a
                  href="https://instagram.com/sbelticdurango"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-[#9e9a94] hover:text-white transition-all hover:scale-110"
                >
                  <InstagramLogo size={20} weight="regular" />
                </a>
                <a
                  href="https://facebook.com/sbeltic"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-[#9e9a94] hover:text-white transition-all hover:scale-110"
                >
                  <FacebookLogo size={20} weight="regular" />
                </a>
                <a
                  href="https://tiktok.com/@sbeltic"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="text-[#9e9a94] hover:text-white transition-all hover:scale-110"
                >
                  <TiktokLogo size={20} weight="regular" />
                </a>
              </div>
            </div>

            {/* Mini Newsletter más pegado */}
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-bold tracking-widest uppercase text-white">
                Únete a nuestra lista
              </p>
              <form className="flex items-center border-b border-[#2a2a2a] pb-1 transition-colors focus-within:border-white">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#6b6760] text-white py-1"
                />
                <button
                  type="button"
                  aria-label="Suscribirse"
                  className="text-[#9e9a94] hover:text-white transition-colors px-1"
                >
                  <ArrowRight size={18} weight="light" />
                </button>
              </form>
            </div>
          </div>

          {/* Columnas de Navegación (Grid ajustado y gap reducido) */}
          <div className="lg:w-8/12 grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 lg:ml-auto w-full">
            {/* Columna Tratamientos */}
            <div className="flex flex-col gap-3 md:gap-4">
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white">
                Tratamientos
              </h3>
              <ul className="flex flex-col gap-2.5">
                {TRATAMIENTOS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-light transition-all hover:text-white hover:translate-x-1"
                      style={{ color: "#9e9a94" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna Productos */}
            <div className="flex flex-col gap-3 md:gap-4">
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white">
                Productos
              </h3>
              <ul className="flex flex-col gap-2.5">
                {PRODUCTOS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-light transition-all hover:text-white hover:translate-x-1"
                      style={{ color: "#9e9a94" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna Contacto (Ocupa 2 columnas en móvil para no amontonarse, pero sin altura excesiva) */}
            <div className="col-span-2 md:col-span-1 flex flex-col gap-3 md:gap-4">
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-white">
                Contacto
              </h3>
              <ul className="flex flex-col gap-2.5">
                <li>
                  {/* Iconos sin fondo para ahorrar espacio vertical */}
                  <a
                    href="tel:+526180000000"
                    className="flex items-center gap-2 text-sm font-light transition-colors hover:text-white"
                    style={{ color: "#9e9a94" }}
                  >
                    <Phone size={15} weight="fill" />
                    (618) 000-0000
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hola@sbeltic.com"
                    className="flex items-center gap-2 text-sm font-light transition-colors hover:text-white mb-1"
                    style={{ color: "#9e9a94" }}
                  >
                    <EnvelopeSimple size={15} weight="fill" />
                    hola@sbeltic.com
                  </a>
                </li>
                {EMPRESA.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-light transition-all hover:text-white hover:translate-x-1"
                      style={{ color: "#9e9a94" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Ultra compacta, 2 líneas en móvil */}
      <div className="border-t border-[#2a2a2a]">
        <div
          className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] md:text-[11px] font-light tracking-wide text-center"
          style={{ color: "#6b6760" }}
        >
          {/* Enlaces legales */}
          <div className="flex items-center justify-center gap-5 md:order-2">
            <Link
              href="/privacidad"
              className="transition-colors hover:text-white"
            >
              Aviso de Privacidad
            </Link>
            <Link
              href="/terminos"
              className="transition-colors hover:text-white"
            >
              Términos de Uso
            </Link>
          </div>

          {/* Copyright y firma en la misma sección en móvil */}
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6 md:order-1">
            <p>
              © {new Date().getFullYear()} Sbeltic. Todos los derechos
              reservados.
            </p>
            <div className="flex items-center justify-center gap-1.5 text-[#9e9a94]">
              <span>Diseñado por</span>
              <a
                href="https://vidix.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold tracking-widest uppercase transition-colors hover:text-white"
              >
                Vidix Studio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
