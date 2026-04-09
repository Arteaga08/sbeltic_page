import SectionEyebrow from "@/components/public/home/shared/SectionEyebrow";
import GoldDivider from "@/components/public/home/shared/GoldDivider";
import TreatmentCard from "@/components/public/TreatmentsPage/TreatmentCard";

export default function RelatedTreatmentsSection({ treatments }) {
  if (!treatments?.length) return null;

  return (
    <section
      className="w-full py-24 md:py-32"
      style={{ background: "var(--pub-accent-light)" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-14">
          <SectionEyebrow variant="gold" className="mb-5">
            También te puede interesar
          </SectionEyebrow>
          <h2
            className="font-bold uppercase leading-tight mb-6"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--pub-text)",
              fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
            }}
          >
            Tratamientos{" "}
            <span style={{ color: "var(--pub-accent)" }}>relacionados</span>
          </h2>
          <GoldDivider size="sm" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((treatment) => (
            <TreatmentCard key={treatment._id} treatment={treatment} />
          ))}
        </div>
      </div>
    </section>
  );
}
