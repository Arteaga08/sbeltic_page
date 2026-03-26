'use client'

import { SignOut, User, List } from '@phosphor-icons/react/dist/ssr'
import { useAuth } from '@/hooks/useAuth'

export default function TopBar({ onMenuOpen }) {
  const { user, logout } = useAuth()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-20 flex items-center px-4 md:px-6 bg-surface/90 backdrop-blur border-b border-border"
      style={{ height: 'var(--topbar-height)' }}
    >
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuOpen}
        className="md:hidden p-2 rounded-md text-text-muted hover:text-text hover:bg-bg transition-colors mr-2"
        aria-label="Abrir menú"
      >
        <List size={22} weight="bold" />
      </button>

      {/* Desktop: push content past the sidebar */}
      <div
        className="hidden md:block shrink-0"
        style={{ width: 'var(--sidebar-width)' }}
      />

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        {user && (
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <div className="h-7 w-7 rounded-full bg-bg border border-border flex items-center justify-center">
              <User size={14} weight="fill" className="text-text-subtle" />
            </div>
            <span className="hidden sm:inline font-medium">{user.name}</span>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-sm text-text-muted hover:text-danger transition-colors px-2 py-1.5 rounded-md hover:bg-danger-light"
        >
          <SignOut size={16} />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </header>
  )
}
