import Link from 'next/link'
import Image from 'next/image'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function BestsellerSection({ product }) {
  if (!product) return null

  const imgSrc = product.images?.[0]
    ? `${BASE_URL}${product.images[0]}`
    : null

  return (
    <section className="flex flex-col md:flex-row min-h-120">
      {/* Panel izquierdo — producto */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-10 py-16 md:px-16 md:py-20 gap-8"
        style={{ background: 'var(--pub-gold-light)' }}
      >
        <p
          className="text-xs font-semibold tracking-[0.3em] uppercase self-start"
          style={{ color: 'var(--pub-gold-dark)' }}
        >
          Producto estrella
        </p>

        {/* Tarjeta producto */}
        <div
          className="w-full max-w-xs flex flex-col"
          style={{ background: 'var(--pub-surface)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}
        >
          {/* Imagen */}
          <div
            className="relative w-full"
            style={{ aspectRatio: '1/1', background: 'var(--pub-cream)' }}
          >
            {imgSrc ? (
              <Image
                src={imgSrc}
                alt={product.name}
                fill
                unoptimized
                className="object-cover"
                sizes="320px"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-xs"
                style={{ color: 'var(--pub-text-muted)' }}
              >
                Sin imagen
              </div>
            )}
          </div>

          {/* Info */}
          <div className="px-5 py-5 flex flex-col gap-1">
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: 'var(--pub-text-muted)' }}>
              {product.brand || 'Sbeltic'}
            </p>
            <p
              className="text-base font-semibold"
              style={{ color: 'var(--pub-text)', fontFamily: 'var(--font-heading)' }}
            >
              {product.name}
            </p>
            {product.price != null && (
              <p className="text-sm font-bold" style={{ color: 'var(--pub-accent)' }}>
                ${product.price.toLocaleString('es-MX')} MXN
              </p>
            )}
          </div>
        </div>

        <Link
          href={`/productos/${product.slug}`}
          className="w-full max-w-xs text-center py-3.5 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-(--pub-accent-hover) hover:shadow-xl hover:-translate-y-1"
          style={{ background: 'var(--pub-accent)', color: '#fff' }}
        >
          Ver producto
        </Link>
      </div>

      {/* Panel derecho — imagen lifestyle */}
      <div
        className="flex-1 relative min-h-80 md:min-h-120"
        style={{ background: 'var(--pub-text)' }}
      >
        <Image
          src="/images/bestseller-lifestyle.jpg"
          alt={`${product.name} — Sbeltic`}
          fill
          className="object-cover opacity-80"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Texto sobre imagen */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-10 md:p-14"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
          }}
        >
          <h2
            className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-3"
          >
            {product.shortDescription || product.name}
          </h2>
          {product.shortDescription && (
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {product.description?.slice(0, 120)}
              {(product.description?.length ?? 0) > 120 ? '…' : ''}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
