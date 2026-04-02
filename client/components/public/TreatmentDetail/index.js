import HeroSection from "./HeroSection";
import StatsBar from "./StatsBar";
import WhySbelticSection from "./WhySbelticSection";
import AboutTreatmentSection from "./AboutTreatmentSection";
import ProcedureSection from "./ProcedureSection";
import BenefitsSection from "./BenefitsSection";
import CandidatesSection from "./CandidatesSection";
import BeforeAfterGallery from "./BeforeAfterGallery";
import RecoverySection from "./RecoverySection";
import FaqAccordion from "./FaqAccordion";
import RelatedTreatmentsSection from "./RelatedTreatmentsSection";
import CtaSection from "./CtaSection";
import BookingBanner from "@/components/public/home/shared/BookingBanner";
import { FAQ_LABELS } from "./constants";
import InfiniteCarousel from "../home/shared/InfiniteCarousel";

function buildFaqItems(treatment) {
  const items = [];
  if (treatment.preparation)
    items.push({ title: FAQ_LABELS.preparation, content: treatment.preparation, type: "text" });
  if (treatment.aftercare)
    items.push({ title: FAQ_LABELS.aftercare, content: treatment.aftercare, type: "text" });
  if (treatment.contraindications?.length > 0)
    items.push({ title: FAQ_LABELS.contraindications, content: treatment.contraindications, type: "list" });
  return items;
}

export default function TreatmentDetail({ treatment, related = [] }) {
  const hasStats = treatment.duration || treatment.sessions || treatment.downtime || treatment.resultsIn;
  const hasWhySbeltic = Boolean(treatment.whySbeltic);
  const hasAboutTreatment = Boolean(treatment.aboutTreatment);
  const hasProcedure = treatment.procedureSteps?.length > 0;
  const hasBenefits = treatment.benefits?.length > 0;
  const hasCandidates = Boolean(treatment.candidatesText) || treatment.candidatesBullets?.length > 0;
  const hasRecovery = Boolean(treatment.recoveryText) || treatment.recoveryBullets?.length > 0;
  const hasBeforeAfter = treatment.beforeAfterImages?.length > 0;
  const faqItems = buildFaqItems(treatment);

  return (
    <article>
      <HeroSection treatment={treatment} />
      {hasStats && <StatsBar treatment={treatment} />}
      {hasWhySbeltic && <WhySbelticSection treatment={treatment} />}
      {hasAboutTreatment && <AboutTreatmentSection treatment={treatment} />}
      {hasProcedure && <ProcedureSection treatment={treatment} />}
      <InfiniteCarousel />
      {hasBenefits && <BenefitsSection treatment={treatment} />}
      {hasCandidates && <CandidatesSection treatment={treatment} />}
      {hasRecovery && <RecoverySection treatment={treatment} />}
      {hasBeforeAfter && <BeforeAfterGallery images={treatment.beforeAfterImages} />}
      {faqItems.length > 0 && <FaqAccordion items={faqItems} />}
      <RelatedTreatmentsSection treatments={related} />
      <CtaSection treatment={treatment} />
      <BookingBanner />
    </article>
  );
}
