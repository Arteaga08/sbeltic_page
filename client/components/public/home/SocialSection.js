'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, InstagramLogo } from '@phosphor-icons/react'

// Posts estáticos — reemplazar con imágenes reales cuando el cliente las provea
const POSTS = [
  { id: 1, src: '/images/social/post-1.jpg', alt: 'Post 1 @sbeltic' },
  { id: 2, src: '/images/social/post-2.jpg', alt: 'Post 2 @sbeltic' },
  { id: 3, src: '/images/social/post-3.jpg', alt: 'Post 3 @sbeltic' },
  { id: 4, src: '/images/social/post-4.jpg', alt: 'Post 4 @sbeltic' },
]

function PostCard({ post, offset }) {
  const rotations = ['-rotate-3', 'rotate-0', 'rotate-2', '-rotate-1']
  const rotation = rotations[Math.abs(offset) % rotations.length] ?? 'rotate-0'

  return (
    <div
      className={`relative w-52 md:w-60 aspect-[9/16] flex-shrink-0 overflow-hidden shadow-lg transition-transform duration-300 ${rotation}`}
      style={{ borderRadius: 'var(--radius-lg)', background: '#e8e3dc' }}
    >
      <Image
        src={post.src}
        alt={post.alt}
        fill
        className="object-cover"
        sizes="240px"
        onError={() => {}} // silencia error si no existe la imagen
      />
      {/* Username overlay */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: 'var(--pub-accent)' }}
        >
          <InstagramLogo size={12} weight="fill" color="#fff" />
        </div>
        <span className="text-[11px] font-semibold text-white drop-shadow-sm">@sbeltic</span>
      </div>
    </div>
  )
}

export default function SocialSection() {
  const [index, setIndex] = useState(1)

  function prev() {
    setIndex((i) => Math.max(0, i - 1))
  }
  function next() {
    setIndex((i) => Math.min(POSTS.length - 1, i + 1))
  }

  const visible = POSTS.slice(Math.max(0, index - 1), index + 2)

  return (
    <section
      className="py-20 md:py-28 overflow-hidden"
      style={{ background: 'var(--pub-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-16 md:gap-20">
        {/* Izquierda — carrusel de posts */}
        <div className="flex-1 flex flex-col items-center gap-8">
          <div className="flex items-end gap-4 md:gap-5">
            {visible.map((post, i) => (
              <PostCard key={post.id} post={post} offset={i - 1} />
            ))}
          </div>

          {/* Navegación */}
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              disabled={index === 0}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors disabled:opacity-30"
              style={{ borderColor: 'var(--pub-border)', color: 'var(--pub-text)' }}
              aria-label="Anterior"
            >
              <ArrowLeft size={16} weight="bold" />
            </button>
            <button
              onClick={next}
              disabled={index === POSTS.length - 1}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors disabled:opacity-30"
              style={{ borderColor: 'var(--pub-border)', color: 'var(--pub-text)' }}
              aria-label="Siguiente"
            >
              <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        </div>

        {/* Derecha — texto */}
        <div className="flex-1 flex flex-col gap-7 text-center md:text-left">
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05]"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--pub-text)' }}
          >
            Resultados
            <br />
            <em
              className="not-italic"
              style={{ color: 'var(--pub-accent)' }}
            >
              reales
            </em>
            <br />
            sin filtros
          </h2>
          <p className="text-base leading-relaxed" style={{ color: 'var(--pub-text-muted)' }}>
            Descubre lo que nuestros clientes comparten sobre sus tratamientos y rutinas de skincare con Sbeltic.
          </p>
          <Link
            href="https://instagram.com/sbeltic"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center md:justify-start gap-2 px-8 py-4 font-bold tracking-widest uppercase text-sm transition-opacity hover:opacity-85"
            style={{ background: 'var(--pub-text)', color: '#fff', borderRadius: 'var(--radius-sm)' }}
          >
            <InstagramLogo size={18} weight="fill" />
            Síguenos en Instagram
          </Link>
        </div>
      </div>
    </section>
  )
}
