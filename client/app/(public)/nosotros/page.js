// TODO: Página Sobre Nosotros
// Contenido estático — sin fetch de API
import NosotrosPage from "@/components/public/NosotrosPage";

export const metadata = {
  title: "Nosotros — Sbeltic",
  description: "Conoce nuestra clínica estética, nuestras instalaciones y el equipo detrás de Sbeltic.",
};

export default function NosotrosRoute() {
  return <NosotrosPage />;
}
