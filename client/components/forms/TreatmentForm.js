'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PlusIcon as Plus } from '@phosphor-icons/react'
import { treatments, categories } from '@/lib/api'
import { SKIN_TYPES, TARGET_AREAS } from '@/lib/constants'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import FormField from '@/components/ui/FormField'
import Checkbox from '@/components/ui/Checkbox'
import Card from '@/components/ui/Card'
import ImageUploader from '@/components/admin/ImageUploader'
import TagInput from '@/components/admin/TagInput'
import QuickCategoryModal from '@/components/admin/QuickCategoryModal'

const DURATION_OPTIONS = [
  '15 min', '20 min', '30 min', '45 min',
  '1 hr', '1 hr 15 min', '1 hr 30 min', '1 hr 45 min',
  '2 hr', '2 hr 30 min', '3 hr', '4 hr',
].map((v) => ({ value: v, label: v }))

const RESULTS_OPTIONS = [
  'Desde la 1ª sesión', 'Desde la 2ª sesión', 'Desde la 3ª sesión',
  '1 semana', '2 semanas', '3 semanas',
  '1 mes', '2 meses', '3 meses', '6 meses',
].map((v) => ({ value: v, label: v }))

const SESSIONS_OPTIONS = [
  '1', '2', '3', '4', '5', '6', '8', '10', '12',
  '1-2', '2-3', '3-4', '4-6', '6-8', '8-10', '10-12',
].map((v) => ({ value: v, label: v }))

const INITIAL = {
  name: '', shortDescription: '', description: '', category: '',
  images: [], beforeAfterImages: [],
  price: '', compareAtPrice: '',
  duration: '', sessions: '', downtime: '', resultsIn: '',
  benefits: [], howItWorks: '', preparation: '', aftercare: '',
  targetAreas: [], skinTypes: [],
  isFeatured: false, active: true,
}

export default function TreatmentForm({ initial, onSuccess }) {
  const [form, setForm] = useState(
    initial
      ? { ...initial, category: initial.category?._id ?? initial.category ?? '' }
      : INITIAL
  )
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState('')
  const [catOptions, setCatOptions] = useState([])
  const [showNewCat, setShowNewCat] = useState(false)
  const router = useRouter()
  const isEdit = Boolean(initial?._id)

  useEffect(() => {
    categories.list({ limit: 100, type: 'treatment' })
      .then((res) => setCatOptions(res.data.map((c) => ({ value: c._id, label: c.name }))))
      .catch(() => {})
  }, [])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function arr(field) {
    return { value: form[field], onChange: (v) => setForm((p) => ({ ...p, [field]: v })) }
  }

  function handleCategoryCreated(cat) {
    const opt = { value: cat._id, label: cat.name }
    setCatOptions((prev) => [...prev, opt])
    setForm((prev) => ({ ...prev, category: cat._id }))
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'El nombre es obligatorio'
    else if (form.name.trim().length < 2) errs.name = 'El nombre debe tener al menos 2 caracteres'
    if (form.price !== '' && isNaN(Number(form.price))) errs.price = 'El precio debe ser un número'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({}); setServerError(''); setSaving(true)
    try {
      const payload = {
        ...form,
        price: form.price === '' ? undefined : Number(form.price),
        compareAtPrice: form.compareAtPrice === '' ? undefined : Number(form.compareAtPrice),
        category: form.category || undefined,
      }
      let res
      if (isEdit) {
        res = await treatments.update(initial._id, payload)
      } else {
        res = await treatments.create(payload)
      }
      if (onSuccess) {
        onSuccess(res.data)
      } else {
        router.push('/admin/tratamientos')
      }
    } catch (err) {
      setServerError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-3xl">
        {/* Información básica */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-5">
            Información básica
          </h2>
          <div className="flex flex-col gap-4">
            <FormField label="Nombre" required error={errors.name}>
              <Input name="name" value={form.name} onChange={handleChange} placeholder="Ej: Hidrodermoabrasión" />
            </FormField>
            <FormField label="Descripción corta">
              <Textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} rows={2} placeholder="Aparece en listados y tarjetas" />
            </FormField>
            <FormField label="Descripción completa">
              <Textarea name="description" value={form.description} onChange={handleChange} rows={5} />
            </FormField>

            {/* Categoría con creación inline */}
            <FormField label="Categoría">
              <div className="flex gap-2">
                <Select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  options={catOptions}
                  placeholder="Sin categoría"
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => setShowNewCat(true)}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-md border border-dashed border-border text-sm text-text-muted hover:border-primary hover:text-primary transition-colors whitespace-nowrap"
                >
                  <Plus size={15} weight="bold" />
                  Nueva
                </button>
              </div>
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Precio (MXN)" error={errors.price}>
                <Input name="price" type="number" value={form.price} onChange={handleChange} placeholder="0" min="0" />
              </FormField>
              <FormField label="Precio tachado">
                <Input name="compareAtPrice" type="number" value={form.compareAtPrice} onChange={handleChange} placeholder="0" min="0" />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Duración">
                <Select name="duration" value={form.duration} onChange={handleChange} options={DURATION_OPTIONS} placeholder="Seleccionar…" />
              </FormField>
              <FormField label="Sesiones">
                <Select name="sessions" value={form.sessions} onChange={handleChange} options={SESSIONS_OPTIONS} placeholder="Seleccionar…" />
              </FormField>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Downtime">
                <Input name="downtime" value={form.downtime} onChange={handleChange} placeholder="Ej: Sin tiempo" />
              </FormField>
              <FormField label="Resultados desde">
                <Select name="resultsIn" value={form.resultsIn} onChange={handleChange} options={RESULTS_OPTIONS} placeholder="Seleccionar…" />
              </FormField>
            </div>
          </div>
        </Card>

        {/* Contenido */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-5">Contenido</h2>
          <div className="flex flex-col gap-4">
            <FormField label="Beneficios">
              <TagInput {...arr('benefits')} placeholder="Añadir beneficio…" />
            </FormField>
            <FormField label="¿Cómo funciona?">
              <Textarea name="howItWorks" value={form.howItWorks} onChange={handleChange} rows={3} />
            </FormField>
            <FormField label="Preparación">
              <Textarea name="preparation" value={form.preparation} onChange={handleChange} rows={2} />
            </FormField>
            <FormField label="Cuidados posteriores">
              <Textarea name="aftercare" value={form.aftercare} onChange={handleChange} rows={2} />
            </FormField>
          </div>
        </Card>

        {/* Zonas y tipos de piel */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-5">Zonas y tipo de piel</h2>
          <div className="flex flex-col gap-4">
            <FormField label="Zonas de tratamiento">
              <TagInput {...arr('targetAreas')} placeholder="Añadir zona…" suggestions={TARGET_AREAS} />
            </FormField>
            <FormField label="Tipos de piel">
              <TagInput {...arr('skinTypes')} placeholder="Añadir tipo…" suggestions={SKIN_TYPES} />
            </FormField>
          </div>
        </Card>

        {/* Imágenes */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-5">Imágenes</h2>
          <div className="flex flex-col gap-4">
            <FormField label="Imágenes del tratamiento">
              <ImageUploader entity="treatments" multiple {...arr('images')} />
            </FormField>
            <FormField label="Antes y después">
              <ImageUploader entity="treatments" multiple value={form.beforeAfterImages} onChange={(v) => setForm((p) => ({ ...p, beforeAfterImages: v }))} />
            </FormField>
          </div>
        </Card>

        {/* Opciones */}
        <Card>
          <div className="flex gap-6">
            <Checkbox label="Destacado" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
            <Checkbox label="Activo" name="active" checked={form.active} onChange={handleChange} />
          </div>
        </Card>

        {serverError && (
          <div className="bg-danger-light border border-danger/20 rounded-md px-4 py-3">
            <p className="text-sm text-danger">{serverError}</p>
          </div>
        )}

        <div className="flex justify-end gap-3 pb-6">
          <Button type="button" variant="secondary" onClick={() => onSuccess ? onSuccess(null) : router.back()}>Cancelar</Button>
          <Button type="submit" variant="primary" loading={saving}>
            {isEdit ? 'Guardar cambios' : 'Crear tratamiento'}
          </Button>
        </div>
      </form>

      {showNewCat && (
        <QuickCategoryModal
          open
          onClose={() => setShowNewCat(false)}
          onCreated={handleCategoryCreated}
          type="treatment"
        />
      )}
    </>
  )
}
