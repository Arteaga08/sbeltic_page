import Link from "next/link";
import Image from "next/image";
import SectionEyebrow from "./shared/SectionEyebrow";
import SectionHeading from "./shared/SectionHeading";

export default function ClinicSection({ videoSrc }) {
  return (
    <section className="flex flex-col md:flex-row min-h-[90svh] lg:min-h-[90svh] w-full border border-black/40">
      {/* Panel izquierdo — texto sobre la clínica */}
      <div
        className="flex-none w-full md:w-1/2 min-h-72 md:min-h-0 relative flex flex-col justify-start md:justify-center px-6 pt-8 pb-8 md:py-16 md:px-16 lg:px-24 overflow-hidden border-b md:border-b-0 md:border-r border-black/40"
        style={{ background: "var(--pub-accent)" }}
      >
        {/* Arco decorativo — esquina superior derecha */}
       

        <div className="relative z-10 flex flex-col gap-3 md:gap-6 max-w-md items-center md:items-start text-center md:text-left">
          <SectionEyebrow variant="light">
            Clínica estética
          </SectionEyebrow>

          <SectionHeading
            lightText="Un espacio"
            boldText="diseñado para ti"
            sizeClasses="text-3xl md:text-5xl lg:text-7xl"
            textColor="white"
            boldColor="white"
            break
          />

          <div className="w-50 h-px bg-white/30" />

          <p
            className="text-sm md:text-lg leading-relaxed font-light max-w-sm"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            <span className="md:hidden">
              Un espacio pensado para tu bienestar.
            </span>
            <span className="hidden md:inline">
              Cada detalle de nuestra clínica fue pensado para brindarte una
              experiencia de bienestar única, en un ambiente profesional y
              acogedor.
            </span>
          </p>

          <Link
            href="/nosotros"
            className="mt-2 w-full md:w-fit text-center px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase border border-white text-white transition-all duration-200 hover:bg-white/15 hover:-translate-y-0.5 active:bg-white/25 active:scale-[0.97]"
          >
            Conoce nuestra clínica
          </Link>
        </div>
      </div>

      {/* Panel derecho — imagen o video */}
      <div className="flex-1 w-full md:flex-none md:w-1/2 relative overflow-hidden">
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src="https://res.cloudinary.com/demo/image/upload/v1/family_bench.jpg"
            alt="Interior de la clínica Sbeltic"
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}

        {/* Gradiente sutil para profundidad */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
