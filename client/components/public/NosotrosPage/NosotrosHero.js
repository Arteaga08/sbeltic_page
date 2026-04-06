import Image from "next/image";
import SectionEyebrow from "@/components/public/home/shared/SectionEyebrow";
import GoldDivider from "@/components/public/home/shared/GoldDivider";

export default function NosotrosHero() {
  return (
    <section className="relative w-full h-[40vh] md:h-[55vh] overflow-hidden">
      <Image
        src="https://res.cloudinary.com/demo/image/upload/v1/family_bench.jpg"
        alt="Clínica Sbeltic — Nuestras instalaciones"
        fill
        unoptimized
        priority
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.72) 100%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-end h-full text-center px-6 pb-12 md:pb-20">
        <div className="flex justify-center w-full mb-4">
          <SectionEyebrow variant="light" className="m-0 text-center">
            Sbeltic | Clínica Estética
          </SectionEyebrow>
        </div>
        <h1
          className="font-extrabold leading-[1.05] text-white mb-3 tracking-widest uppercase"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          }}
        >
          Nosotros
        </h1>
        <h2
          className="font-light uppercase tracking-[0.4em] mb-6 text-xs md:text-sm"
          style={{ color: "var(--pub-gold)" }}
        >
          Nuestra Clinica
        </h2>
        <GoldDivider size="lg" className="w-24 md:w-32 mx-auto" />
      </div>
    </section>
  );
}
