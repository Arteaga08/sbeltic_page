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
  images: [], beforeAfterImages: [], beforeImages: [], afterImages: [],
  price: '', compareAtPrice: '',
  duration: '', sessions: '', downtime: '', resultsIn: '',
  benefitsText: '', benefits: [], howItWorks: '', preparation: '', aftercare: '',
  targetAreas: [], skinTypes: [],
  whySbeltic: '', aboutTreatment: '', aboutTreatmentImage: '',
  procedureSteps: [], procedureIntroText: '', procedureBackgroundImage: '',
  candidatesText: '', candidatesBullets: [], candidatesImage: '',
  recoveryText: '', recoveryBullets: [],
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

  function updateStep(index, value) {
    setForm((prev) => {
      const steps = [...prev.procedureSteps]
      steps[index] = value
      return { ...prev, procedureSteps: steps }
    })
  }

  function removeStep(index) {
    setForm((prev) => ({
      ...prev,
      procedureSteps: prev.procedureSteps.filter((_, i) => i !== index),
    }))
  }

  function addStep() {
    setForm((prev) => ({
      ...prev,
      procedureSteps: [...prev.procedureSteps, ''],
    }))
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

        {/* Sección: ¿Por qué en Sbeltic? */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-1">
            Sección: ¿Por qué en Sbeltic?
          </h2>
          <p className="text-xs text-text-muted mb-5">Aparece debajo del StatsBar como texto destacado</p>
          <div className="flex flex-col gap-4">
            <FormField label="¿Por qué hacerte el tratamiento en Sbeltic?">
              <Textarea name="whySbeltic" value={form.whySbeltic} onChange={handleChange} rows={4} placeholder="Explica las ventajas de realizar este tratamiento en Sbeltic. Ej: tecnología avanzada, equipo certificado, ambiente exclusivo…" />
            </FormField>
          </div>
        </Card>

        {/* Sección: De qué trata el tratamiento */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-1">
            Sección: De qué trata el tratamiento
          </h2>
          <p className="text-xs text-text-muted mb-5">Texto con imagen al lado — describe de qué va el tratamiento</p>
          <div className="flex flex-col gap-4">
            <FormField label="Descripción del tratamiento">
              <Textarea name="aboutTreatment" value={form.aboutTreatment} onChange={handleChange} rows={5} placeholder="Describe en detalle de qué trata el tratamiento, cómo funciona y qué resultados ofrece…" />
            </FormField>
            <FormField label="Imagen de la sección (aparece junto al texto)">
              <ImageUploader entity="treatments" value={form.aboutTreatmentImage} onChange={(v) => setForm((p) => ({ ...p, aboutTreatmentImage: v || '' }))} />
            </FormField>
          </div>
        </Card>

        {/* Sección: Procedimiento */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-1">
            Sección: Procedimiento
          </h2>
          <p className="text-xs text-text-muted mb-5">Imagen de fondo que cubre toda la sección con filtro de color — texto blanco encima</p>
          <div className="flex flex-col gap-4">
            <FormField label="Texto introductorio del procedimiento (aparece antes de los pasos)">
              <Textarea name="procedureIntroText" value={form.procedureIntroText} onChange={handleChange} rows={3} placeholder="Describe brevemente cómo funciona el procedimiento antes de listar los pasos…" />
            </FormField>
            <FormField label="Pasos del procedimiento">
              <div className="flex flex-col gap-3">
                {form.procedureSteps.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-primary-light text-primary text-xs font-semibold flex items-center justify-center mt-2">
                      {i + 1}
                    </span>
                    <Textarea
                      value={step}
                      onChange={(e) => updateStep(i, e.target.value)}
                      rows={2}
                      placeholder={`Describe el paso ${i + 1}…`}
                      className="flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeStep(i)}
                      className="mt-2 text-text-muted hover:text-danger transition-colors text-xs font-medium"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addStep}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-dashed border-border text-sm text-text-muted hover:border-primary hover:text-primary transition-colors w-fit"
                >
                  <Plus size={14} weight="bold" />
                  Agregar paso
                </button>
              </div>
            </FormField>
            <FormField label="Imagen de fondo (cubre toda la sección con filtro de color)">
              <ImageUploader entity="treatments" value={form.procedureBackgroundImage} onChange={(v) => setForm((p) => ({ ...p, procedureBackgroundImage: v || '' }))} />
            </FormField>
          </div>
        </Card>

        {/* Sección: Beneficios */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-1">
            Sección: Beneficios
          </h2>
          <p className="text-xs text-text-muted mb-5">Lista de beneficios del tratamiento en la página pública</p>
          <div className="flex flex-col gap-4">
            <FormField label="Texto introductorio (aparece arriba de la lista)">
              <Textarea name="benefitsText" value={form.benefitsText} onChange={handleChange} rows={3} placeholder="Describe brevemente los principales beneficios del tratamiento…" />
            </FormField>
            <FormField label="Beneficios">
              <TagInput {...arr('benefits')} placeholder="Añadir beneficio…" />
            </FormField>
          </div>
        </Card>

        {/* Sección: Candidatos ideales */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-1">
            Sección: Candidatos ideales
          </h2>
          <p className="text-xs text-text-muted mb-5">Imagen a la izquierda y texto a la derecha — describe para quién es mejor el tratamiento</p>
          <div className="flex flex-col gap-4">
            <FormField label="Párrafo introductorio">
              <Textarea name="candidatesText" value={form.candidatesText} onChange={handleChange} rows={3} placeholder="Describe el perfil ideal de paciente. Ej: Este tratamiento es ideal para personas que buscan rejuvenecimiento sin tiempo de recuperación…" />
            </FormField>
            <FormField label="Viñetas — cada punto es un candidato ideal (presiona Enter para añadir)">
              <TagInput {...arr('candidatesBullets')} placeholder="Ej: Tiene piel seca o sin brillo…" />
            </FormField>
            <FormField label="Imagen (aparece a la izquierda del texto)">
              <ImageUploader entity="treatments" value={form.candidatesImage} onChange={(v) => setForm((p) => ({ ...p, candidatesImage: v || '' }))} />
            </FormField>
          </div>
        </Card>

        {/* Sección: Recuperación */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-1">
            Sección: Recuperación
          </h2>
          <p className="text-xs text-text-muted mb-5">Texto centrado con fondo de textura estática — no requiere imagen</p>
          <div className="flex flex-col gap-4">
            <FormField label="Párrafo introductorio">
              <Textarea name="recoveryText" value={form.recoveryText} onChange={handleChange} rows={3} placeholder="Describe el proceso de recuperación. Ej: No hay tiempo de inactividad, puedes retomar tu rutina inmediatamente…" />
            </FormField>
            <FormField label="Viñetas — cuidados post-tratamiento (presiona Enter para añadir)">
              <TagInput {...arr('recoveryBullets')} placeholder="Ej: Evita exfoliantes por 24 horas…" />
            </FormField>
          </div>
        </Card>

        {/* Sección: Contenido adicional (FAQ) */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-1">
            Sección: Preguntas frecuentes
          </h2>
          <p className="text-xs text-text-muted mb-5">Aparecen como acordeón desplegable al final de la página</p>
          <div className="flex flex-col gap-4">
            <FormField label="¿Cómo funciona?">
              <Textarea name="howItWorks" value={form.howItWorks} onChange={handleChange} rows={3} placeholder="Explica el mecanismo de acción del tratamiento…" />
            </FormField>
            <FormField label="Preparación">
              <Textarea name="preparation" value={form.preparation} onChange={handleChange} rows={2} placeholder="Instrucciones previas al tratamiento…" />
            </FormField>
            <FormField label="Cuidados posteriores">
              <Textarea name="aftercare" value={form.aftercare} onChange={handleChange} rows={2} placeholder="Cuidados que el paciente debe seguir después…" />
            </FormField>
          </div>
        </Card>

        {/* Sección: Zonas y tipos de piel */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-1">
            Zonas y tipo de piel
          </h2>
          <p className="text-xs text-text-muted mb-5">Aparecen como chips en la sección de beneficios</p>
          <div className="flex flex-col gap-4">
            <FormField label="Zonas de tratamiento">
              <TagInput {...arr('targetAreas')} placeholder="Añadir zona…" suggestions={TARGET_AREAS} />
            </FormField>
            <FormField label="Tipos de piel">
              <TagInput {...arr('skinTypes')} placeholder="Añadir tipo…" suggestions={SKIN_TYPES} />
            </FormField>
          </div>
        </Card>

        {/* Sección: Imágenes generales */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-1">
            Imágenes
          </h2>
          <p className="text-xs text-text-muted mb-5">Imágenes principales y galería de antes/después</p>
          <div className="flex flex-col gap-4">
            <FormField label="Imágenes del tratamiento (la primera se usa en el Hero)">
              <ImageUploader entity="treatments" multiple {...arr('images')} />
            </FormField>
            <FormField label="Antes y después (aparecen en la galería de comparación)">
              <ImageUploader entity="treatments" multiple value={form.beforeAfterImages} onChange={(v) => setForm((p) => ({ ...p, beforeAfterImages: v }))} />
            </FormField>
            <p className="text-[11px] text-text-muted -mt-1 mb-2">Las siguientes imágenes se emparejan por posición: la 1ª de "Antes" con la 1ª de "Después", etc.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Imágenes Antes">
                <ImageUploader entity="treatments" multiple value={form.beforeImages} onChange={(v) => setForm((p) => ({ ...p, beforeImages: v }))} />
              </FormField>
              <FormField label="Imágenes Después">
                <ImageUploader entity="treatments" multiple value={form.afterImages} onChange={(v) => setForm((p) => ({ ...p, afterImages: v }))} />
              </FormField>
            </div>
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
