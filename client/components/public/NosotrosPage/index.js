// TODO: Ensambla todas las secciones de la página Nosotros
import NosotrosHero from "./NosotrosHero";
import HistoriaSection from "./HistoriaSection";
import InstalacionesGallery from "./InstalacionesGallery";
import ValoresSection from "./ValoresSection";
import InstalacionesToGallery from "./InstalacionesGallery";
import BookingBanner from "@/components/public/home/shared/BookingBanner";

export default function NosotrosPage() {
  return (
    <>
      <NosotrosHero />
      <HistoriaSection />
      <InstalacionesGallery />
      <ValoresSection />
      <InstalacionesToGallery />
      <BookingBanner />
    </>
  );
}
