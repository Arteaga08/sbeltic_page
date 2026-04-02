import { ClockIcon } from "@phosphor-icons/react/dist/ssr/Clock";
import { CalendarDotsIcon } from "@phosphor-icons/react/dist/ssr/CalendarDots";
import { PauseIcon } from "@phosphor-icons/react/dist/ssr/Pause";
import { SparkleIcon } from "@phosphor-icons/react/dist/ssr/Sparkle";

const STATS = [
  { key: "duration", label: "Duración", Icon: ClockIcon },
  { key: "sessions", label: "Sesiones", Icon: CalendarDotsIcon },
  { key: "downtime", label: "Recuperación", Icon: PauseIcon },
  { key: "resultsIn", label: "Resultados desde", Icon: SparkleIcon },
];

function StatItem({ label, value, Icon }) {
  return (
    // Quitamos los paddings exagerados y dejamos que flex-1 dicte el ancho
    <div className="flex flex-col items-center gap-2 md:gap-3 px-1 md:px-4 text-center w-full">
      <Icon
        size={24}
        className="md:w-9 md:h-9"
        weight="duotone"
        style={{ color: "var(--pub-gold)" }}
        aria-hidden
      />
      <span
        className="font-bold leading-tight"
        style={{
          color: "var(--pub-text)",
          fontSize: "clamp(0.8rem, 2.5vw, 1.25rem)", // Escala para que quepa bien en móvil
        }}
      >
        {value}
      </span>
      <span
        className="text-[9px] md:text-[11px] tracking-widest md:tracking-[0.2em] uppercase font-semibold"
        style={{ color: "var(--pub-text-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function StatsBar({ treatment }) {
  const visibleStats = STATS.filter(({ key }) => treatment[key]);

  return (
    <div
      className="w-full border-y"
      style={{
        background: "var(--pub-surface)",
        borderColor: "var(--pub-border)",
      }}
    >
      <div className="max-w-7xl mx-auto py-6 md:py-12 px-2 md:px-6">
        {/* flex w-full nos asegura que tome el 100% de la barra */}
        <div className="flex w-full items-stretch justify-between">
          {visibleStats.map(({ key, label, Icon }, i) => (
            // MAGIA AQUÍ: flex-1 fuerza a que todos midan EXACTAMENTE lo mismo (ej. 33.33% si son 3)
            <div
              key={key}
              className="flex-1 flex relative items-center justify-center"
            >
              <StatItem label={label} value={treatment[key]} Icon={Icon} />

              {/* DIVISOR: absolute right-0 hace que no ocupe espacio y no arruine la división equitativa */}
              {i < visibleStats.length - 1 && (
                <div
                  className="absolute right-0 top-2 bottom-2 w-px opacity-20"
                  style={{ background: "var(--pub-text-muted)" }}
                  aria-hidden
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
