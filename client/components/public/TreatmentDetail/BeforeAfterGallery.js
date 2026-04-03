import Image from "next/image";
import SectionEyebrow from "@/components/public/home/shared/SectionEyebrow";
import GoldDivider from "@/components/public/home/shared/GoldDivider";
import { BASE_URL } from "./constants";

export default function BeforeAfterGallery({ images }) {
  const isSingle = images.length === 1;

  return (
    <section
      className="w-full py-20 md:py-32"
      style={{ background: "var(--pub-accent-light)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <SectionEyebrow variant="gold" className="mb-5">
            Resultados reales
          </SectionEyebrow>
          <h2
            className="font-bold leading-tight mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--pub-text)",
              fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
            }}
          >
            Antes y{" "}
            <span style={{ color: "var(--pub-accent)" }}>después</span>
          </h2>
          <GoldDivider size="sm" />
        </div>

        <div className={isSingle ? "max-w-2xl mx-auto" : "grid grid-cols-1 md:grid-cols-2 gap-6"}>
          {images.map((img, i) => (
            <div
              key={i}
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "4/3",
                borderRadius: "var(--radius-lg)",
                background: "var(--pub-cream)",
              }}
            >
              <Image
                src={`${BASE_URL}${img}`}
                alt={`Resultado ${i + 1}`}
                fill
                unoptimized
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
