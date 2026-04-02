import GoldDivider from "@/components/public/home/shared/GoldDivider";

/** Burbujas decorativas — posiciones y tamaños fijos */
const BUBBLES = [
  { top: "8%",  left: "3%",  size: 90  },
  { top: "18%", left: "12%", size: 48  },
  { top: "55%", left: "1%",  size: 120 },
  { top: "72%", left: "8%",  size: 55  },
  { top: "5%",  left: "30%", size: 34  },
  { top: "85%", left: "22%", size: 70  },
  { top: "10%", right: "4%", size: 100 },
  { top: "35%", right: "2%", size: 60  },
  { top: "65%", right: "6%", size: 130 },
  { top: "80%", right: "18%",size: 42  },
  { top: "20%", right: "20%",size: 28  },
  { top: "50%", left: "48%", size: 22  },
];

export default function RecoverySection({ treatment }) {
  const hasText = Boolean(treatment.recoveryText);
  const hasBullets = treatment.recoveryBullets?.length > 0;

  if (!hasText && !hasBullets) return null;

  return (
    <section
      className="relative w-full py-28 md:py-40 overflow-hidden"
      style={{ background: "var(--pub-bg)" }}
    >
      {/* ── Textura de burbujas ── */}
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: b.top,
            left: b.left,
            right: b.right,
            width: b.size,
            height: b.size,
            border: "1.5px solid rgba(0,0,0,0.07)",
            background:
              "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.6), rgba(255,255,255,0.05))",
            boxShadow: "inset 0 1px 3px rgba(255,255,255,0.8), 0 1px 4px rgba(0,0,0,0.04)",
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
            color: "var(--pub-gold)",
            fontSize: "clamp(2.8rem, 8vw, 6rem)",
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

        <GoldDivider size="sm" centered={true} className="mb-14 opacity-80" />

        {/* Párrafo intro */}
        {hasText && (
          <p
            className="font-light leading-[1.85] tracking-wide mb-10 text-left w-full"
            style={{
              color: "var(--pub-text)",
              fontSize: "clamp(1rem, 1.2vw, 1.1rem)",
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
                  style={{ background: "var(--pub-gold)" }}
                  aria-hidden
                />
                <span
                  className="font-extralight leading-[1.75] tracking-wide"
                  style={{
                    color: "var(--pub-text)",
                    fontSize: "clamp(0.95rem, 1.1vw, 1.05rem)",
                    opacity: 0.8,
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
