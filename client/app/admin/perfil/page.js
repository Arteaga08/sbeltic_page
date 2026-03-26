'use client'

import { useState } from 'react'
import { UserCircleIcon as UserCircle } from '@phosphor-icons/react'
import { auth } from '@/lib/api'
import { getStoredUser } from '@/hooks/useAuth'
import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import FormField from '@/components/ui/FormField'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const INITIAL = { currentPassword: '', newPassword: '', confirm: '' }

export default function PerfilPage() {
  const user = getStoredUser()
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [serverError, setServerError] = useState('')

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    setSuccess('')
    setServerError('')
  }

  function validate() {
    const errs = {}
    if (!form.currentPassword) errs.currentPassword = 'Ingresa tu contraseña actual'
    if (!form.newPassword) errs.newPassword = 'Ingresa la nueva contraseña'
    else if (form.newPassword.length < 8) errs.newPassword = 'Mínimo 8 caracteres'
    if (form.newPassword !== form.confirm) errs.confirm = 'Las contraseñas no coinciden'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSaving(true)
    setServerError('')
    try {
      await auth.changePassword(form.currentPassword, form.newPassword)
      setForm(INITIAL)
      setSuccess('Contraseña actualizada correctamente.')
    } catch (err) {
      setServerError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-lg">
      <PageHeader
        eyebrow="Cuenta"
        icon={UserCircle}
        title="Perfil"
        subtitle="Gestiona tu información de acceso"
      />

      <Card className="mb-4">
        <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-4">
          Información de cuenta
        </h2>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-text-muted">Nombre</p>
          <p className="text-sm font-medium text-text">{user?.name ?? '—'}</p>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <p className="text-sm text-text-muted">Correo</p>
          <p className="text-sm font-medium text-text">{user?.email ?? '—'}</p>
        </div>
      </Card>

      <Card>
        <h2 className="text-xs font-semibold text-text-subtle uppercase tracking-widest mb-5">
          Cambiar contraseña
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FormField label="Contraseña actual" required error={errors.currentPassword}>
            <Input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </FormField>
          <FormField label="Nueva contraseña" required error={errors.newPassword}>
            <Input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </FormField>
          <FormField label="Confirmar nueva contraseña" required error={errors.confirm}>
            <Input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </FormField>

          {serverError && (
            <div className="bg-danger-light border border-danger/20 rounded-md px-4 py-3">
              <p className="text-sm text-danger">{serverError}</p>
            </div>
          )}
          {success && (
            <div className="bg-success-light border border-success/20 rounded-md px-4 py-3">
              <p className="text-sm text-success">{success}</p>
            </div>
          )}

          <div className="flex justify-end pt-1">
            <Button type="submit" loading={saving}>Actualizar contraseña</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
