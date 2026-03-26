'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { categories } from '@/lib/api'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import FormField from '@/components/ui/FormField'
import Select from '@/components/ui/Select'
import Checkbox from '@/components/ui/Checkbox'
import Card from '@/components/ui/Card'
import ImageUploader from '@/components/admin/ImageUploader'

const TYPE_OPTIONS = [
  { value: 'treatment', label: 'Tratamientos' },
  { value: 'product', label: 'Productos' },
]

const INITIAL = { name: '', type: '', description: '', image: '', active: true }

const TYPE_LABELS = { treatment: 'Tratamientos', product: 'Productos' }

export default function CategoryForm({ initial, onSuccess, lockedType }) {
  const [form, setForm] = useState(
    initial ?? (lockedType ? { ...INITIAL, type: lockedType } : INITIAL)
  )
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState('')
  const router = useRouter()

  const isEdit = Boolean(initial?._id)

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'El nombre es obligatorio'
    else if (form.name.trim().length < 2) errs.name = 'El nombre debe tener al menos 2 caracteres'
    if (!form.type) errs.type = 'Selecciona el tipo de categoría'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setErrors({})
    setServerError('')
    setSaving(true)
    try {
      let res
      if (isEdit) {
        res = await categories.update(initial._id, form)
      } else {
        res = await categories.create(form)
      }
      if (onSuccess) {
        onSuccess(res.data)
      } else {
        router.push('/admin/categorias')
      }
    } catch (err) {
      setServerError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <div className={lockedType ? '' : 'grid grid-cols-2 gap-4'}>
          <FormField label="Nombre" required error={errors.name}>
            <Input name="name" value={form.name} onChange={handleChange} placeholder="Ej: Faciales" />
          </FormField>
          {!lockedType && (
            <FormField label="Tipo" required error={errors.type}>
              <Select
                name="type"
                value={form.type}
                onChange={handleChange}
                options={TYPE_OPTIONS}
                placeholder="Seleccionar tipo…"
                error={errors.type}
              />
            </FormField>
          )}
        </div>

        <FormField label="Descripción">
          <Textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Descripción breve de la categoría" />
        </FormField>

        <FormField label="Imagen">
          <ImageUploader
            entity="categories"
            value={form.image}
            onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
            multiple={false}
          />
        </FormField>

        <Checkbox label="Activa" name="active" checked={form.active} onChange={handleChange} />

        {serverError && (
          <p className="text-sm text-danger">{serverError}</p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={() => onSuccess ? onSuccess(null) : router.back()}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" loading={saving}>
            {isEdit ? 'Guardar cambios' : 'Crear categoría'}
          </Button>
        </div>
      </div>
    </form>
  )
}
