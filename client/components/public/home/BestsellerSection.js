import Link from 'next/link'
import Image from 'next/image'
import { CheckCircleIcon } from '@phosphor-icons/react/dist/ssr'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function BestsellerSection({ product }) {
  if (!product) return null

  const imgSrc = product.images?.[0]
    ? `${BASE_URL}${product.images[0]}`
    : null
  const imgSrc2 = product.images?.[1]
    ? `${BASE_URL}${product.images[1]}`
    : null
  const lifestyleImg = product.images?.[2]
    ? `${BASE_URL}${product.images[2]}`
    : imgSrc2 || '/images/bestseller-lifestyle.jpg'

  return (
    <section className="flex flex-col-reverse md:flex-row md:min-h-64">
      {/* Panel izquierdo — producto */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 py-4 md:px-12 md:py-8 gap-2 md:gap-3"
        style={{ background: 'linear-gradient(135deg, var(--pub-bg) 0%, var(--pub-accent-light) 100%)' }}
      >
        {/* Título estilizado */}
        <div className="w-full max-w-xs flex flex-col gap-2">
          <p
            className="text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ color: 'var(--pub-gold)' }}
          >
            Selección del especialista
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl leading-tight"
            style={{ color: 'var(--pub-text)', fontFamily: 'var(--font-heading)' }}
          >
            <span className="font-light">Nuestro</span>
            <br />
            <span className="font-bold" style={{ color: 'var(--pub-accent)' }}>Bestseller</span>
          </h2>
          <div className="w-12 h-0.5" style={{ background: 'var(--pub-gold)' }} />
          <p className="text-xs md:text-sm leading-relaxed" style={{ color: 'var(--pub-text-muted)' }}>
            Recomendado por nuestros expertos en cuidado de la piel
          </p>
        </div>

        {/* Tarjeta producto — sin efecto hover de levantar */}
        <div
          className="group w-full max-w-xs flex flex-col"
          style={{
            background: 'var(--pub-surface)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Imagen con hover swap */}
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: '4/5', background: 'var(--pub-cream)' }}
          >
            {imgSrc ? (
              <>
                <Image
                  src={imgSrc}
                  alt={product.name}
                  fill
                  unoptimized
                  className={`object-cover transition-opacity duration-500 ${imgSrc2 ? 'group-hover:opacity-0' : ''}`}
                  sizes="320px"
                />
                {imgSrc2 && (
                  <Image
                    src={imgSrc2}
                    alt={`${product.name} - 2`}
                    fill
                    unoptimized
                    className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    sizes="320px"
                  />
                )}
              </>
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-xs"
                style={{ color: 'var(--pub-text-muted)' }}
              >
                Sin imagen
              </div>
            )}
            {product.compareAtPrice > product.price && (
              <span
                className="absolute top-2.5 right-2.5 text-[10px] font-semibold rounded-full leading-none z-10"
                style={{
                  background: 'var(--pub-accent)',
                  color: '#fff',
                  padding: '4px 10px',
                  letterSpacing: '0.04em',
                }}
              >
                −{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Info */}
          <div className="px-4 py-3 flex flex-col gap-0.5">
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--pub-text-muted)' }}>
              {product.brand || 'Sbeltic'}
            </p>
            <p
              className="text-sm md:text-base font-semibold leading-snug"
              style={{ color: 'var(--pub-text)', fontFamily: 'var(--font-heading)' }}
            >
              {product.name}
            </p>
            {product.price != null && (
              <div className="flex items-center gap-1.5 flex-wrap mt-0.5" style={{ fontVariantNumeric: 'tabular-nums' }}>
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
          </div>
        </div>

        {product.benefits?.length > 0 && (
          <ul className="w-full max-w-xs flex flex-col gap-1.5 text-xs" style={{ color: 'var(--pub-text-muted)' }}>
            {product.benefits.slice(0, 3).map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircleIcon size={14} weight="fill" style={{ color: 'var(--pub-accent)', flexShrink: 0, marginTop: 1 }} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/productos/${product.slug}`}
          className="w-full max-w-xs text-center py-3.5 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          style={{ background: 'var(--pub-accent)', color: '#fff' }}
        >
          Ver producto
        </Link>
      </div>

      {/* Panel derecho — imagen lifestyle (arriba en móvil) */}
      <div
        className="shrink-0 relative h-48 md:h-auto md:flex-1 md:min-h-64"
        style={{ background: 'var(--pub-text)' }}
      >
        <Image
          src={lifestyleImg}
          alt={`${product.name} — Sbeltic`}
          fill
          unoptimized
          className="object-cover opacity-80"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Texto sobre imagen */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-5 md:p-12"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)',
          }}
        >
          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-1"
            style={{ color: 'var(--pub-accent)' }}
          >
            Destacado
          </p>
          <h2
            className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-snug"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {product.shortDescription || product.name}
          </h2>
          {product.shortDescription && (
            <p className="hidden md:block text-sm leading-relaxed max-w-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {product.description?.slice(0, 120)}
              {(product.description?.length ?? 0) > 120 ? '…' : ''}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
