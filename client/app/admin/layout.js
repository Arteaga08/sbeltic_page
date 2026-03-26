'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { ToastProvider } from '@/context/ToastContext'
import Sidebar from '@/components/admin/Sidebar'
import TopBar from '@/components/admin/TopBar'
import Spinner from '@/components/ui/Spinner'

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const { checking } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-bg">
        <Sidebar
          mobileOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <TopBar onMenuOpen={() => setSidebarOpen(true)} />
        <main
          className="pt-(--topbar-height) min-h-screen md:ml-(--sidebar-width)"
        >
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </ToastProvider>
  )
}
