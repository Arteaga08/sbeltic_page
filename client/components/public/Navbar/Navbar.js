"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Phone,
  List,
  InstagramLogo,
  FacebookLogo,
  TiktokLogo,
} from "@phosphor-icons/react";
import AnnouncementBar from "./AnnouncementBar";
import NavMobile from "./NavMobile";

const NAV_LINKS = [
  { label: "Tratamientos", href: "/tratamientos" },
  { label: "Productos", href: "/productos" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Antes y después", href: "/antes-y-despues" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // 📞 VARIABLES DE CONTACTO
  const officialPhone = "+526180000000";
  const displayPhone = "(618) 000-0000";
  const whatsappLink = `https://wa.me/${officialPhone.replace("+", "")}?text=Hola,%20me%20gustaría%20agendar%20una%20cita%20en%20Sbeltic.`;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrolled(currentScrollPos > 10);
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  return (
    <>
      <header
        // Aquí está la magia de la sutileza: duration-700 y la curva cubic-bezier
        className={`fixed inset-x-0 top-0 z-30 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] bg-white ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          background: "var(--pub-surface)",
          boxShadow: scrolled ? "var(--shadow-md)" : "none",
        }}
      >
        <AnnouncementBar />

        {/* Nivel 1: Redes + Teléfono | Logo | CTA */}
        <div
          className="relative flex items-center justify-between px-6 md:px-10 py-3 border-b transition-colors"
          style={{ borderColor: "var(--pub-border)" }}
        >
          {/* Izquierda: Redes Sociales y Teléfono */}
          <div className="hidden md:flex flex-1 items-center gap-5">
            <div
              className="flex items-center gap-4 border-r pr-5"
              style={{ borderColor: "var(--pub-border)" }}
            >
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-150 hover:opacity-60"
                style={{ color: "var(--pub-text-muted)" }}
              >
                <InstagramLogo size={22} weight="regular" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-150 hover:opacity-60"
                style={{ color: "var(--pub-text-muted)" }}
              >
                <FacebookLogo size={22} weight="regular" />
              </a>
              {/* Nuevo icono de TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-150 hover:opacity-60"
                style={{ color: "var(--pub-text-muted)" }}
              >
                <TiktokLogo size={22} weight="regular" />
              </a>
            </div>
            <a
              href={`tel:${officialPhone}`}
              className="flex items-center gap-2 text-base font-medium transition-colors hover:text-slate-900"
              style={{ color: "var(--pub-text-muted)" }}
            >
              <Phone size={18} weight="fill" />
              {displayPhone}
            </a>
          </div>

          {/* Centro: Espacio para Logo */}
          {/* Centro: Espacio para Logo (Centrado solo en Desktop, izquierda en Móvil) */}
          <Link
            href="/"
            className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex items-center transition-opacity hover:opacity-90 z-10"
          >
            <span
              className="text-2xl md:text-3xl font-extrabold tracking-[0.2em] uppercase"
              style={{
                color: "var(--pub-accent)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Sbeltic
            </span>
          </Link>

          {/* Derecha: CTA y Hamburguesa (Ambos visibles en móvil) */}
          <div className="flex flex-1 items-center justify-end gap-3 md:gap-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-5 md:px-7 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-150 hover:bg-slate-800 shadow-sm"
              style={{ background: "var(--pub-accent)", color: "#fff" }}
            >
              Agendar
            </a>

            <button
              className="md:hidden p-1.5 rounded-md transition-colors hover:bg-slate-100"
              style={{ color: "var(--pub-text)" }}
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <List size={28} weight="bold" />
            </button>
          </div>
        </div>

        {/* Nivel 2: Links de navegación */}
        <nav className="hidden md:flex items-center justify-center gap-14 px-10 py-4 lg:py-5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-[0.15em] uppercase transition-colors duration-150 hover:opacity-60"
              style={{
                color: "var(--pub-text)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Menú Móvil */}
      <NavMobile open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
