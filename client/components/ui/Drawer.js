'use client'

import { useRef, useEffect } from 'react'
import { XIcon } from '@phosphor-icons/react/dist/ssr'

export default function Drawer({ open, onClose, title, children }) {
  const bodyRef = useRef(null)

  useEffect(() => {
    if (open && bodyRef.current) bodyRef.current.scrollTop = 0
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-xl bg-surface z-50 shadow-2xl flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
          <h2 className="text-lg font-semibold text-text">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-text-muted hover:text-text hover:bg-bg transition-colors"
          >
            <XIcon size={20} weight="bold" />
          </button>
        </div>

        {/* Body */}
        <div ref={bodyRef} className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </>
  )
}
