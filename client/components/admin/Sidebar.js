'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  SquaresFourIcon as SquaresFour,
  TagIcon as Tag,
  SparkleIcon as Sparkle,
  ShoppingBagIcon as ShoppingBag,
  UserCircleIcon as UserCircle,
  XIcon,
} from '@phosphor-icons/react/dist/ssr'

const NAV = [
  { href: '/admin', label: 'Dashboard', Icon: SquaresFour },
  { href: '/admin/categorias', label: 'Categorías', Icon: Tag },
  { href: '/admin/tratamientos', label: 'Tratamientos', Icon: Sparkle },
  { href: '/admin/productos', label: 'Productos', Icon: ShoppingBag },
  { href: '/admin/perfil', label: 'Perfil', Icon: UserCircle },
]

export default function Sidebar({ mobileOpen, onClose }) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full flex flex-col z-40 bg-surface border-r border-border transition-transform duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ width: 'var(--sidebar-width)' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6">
          <div>
            <span
              className="text-xl font-semibold text-text tracking-wide"
              style={{ fontFamily: 'var(--font-heading), Georgia, serif' }}
            >
              Sbeltic
            </span>
            <p className="text-[10px] mt-0.5 text-text-subtle font-semibold uppercase tracking-widest">
              Admin
            </p>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-md text-text-muted hover:text-text hover:bg-bg transition-colors"
          >
            <XIcon size={18} weight="bold" />
          </button>
        </div>

        <div className="mx-5 h-px bg-border mb-3" />

        {/* Navigation */}
        <nav className="flex-1 px-3 overflow-y-auto">
          <p className="text-[10px] font-semibold text-text-subtle uppercase tracking-widest px-3 mb-2">
            Menú
          </p>
          {NAV.map(({ href, label, Icon }) => {
            const isActive =
              href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md mb-0.5 text-[15px] font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-primary-light text-primary'
                    : 'text-text-muted hover:bg-bg hover:text-text'
                }`}
              >
                <Icon
                  size={18}
                  weight={isActive ? 'fill' : 'regular'}
                  className={isActive ? 'text-primary' : 'text-text-subtle'}
                />
                {label}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4">
          <div className="rounded-md bg-bg border border-border px-3 py-2.5">
            <p className="text-xs text-text-subtle font-medium">v1.0 — Panel privado</p>
          </div>
        </div>
      </aside>
    </>
  )
}
