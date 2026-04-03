"use client";

import { motion } from "framer-motion";
import GoldDivider from "@/components/public/home/shared/GoldDivider";

/** Burbujas decorativas — generadas con tamaños, posiciones y velocidades aleatorias */
const BUBBLES = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  size: Math.random() * (120 - 20) + 20,
  x: Math.random() * 100, // % de la pantalla (left)
  y: Math.random() * 100, // % de la pantalla (top)
  duration: Math.random() * (20 - 10) + 10, // velocidad distinta para cada una
  delay: Math.random() * 2, // Desfase para que no empiecen a moverse igual
}));

export default function RecoverySection({ treatment }) {
  const hasText = Boolean(treatment.recoveryText);
  const hasBullets = treatment.recoveryBullets?.length > 0;

  if (!hasText && !hasBullets) return null;

  return (
    <section
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--pub-accent-light)" }}
    >
      {/* ── Textura de burbujas animadas con Framer Motion ── */}
      {BUBBLES.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.x}%`,
            top: `${b.y}%`,
            border: "1.5px solid rgba(62,166,163,0.15)",
            background:
              "radial-gradient(circle at 35% 35%, rgba(62,166,163,0.18), rgba(62,166,163,0.04))",
            boxShadow:
              "inset 0 1px 3px rgba(255,255,255,0.6), 0 1px 6px rgba(62,166,163,0.08)",
            backdropFilter: "blur(4px)", // El toque de lujo (Glassmorphism)
            zIndex: 1,
          }}
          animate={{
            y: [0, -30, 0], // Flotan hacia arriba y vuelven
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: b.delay,
          }}
          aria-hidden
        />
      ))}

      {/* ── Contenido centrado ── */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-10 flex flex-col items-center text-center">
        {/* Título principal */}
        <h2
          className="font-bold uppercase leading-none mb-5"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--pub-accent)",
            fontSize: "clamp(2.75rem, 6vw, 4.5rem)",
            letterSpacing: "0.06em",
          }}
        >
          Recuperación
        </h2>

        {/* Subtítulo */}
        <p
          className="font-semibold uppercase mb-10"
          style={{
            color: "var(--pub-text)",
            opacity: 0.5,
            fontSize: "clamp(0.65rem, 1vw, 0.75rem)",
            letterSpacing: "0.3em",
          }}
        >
          {treatment.name} — Cuidados post-tratamiento
        </p>

        <GoldDivider
          size="sm"
          centered={true}
          className="mb-14 opacity-80"
          color="--pub-accent"
        />

        {/* Párrafo intro */}
        {hasText && (
          <p
            className="font-light leading-[1.85] tracking-wide mb-10 text-justify w-full"
            style={{
              color: "var(--pub-text)",
              fontSize: "clamp(1rem, 1.15vw, 1.125rem)",
              opacity: 0.85,
            }}
          >
            {treatment.recoveryText}
          </p>
        )}

        {/* Lista de viñetas */}
        {hasBullets && (
          <ul className="flex flex-col gap-5 w-full text-left">
            {treatment.recoveryBullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="mt-[0.5em] shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--pub-accent)" }}
                  aria-hidden
                />
                <span
                  className="font-semibold leading-[1.75] tracking-wide"
                  style={{
                    color: "var(--pub-text)",
                    fontSize: "clamp(1rem, 1.15vw, 1.125rem)",
                    opacity: 0.85,
                  }}
                >
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
