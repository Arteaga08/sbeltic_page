import Image from "next/image";
import GoldDivider from "@/components/public/home/shared/GoldDivider";
import { BASE_URL } from "./constants";

function parseBlocks(text) {
  const lines = text.split(/\n/).filter(Boolean);
  const blocks = [];
  let currentBullets = [];

  for (const line of lines) {
    const match = line.match(/^[-*•]\s+(.+)/);
    if (match) {
      currentBullets.push(match[1]);
    } else {
      if (currentBullets.length) {
        blocks.push({ type: "bullets", items: [...currentBullets] });
        currentBullets = [];
      }
      blocks.push({ type: "paragraph", text: line });
    }
  }
  if (currentBullets.length) {
    blocks.push({ type: "bullets", items: currentBullets });
  }
  return blocks;
}

export default function AboutTreatmentSection({ treatment }) {
  if (!treatment.aboutTreatment) return null;

  const blocks = parseBlocks(treatment.aboutTreatment);

  return (
    <section
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--pub-accent-light)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

        {/* ── Columna texto ── */}
        <div className="flex flex-col items-start text-left">

          {/* Eyebrow */}
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-3"
            style={{
              color: "var(--pub-text)",
              opacity: 0.5,
            }}
          >
            Descubre el
          </p>

          {/* Título principal */}
          <h2
            className="font-bold uppercase leading-none mb-4"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--pub-gold)",
              fontSize: "clamp(2.75rem, 6vw, 4.5rem)",
              letterSpacing: "0.06em",
            }}
          >
            Tratamiento
          </h2>

          {/* Subtítulo */}
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-8"
            style={{
              color: "var(--pub-text)",
              opacity: 0.5,
            }}
          >
            ¿En qué consiste el {treatment.name}?
          </p>

          <GoldDivider size="sm" centered={false} className="mb-12 opacity-80" />

          {/* Cuerpo — párrafos y viñetas */}
          <div className="space-y-6 w-full">
            {blocks.map((block, i) => {
              if (block.type === "bullets") {
                return (
                  <ul key={i} className="flex flex-col gap-4 w-full">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-4">
                        <span
                          className="mt-[0.45em] shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{ background: "var(--pub-gold)" }}
                          aria-hidden
                        />
                        <span
                          className="font-extralight leading-[1.75] tracking-wide"
                          style={{
                            color: "var(--pub-text)",
                            fontSize: "clamp(1rem, 1.15vw, 1.125rem)",
                            opacity: 0.8,
                          }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={i}
                  className="leading-[1.85] tracking-wide text-justify font-light"
                  style={{
                    color: "var(--pub-text)",
                    fontSize: "clamp(1rem, 1.15vw, 1.125rem)",
                    opacity: 0.85,
                  }}
                >
                  {block.text}
                </p>
              );
            })}
          </div>
        </div>

        {/* ── Columna imagen ── */}
        {treatment.aboutTreatmentImage && (
          <div className="flex justify-center md:justify-end">
            <div
              className="relative w-full overflow-hidden"
              style={{
                maxWidth: "460px",
                aspectRatio: "3 / 4",
                borderRadius: "50% 50% 50% 50% / 12% 12% 12% 12%",
                border: "1.5px solid",
                borderColor: "var(--pub-gold)",
                boxShadow: "0 0 0 8px var(--pub-bg), 0 0 0 9.5px rgba(var(--pub-gold-rgb, 180,148,90), 0.2)",
              }}
            >
              <Image
                src={`${BASE_URL}${treatment.aboutTreatmentImage}`}
                alt={`Tratamiento ${treatment.name}`}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
