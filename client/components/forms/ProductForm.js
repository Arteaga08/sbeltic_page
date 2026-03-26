'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PlusIcon as Plus } from '@phosphor-icons/react'
import { products, categories } from '@/lib/api'
import { SKIN_TYPES, SKIN_CONCERNS } from '@/lib/constants'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Select from '@/components/ui/Select'
import FormField from '@/components/ui/FormField'
import Checkbox from '@/components/ui/Checkbox'
import Card from '@/components/ui/Card'
import ImageUploader from '@/components/admin/ImageUploader'
import TagInput from '@/components/admin/TagInput'
import KeyIngredientList from '@/components/admin/KeyIngredientList'
import VariantList from '@/components/admin/VariantList'
import PackageItemPicker from '@/components/admin/PackageItemPicker'
import QuickCategoryModal from '@/components/admin/QuickCategoryModal'

const INITIAL = {
  name: '', sku: '', brand: '', shortDescription: '', description: '',
  images: [], price: '', compareAtPrice: '', category: '',
  skinTypes: [], skinConcerns: [],
  ingredients: '', keyIngredients: [],
  howToUse: '', howWeUseIt: '',
  benefits: [], bestFor: [],
  variants: [], isPackage: false, packageItems: [], isFeatured: false, active: true,
}

function toSku(name) {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export default function ProductForm({ initial, onSuccess }) {
  const [form, setForm] = useState(
    initial
      ? { ...initial, category: initial.category?._id ?? initial.category ?? '' }
      : INITIAL
  )
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [serverError, setServerError] = useState('')
  const [catOptions, setCatOptions] = useState([])
  const [productOptions, setProductOptions] = useState([])
  const [showNewCat, setShowNewCat] = useState(false)
  const [skuTouched, setSkuTouched] = useState(Boolean(initial?._id))
  const router = useRouter()
  const isEdit = Boolean(initial?._id)

  useEffect(() => {
    categories.list({ limit: 100, type: 'product' })
      .then((res) => setCatOptions(res.data.map((c) => ({ value: c._id, label: c.name }))))
      .catch(() => {})
    products.list({ limit: 100 })
      .then((res) => setProductOptions(res.data.map((p) => ({ value: p._id, label: p.name }))))
      .catch(() => {})
  }, [])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    if (name === 'sku') {
      setSkuTouched(true)
      setForm((prev) => ({ ...prev, sku: value.toLowerCase() }))
    } else if (name === 'name') {
      setForm((prev) => ({
        ...prev,
        name: value,
        sku: skuTouched ? prev.sku : toSku(value),
      }))
    } else {
      setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }
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
    if (form.sku && form.sku.trim().length === 1) errs.sku = 'El SKU debe tener al menos 2 caracteres'
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
        variants: form.variants.map((v) => ({
          ...v,
          price: v.price === '' ? undefined : Number(v.price),
          stock: v.stock === '' ? 0 : Number(v.stock),
        })),
        packageItems: form.isPackage ? form.packageItems.filter((i) => i.product) : [],
      }
      let res
      if (isEdit) {
        res = await products.update(initial._id, payload)
      } else {
        res = await products.create(payload)
      }
      if (onSuccess) {
        onSuccess(res.data)
      } else {
        router.push('/admin/productos')
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
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-5">Información básica</h2>
          <div className="flex flex-col gap-4">
            <FormField label="Nombre" required error={errors.name}>
              <Input name="name" value={form.name} onChange={handleChange} placeholder="Ej: Sérum vitamina C" />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Marca">
                <Input name="brand" value={form.brand} onChange={handleChange} placeholder="Ej: La Roche-Posay" />
              </FormField>
              <FormField label="SKU" error={errors.sku}>
                <Input name="sku" value={form.sku} onChange={handleChange} placeholder="Código interno" />
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
                    className="flex items-center gap-1 px-2.5 py-2.5 rounded-md border border-dashed border-border text-sm text-text-muted hover:border-primary hover:text-primary transition-colors"
                    title="Nueva categoría"
                  >
                    <Plus size={15} weight="bold" />
                  </button>
                </div>
              </FormField>
            </div>
            <FormField label="Descripción corta">
              <Textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} rows={2} placeholder="Aparece en listados y tarjetas" />
            </FormField>
            <FormField label="Descripción completa">
              <Textarea name="description" value={form.description} onChange={handleChange} rows={5} />
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Precio (MXN)">
                <Input name="price" type="number" value={form.price} onChange={handleChange} placeholder="0" min="0" />
              </FormField>
              <FormField label="Precio tachado">
                <Input name="compareAtPrice" type="number" value={form.compareAtPrice} onChange={handleChange} placeholder="0" min="0" />
              </FormField>
            </div>
          </div>
        </Card>

        {/* Tipo de piel */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-5">Tipo de piel</h2>
          <div className="flex flex-col gap-4">
            <FormField label="Tipos de piel">
              <TagInput {...arr('skinTypes')} suggestions={SKIN_TYPES} placeholder="Añadir tipo…" />
            </FormField>
            <FormField label="Preocupaciones">
              <TagInput {...arr('skinConcerns')} suggestions={SKIN_CONCERNS} placeholder="Añadir preocupación…" />
            </FormField>
            <FormField label="Mejor para">
              <TagInput {...arr('bestFor')} placeholder="Añadir…" />
            </FormField>
          </div>
        </Card>

        {/* Ingredientes y uso */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-5">Ingredientes y uso</h2>
          <div className="flex flex-col gap-4">
            <FormField label="Ingredientes (texto libre)">
              <Textarea name="ingredients" value={form.ingredients} onChange={handleChange} rows={3} />
            </FormField>
            <FormField label="Ingredientes clave">
              <KeyIngredientList {...arr('keyIngredients')} />
            </FormField>
            <FormField label="Beneficios">
              <TagInput {...arr('benefits')} placeholder="Añadir beneficio…" />
            </FormField>
            <FormField label="Modo de uso (cliente)">
              <Textarea name="howToUse" value={form.howToUse} onChange={handleChange} rows={2} />
            </FormField>
            <FormField label="Cómo lo usamos en clínica">
              <Textarea name="howWeUseIt" value={form.howWeUseIt} onChange={handleChange} rows={2} />
            </FormField>
          </div>
        </Card>

        {/* Variantes */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-5">Variantes</h2>
          <VariantList {...arr('variants')} />
        </Card>

        {/* Imágenes */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-5">Imágenes</h2>
          <ImageUploader entity="products" multiple {...arr('images')} />
        </Card>

        {/* Paquete */}
        <Card>
          <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-3">Paquete</h2>
          <Checkbox
            label="Este producto es un paquete (agrupa otros productos)"
            name="isPackage"
            checked={form.isPackage}
            onChange={handleChange}
            className="mb-4"
          />
          {form.isPackage && (
            <div className="pt-2 border-t border-border">
              <p className="text-sm text-text-muted mb-4">
                Selecciona los productos que forman parte de este paquete.
              </p>
              <PackageItemPicker
                value={form.packageItems}
                onChange={(v) => setForm((p) => ({ ...p, packageItems: v }))}
                productOptions={productOptions.filter((p) => p.value !== initial?._id)}
              />
            </div>
          )}
        </Card>

        {/* Estado */}
        <Card>
          <div className="flex flex-col gap-3">
            <Checkbox label="Producto activo (visible en el sitio)" name="active" checked={form.active} onChange={handleChange} />
            <Checkbox label="Destacado — mostrar en el Home" name="isFeatured" checked={form.isFeatured} onChange={handleChange} />
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
            {isEdit ? 'Guardar cambios' : 'Crear producto'}
          </Button>
        </div>
      </form>

      <QuickCategoryModal
        open={showNewCat}
        onClose={() => setShowNewCat(false)}
        onCreated={handleCategoryCreated}
        type="product"
      />
    </>
  )
}
