"use client";

import {
  X,
  InstagramLogo,
  FacebookLogo,
  TiktokLogo,
  Phone,
} from "@phosphor-icons/react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Tratamientos", href: "/tratamientos" },
  { label: "Productos", href: "/productos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Antes y después", href: "/antes-y-despues" },
  { label: "Contacto", href: "/contacto" },
];

export default function NavMobile({ open, onClose }) {
  // 📞 VARIABLES DE CONTACTO
  const officialPhone = "+526180000000";
  const displayPhone = "(618) 000-0000";
  const whatsappLink = `https://wa.me/${officialPhone.replace("+", "")}?text=Hola,%20me%20gustaría%20agendar%20una%20cita%20en%20Sbeltic.`;

  return (
    <>
      {/* Overlay oscuro con desenfoque */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer lateral derecho */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-[85vw] sm:max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header del drawer */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100">
          <span
            className="text-xl font-extrabold tracking-[0.2em] uppercase"
            style={{
              color: "var(--pub-accent)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Sbeltic
          </span>
          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="p-2 -mr-2 rounded-full transition-colors hover:bg-slate-50"
            style={{ color: "var(--pub-text-muted)" }}
          >
            <X size={24} weight="bold" />
          </button>
        </div>

        {/* Links de navegación */}
        <nav className="flex flex-col px-8 py-10 gap-8 flex-1 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="text-2xl font-light tracking-widest uppercase transition-colors hover:opacity-60"
              style={{
                color: "var(--pub-text)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Footer del Drawer: Teléfono, Redes y Botón */}
        <div className="px-8 pb-10 pt-8 border-t border-slate-100 bg-slate-50/50 flex flex-col items-center">
          {/* Teléfono Directo */}
          <a
            href={`tel:${officialPhone}`}
            className="flex items-center gap-2 text-base font-medium transition-colors hover:text-slate-900 mb-6"
            style={{ color: "var(--pub-text-muted)" }}
          >
            <Phone size={20} weight="fill" />
            {displayPhone}
          </a>

          {/* Redes Sociales */}
          <div
            className="flex items-center justify-center gap-8 mb-8"
            style={{ color: "var(--pub-text-muted)" }}
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-slate-900"
            >
              <InstagramLogo size={28} weight="regular" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-slate-900"
            >
              <FacebookLogo size={28} weight="regular" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-slate-900"
            >
              <TiktokLogo size={28} weight="regular" />
            </a>
          </div>

          {/* CTA principal */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            className="flex items-center justify-center w-full py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-colors duration-150 hover:opacity-90 shadow-md"
            style={{ background: "var(--pub-accent)", color: "#fff" }}
          >
            Agendar Consulta
          </a>
        </div>
      </div>
    </>
  );
}
