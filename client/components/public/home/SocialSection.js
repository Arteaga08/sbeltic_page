"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  InstagramLogoIcon,
} from "@phosphor-icons/react";
import SectionEyebrow from "./shared/SectionEyebrow";

const IG_GRADIENT =
  "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)";

// Posts placeholder — se usan mientras no haya token de IG configurado
const DEMO_VIDEO =
  "https://res.cloudinary.com/demo/video/upload/w_600,h_1066,c_fill,q_auto/sea_turtle.mp4";
const DEMO_THUMB =
  "https://res.cloudinary.com/demo/video/upload/so_0,w_600,h_1066,c_fill,q_auto,f_jpg/sea_turtle.mp4";
const PLACEHOLDER_POSTS = [
  {
    id: "ph-1",
    media_type: "VIDEO",
    media_url: DEMO_VIDEO,
    thumbnail_url: DEMO_THUMB,
    permalink: "https://instagram.com/sbeltic",
    caption: "Tratamiento facial",
  },
  {
    id: "ph-2",
    media_type: "VIDEO",
    media_url: DEMO_VIDEO,
    thumbnail_url: DEMO_THUMB,
    permalink: "https://instagram.com/sbeltic",
    caption: "Resultados reales",
  },
  {
    id: "ph-3",
    media_type: "VIDEO",
    media_url: DEMO_VIDEO,
    thumbnail_url: DEMO_THUMB,
    permalink: "https://instagram.com/sbeltic",
    caption: "Skincare premium",
  },
  {
    id: "ph-4",
    media_type: "VIDEO",
    media_url: DEMO_VIDEO,
    thumbnail_url: DEMO_THUMB,
    permalink: "https://instagram.com/sbeltic",
    caption: "Cuidado de la piel",
  },
];

/* ─── Stacked Card ──────────────────────────────────────────────────────────── */

function StackedCard({ post, position, postIndex, total }) {
  const isFront = position === 0;
  const isVisible = Math.abs(position) <= 1;

  if (!isVisible) return null;

  const configs = {
    "-1": { x: "-18%", scale: 0.88, rotate: "-4deg", z: 1, opacity: 0.55 },
    0: { x: "0%", scale: 1, rotate: "0deg", z: 3, opacity: 1 },
    1: { x: "18%", scale: 0.88, rotate: "4deg", z: 1, opacity: 0.55 },
  };

  const cfg = configs[String(position)];

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0 transition-all duration-500 ease-out"
      style={{
        transform: `translateX(${cfg.x}) scale(${cfg.scale}) rotate(${cfg.rotate})`,
        zIndex: cfg.z,
        opacity: cfg.opacity,
        pointerEvents: isFront ? "auto" : "none",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        boxShadow: isFront
          ? "0 25px 50px -12px rgba(0,0,0,0.35)"
          : "0 8px 24px -8px rgba(0,0,0,0.15)",
      }}
      aria-label={
        isFront
          ? post.caption?.slice(0, 80) || "Ver post en Instagram"
          : undefined
      }
      tabIndex={isFront ? 0 : -1}
    >
      {post.media_type === "VIDEO" ? (
        <video
          src={post.media_url}
          poster={post.thumbnail_url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <Image
          src={post.media_url || post.thumbnail_url}
          alt={post.caption?.slice(0, 120) || "Post @sbeltic"}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 768px) 85vw, 400px"
        />
      )}

      {isFront && (
        <>
          {/* Sombra superior para que se lean las barras de progreso */}
          <div className="absolute top-0 inset-x-0 h-32 bg-linear-to-b from-black/50 to-transparent pointer-events-none z-10" />

          {/* Líneas de progreso (Dots convertidos en Stories) */}
          <div className="absolute top-0 inset-x-0 p-4 md:p-5 flex gap-1.5 z-20">
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className="h-0.75 flex-1 rounded-full transition-colors duration-300"
                style={{
                  background:
                    i === postIndex ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
                }}
              />
            ))}
          </div>

          <div
            className="absolute inset-0 flex flex-col justify-end p-6"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 35%, transparent 65%)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: IG_GRADIENT }}
              >
                <InstagramLogoIcon size={16} weight="fill" color="#fff" />
              </div>
              <span className="text-sm font-semibold text-white drop-shadow-md tracking-wider">
                @sbelticdurango
              </span>
            </div>
          </div>
        </>
      )}
    </a>
  );
}

/* ─── Main Section ──────────────────────────────────────────────────────────── */

export default function SocialSection({ posts = [] }) {
  const displayPosts = posts.length > 0 ? posts : PLACEHOLDER_POSTS;
  const [current, setCurrent] = useState(0);
  const hasPosts = displayPosts.length > 0;

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + displayPosts.length) % displayPosts.length);
  }, [displayPosts.length]);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % displayPosts.length);
  }, [displayPosts.length]);

  function getPosition(index) {
    const diff = index - current;
    const len = displayPosts.length;
    if (diff === 0) return 0;
    if (diff === 1 || diff === -(len - 1)) return 1;
    if (diff === -1 || diff === len - 1) return -1;
    return 2;
  }

  return (
    <section
      className="py-20 md:py-28 overflow-hidden border-t border-black/5"
      style={{ background: "var(--pub-surface)" }}
    >
      <div
        className={`max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col gap-12 md:gap-16 lg:gap-24 ${
          hasPosts ? "md:flex-row md:items-center" : "items-center"
        }`}
      >
        {/* Izquierda — carrusel apilado */}
        {hasPosts && (
          <div className="flex-none w-full md:w-[45%] lg:w-[40%] flex flex-col items-center gap-8">
            {/* Stack container */}
            <div
              className="relative w-full max-w-70 md:max-w-[320px] mx-auto"
              style={{ aspectRatio: "9 / 16" }}
            >
              {displayPosts.map((post, i) => (
                <StackedCard
                  key={post.id}
                  post={post}
                  position={getPosition(i)}
                  postIndex={i}
                  total={displayPosts.length}
                />
              ))}
            </div>

            {/* Navegación elegante (Solo flechas estilo imagen) */}
            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-[0.92] active:shadow-none shadow-md"
                style={{ background: "var(--pub-text)", color: "#ffffff" }}
                aria-label="Post anterior"
              >
                <ArrowLeftIcon size={20} weight="bold" />
              </button>

              <button
                onClick={next}
                className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-[0.92] active:shadow-none shadow-md"
                style={{ background: "var(--pub-text)", color: "#ffffff" }}
                aria-label="Siguiente post"
              >
                <ArrowRightIcon size={20} weight="bold" />
              </button>
            </div>
          </div>
        )}

        {/* Derecha — texto + CTA (Intacto) */}
        <div
          className={`flex flex-col ${
            hasPosts
              ? "flex-1 items-center md:items-start text-center md:text-left gap-6 md:gap-8"
              : "max-w-xl mx-auto items-center text-center gap-6 md:gap-8"
          }`}
        >
          {/* Eyebrow */}
          <SectionEyebrow>Nuestra comunidad</SectionEyebrow>

          {/* Headline */}
          <h2
            className="text-5xl md:text-6xl lg:text-7xl leading-[1.1]"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--pub-text)",
            }}
          >
            <span className="font-light">Resultados</span>
            <br />
            <em
              className="not-italic font-bold"
              style={{ color: "var(--pub-accent)" }}
            >
              reales,
            </em>
            <br />
            <span className="font-light">sin filtros</span>
          </h2>

          {/* Divisor — centrado en móvil, a la izquierda en desktop */}
          <div className="w-16 h-px mx-auto md:mx-0 bg-black/15" />

          {/* Descripción */}
          <p
            className="text-base md:text-lg leading-relaxed max-w-md font-light"
            style={{ color: "var(--pub-text-muted)" }}
          >
            Descubre lo que nuestros clientes comparten sobre sus tratamientos y
            rutinas de skincare con Sbeltic.
          </p>

          {/* CTA Button Premium */}
          <Link
            href="https://www.instagram.com/sbelticdurango/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-full md:w-fit flex items-center justify-center gap-3 px-10 py-4 md:py-4 rounded-full text-xs font-bold tracking-widest uppercase cursor-pointer transition-all duration-200 hover:bg-[#2C2420] hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97] active:shadow-none"
            style={{ background: "var(--pub-text)", color: "#fff" }}
          >
            <InstagramLogoIcon size={20} weight="fill" />
            <span>Síguenos en Instagram</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
