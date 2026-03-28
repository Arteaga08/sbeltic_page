'use client'

import { useState } from 'react'
import { X } from '@phosphor-icons/react'
import { categories } from '@/lib/api'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import FormField from '@/components/ui/FormField'

const TYPE_LABELS = { treatment: 'tratamiento', product: 'producto' }

export default function QuickCategoryModal({ open, onClose, onCreated, type }) {
  const [form, setForm] = useState({ name: '', description: '' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) { setError('El nombre es obligatorio'); return }
    setError('')
    setSaving(true)
    try {
      const res = await categories.create({ name: form.name, description: form.description, type, active: true })
      onCreated(res.data)
      setForm({ name: '', description: '' })
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface rounded-xl shadow-[var(--shadow-lg)] p-7 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text">Nueva categoría</h3>
            <p className="text-sm text-text-muted mt-0.5">
              Para {TYPE_LABELS[type] ?? type} · Se seleccionará automáticamente
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm text-text-muted hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField label="Nombre" required error={error}>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ej: Tratamientos corporales"
              autoFocus
            />
          </FormField>
          <FormField label="Descripción">
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={2}
              placeholder="Descripción opcional"
            />
          </FormField>
          <div className="flex justify-end gap-3 pt-1">
            <Button type="button" variant="secondary" onClick={onClose} disabled={saving}>Cancelar</Button>
            <Button type="submit" variant="primary" loading={saving}>Crear categoría</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
