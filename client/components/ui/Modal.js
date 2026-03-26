'use client'

import Button from './Button'

export default function Modal({ open, title, message, onConfirm, onClose, loading = false }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface rounded-xl shadow-[var(--shadow-lg)] p-7 w-full max-w-md">
        <h3 className="text-lg font-semibold text-text mb-2">{title}</h3>
        <p className="text-base text-text-muted mb-7 leading-relaxed">{message}</p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={loading}>Cancelar</Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>Eliminar</Button>
        </div>
      </div>
    </div>
  )
}
