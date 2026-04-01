"use client";

export default function InfiniteCarousel() {
  const PHRASES = [
    "Cuidado de grado médico",
    "Fórmulas respaldadas por la ciencia",
    "Envío gratis en compras mayores a $2,000",
    "Belleza sin complicaciones",
    "Resultados naturales",
  ];

  return (
    <div className="w-full border-y border-black/10 overflow-hidden py-5 md:py-6 bg-white">
      {/* 
        Usamos tu animación nativa de Tailwind. 
        Le puse 50s para que sea más lento, pero puedes regresarlo a 25s si lo prefieres.
      */}
      <div className="flex w-max animate-[marquee_50s_linear_infinite] hover:[animation-play-state:paused] transition-all cursor-default">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex whitespace-nowrap items-center">
            {PHRASES.map((phrase, index) => (
              <span
                key={index}
                className="text-lg md:text-xl italic font-light px-8 md:px-12"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--pub-text)",
                }}
              >
                {phrase}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
