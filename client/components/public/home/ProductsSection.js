'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import SectionHeading from './shared/SectionHeading'
import GoldDivider from './shared/GoldDivider'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

function ProductCard({ product }) {
  const imgSrc = product.images?.[0]
    ? `${BASE_URL}${product.images[0]}`
    : null
  const imgSrc2 = product.images?.[1]
    ? `${BASE_URL}${product.images[1]}`
    : null

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group shrink-0 w-56 md:w-64 flex flex-col cursor-pointer hover:shadow-md transition-shadow duration-200"
      style={{ background: 'var(--pub-surface)', borderRadius: 'var(--radius-lg)' }}
    >
      {/* Imagen */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '1/1', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', background: 'var(--pub-cream)' }}
      >
        {imgSrc ? (
          <>
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              unoptimized
              className={`object-cover transition-opacity duration-500 ${imgSrc2 ? 'group-hover:opacity-0' : ''}`}
              sizes="(max-width: 768px) 224px, 256px"
            />
            {imgSrc2 && (
              <Image
                src={imgSrc2}
                alt={`${product.name} - 2`}
                fill
                unoptimized
                className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                sizes="(max-width: 768px) 224px, 256px"
              />
            )}
          </>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-xs font-medium"
            style={{ color: 'var(--pub-text-muted)' }}
          >
            Sin imagen
          </div>
        )}
        {product.compareAtPrice > product.price && (
          <span
            className="absolute top-2.5 right-2.5 text-xs md:text-sm font-semibold rounded-full leading-none z-10"
            style={{
              background: 'var(--pub-accent-light)',
              color: 'var(--pub-accent)',
              padding: '5px 10px',
              letterSpacing: '0.02em',
            }}
          >
            −{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="px-4 py-4 flex flex-col gap-1 flex-1">
        <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'var(--pub-text-muted)' }}>
          {product.brand || 'Sbeltic'}
        </p>
        <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--pub-text)', fontFamily: 'var(--font-heading)' }}>
          {product.name}
        </p>
        {product.shortDescription && (
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--pub-text-muted)' }}>
            {product.shortDescription}
          </p>
        )}
        {product.price != null && (
          <div className="flex items-center gap-1.5 flex-wrap mt-1" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {product.compareAtPrice > product.price && (
              <span className="text-[11px] line-through" style={{ color: 'var(--pub-text-muted)' }}>
                ${product.compareAtPrice.toLocaleString('es-MX')}
              </span>
            )}
            <span className="text-sm font-bold" style={{ color: 'var(--pub-accent)' }}>
              ${product.price.toLocaleString('es-MX')} MXN
            </span>
          </div>
        )}
        <span
          className="mt-2 text-[11px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--pub-accent)' }}
        >
          Ver producto →
        </span>
      </div>
    </Link>
  )
}

export default function ProductsSection({ products = [] }) {
  const scrollRef = useRef(null)

  function scroll(dir) {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir * 300, behavior: 'smooth' })
  }

  return (
    <section
      className="py-20 md:py-28"
      style={{
        background: 'var(--pub-bg)',
        borderTop: '1px solid rgba(183,142,86,0.3)',
        borderBottom: '1px solid rgba(183,142,86,0.3)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <SectionHeading
            lightText="Nuestros"
            boldText="Productos"
            sizeClasses="text-4xl md:text-5xl lg:text-6xl"
            className="mb-4"
          />
          <GoldDivider size="lg" className="mb-4" />
          <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--pub-text-muted)' }}>
            Los productos más exclusivos de skincare, seleccionados por nuestros especialistas para llevar los resultados de la clínica a tu hogar.
          </p>
        </div>

        {products.length > 0 ? (
          <>
            {/* Carousel */}
            <div className="group/carousel relative">
              <div
                ref={scrollRef}
                className="flex items-center gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 md:-mx-10 scroll-pl-6 md:scroll-pl-10"
              >
                {/* Espaciador izquierdo */}
                <div className="shrink-0 w-6 md:w-10" aria-hidden="true" />
                {/* Tarjeta destacada: Ver todos */}
                <Link
                  href="/productos"
                  className="group/cta relative shrink-0 w-56 md:w-64 min-h-105 md:min-h-120 flex flex-col items-start justify-between p-6 md:p-10 snap-start cursor-pointer overflow-hidden transition-all duration-200"
                  style={{ borderRadius: 'var(--radius-lg)' }}
                >
                  {/* Imagen de fondo */}
                  <Image
                    src="https://res.cloudinary.com/dnppruwh4/image/upload/v1769826888/Unleashia_Tanghulu_Glaze_Tint_j37zoo.jpg"
                    alt="Explora nuestra tienda"
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover/cta:scale-105"
                  />
                  {/* Overlay con color accent */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, rgba(61,189,181,0.35) 0%, rgba(61,189,181,0.75) 100%)' }}
                  />

                  <p
                    className="relative z-10 text-xs font-semibold tracking-widest md:tracking-[0.3em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    Tienda Sbeltic
                  </p>
                  <div className="relative z-10">
                    <h3
                      className="text-2xl leading-tight mb-6"
                      style={{ color: '#fff' }}
                    >
                      <span className="font-light">Explora</span>
                      <br />
                      <span className="font-bold">nuestra línea</span>
                    </h3>
                    <span
                      className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white border-b border-white pb-0.5"
                    >
                      Ver todos
                      <ArrowRight size={13} weight="bold" />
                    </span>
                  </div>
                </Link>

                {products.map((p) => (
                  <div key={p._id} className="snap-start">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>

              {/* Flechas de navegación — solo desktop */}
              <button
                onClick={() => scroll(-1)}
                className="hidden md:flex absolute -left-20 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center shadow-lg backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 cursor-pointer transition-all duration-200 ease-out hover:scale-110 hover:shadow-xl active:scale-95"
                style={{ background: 'rgba(255,255,255,0.85)', color: 'var(--pub-text)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--pub-accent)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; e.currentTarget.style.color = 'var(--pub-text)' }}
                aria-label="Anterior"
              >
                <ArrowLeft size={18} weight="bold" />
              </button>
              <button
                onClick={() => scroll(1)}
                className="hidden md:flex absolute -right-20 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center shadow-lg backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 cursor-pointer transition-all duration-200 ease-out hover:scale-110 hover:shadow-xl active:scale-95"
                style={{ background: 'rgba(255,255,255,0.85)', color: 'var(--pub-text)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--pub-accent)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; e.currentTarget.style.color = 'var(--pub-text)' }}
                aria-label="Siguiente"
              >
                <ArrowRight size={18} weight="bold" />
              </button>
            </div>
          </>
        ) : (
          <p className="text-center py-10" style={{ color: 'var(--pub-text-muted)' }}>
            Marca productos como <strong>Destacado</strong> desde el admin para mostrarlos aquí.
          </p>
        )}
      </div>
    </section>
  )
}
