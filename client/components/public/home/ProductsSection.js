'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

function ProductCard({ product }) {
  const imgSrc = product.images?.[0]
    ? `${BASE_URL}${product.images[0]}`
    : null

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group shrink-0 w-56 md:w-64 flex flex-col"
      style={{ background: 'var(--pub-surface)', borderRadius: 'var(--radius-lg)' }}
    >
      {/* Imagen */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '1/1', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0', background: 'var(--pub-cream)' }}
      >
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            unoptimized
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 224px, 256px"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-xs font-medium"
            style={{ color: 'var(--pub-text-muted)' }}
          >
            Sin imagen
          </div>
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
        {product.price != null && (
          <p className="text-sm font-bold mt-1" style={{ color: 'var(--pub-accent)' }}>
            ${product.price.toLocaleString('es-MX')} MXN
          </p>
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
    <section className="py-20 md:py-28" style={{ background: 'var(--pub-bg)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-4"
            style={{ color: 'var(--pub-text)' }}
          >
            <span className="font-light">Nuestros </span>
            <span className="font-bold" style={{ color: 'var(--pub-accent)' }}>productos</span>
          </h2>
          <div className="w-16 h-0.5 mx-auto mb-4" style={{ background: 'var(--pub-gold)' }} />
          <p className="text-sm max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--pub-text-muted)' }}>
            Los productos más exclusivos de skincare, seleccionados por nuestros especialistas para llevar los resultados de la clínica a tu hogar.
          </p>
        </div>

        {products.length > 0 ? (
          <>
            {/* Carousel */}
            <div className="relative">
              <div
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              >
                {/* Tarjeta destacada: Ver todos */}
                <div
                  className="shrink-0 w-56 md:w-64 flex flex-col items-start justify-between p-8 snap-start"
                  style={{
                    background: 'var(--pub-accent)',
                    borderRadius: 'var(--radius-lg)',
                    minHeight: '320px',
                  }}
                >
                  <p
                    className="text-xs font-semibold tracking-[0.3em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    Tienda Sbeltic
                  </p>
                  <div>
                    <h3
                      className="text-2xl leading-tight mb-6"
                      style={{ color: '#fff' }}
                    >
                      <span className="font-light">Explora</span>
                      <br />
                      <span className="font-bold">nuestra línea</span>
                    </h3>
                    <Link
                      href="/productos"
                      className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white border-b border-white pb-0.5 hover:opacity-70 transition-opacity"
                    >
                      Ver todos
                      <ArrowRight size={13} weight="bold" />
                    </Link>
                  </div>
                </div>

                {products.map((p) => (
                  <div key={p._id} className="snap-start">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>

              {/* Flechas de navegación — solo desktop */}
              <button
                onClick={() => scroll(-1)}
                className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center shadow-md transition-colors hover:opacity-80"
                style={{ background: 'var(--pub-surface)', color: 'var(--pub-text)' }}
                aria-label="Anterior"
              >
                <ArrowLeft size={18} weight="bold" />
              </button>
              <button
                onClick={() => scroll(1)}
                className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center shadow-md transition-colors hover:opacity-80"
                style={{ background: 'var(--pub-surface)', color: 'var(--pub-text)' }}
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
