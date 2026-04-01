import Image from "next/image";
import { BASE_URL } from "./constants";

export default function CollectionHeader({ category, fallbackTitle }) {
  const hasImage = category?.image;
  const title = category?.name || fallbackTitle;

  const imgSrc = hasImage
    ? `${BASE_URL}${category.image}`
    : "https://res.cloudinary.com/demo/image/upload/v1/spa_products.jpg";

  return (
    <section className="w-full pt-28 md:pt-50 pb-10 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row w-full min-h-75 md:min-h-112.5 border border-black/20 bg-white">
        {/* Panel Izquierdo - Título */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-black/20">
          <h1
            className="text-4xl md:text-5xl lg:text-[4rem] font-light tracking-wide text-center"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--pub-text)",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Panel Derecho - Imagen */}
        <div className="flex-1 relative min-h-62.5 md:min-h-0 bg-[#E8E8E8]">
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover"
            unoptimized
            priority
          />
        </div>
      </div>
    </section>
  );
}
