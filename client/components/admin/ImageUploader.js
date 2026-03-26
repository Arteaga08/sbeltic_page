'use client'

import { useState } from 'react'
import { upload } from '@/lib/api'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export default function ImageUploader({ entity, value, onChange, multiple = false }) {
  const [localPreviews, setLocalPreviews] = useState([])
  const [error, setError] = useState('')

  const urls = multiple
    ? Array.isArray(value) ? value : (value ? [value] : [])
    : (value ? [value] : [])

  async function handleFiles(e) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setError('')

    // Preview instantánea con blob URLs mientras sube
    const previews = files.map((f) => URL.createObjectURL(f))
    setLocalPreviews((prev) => multiple ? [...prev, ...previews] : previews)

    try {
      const { urls: newUrls } = await upload.uploadImages(files, entity)
      setLocalPreviews((prev) => prev.filter((p) => !previews.includes(p)))
      previews.forEach((p) => URL.revokeObjectURL(p))
      const merged = multiple ? [...urls, ...newUrls] : newUrls
      onChange(multiple ? merged : merged[0])
    } catch (err) {
      setError(err.message)
      setLocalPreviews((prev) => prev.filter((p) => !previews.includes(p)))
      previews.forEach((p) => URL.revokeObjectURL(p))
    } finally {
      e.target.value = ''
    }
  }

  async function handleRemove(url) {
    try {
      await upload.deleteImage(url)
    } catch {
      // imagen puede no existir — continuar
    }
    const next = urls.filter((u) => u !== url)
    onChange(multiple ? next : (next[0] ?? ''))
  }

  const allPreviews = [
    ...urls.map((url) => ({ src: `${BASE_URL}${url}`, key: url, uploading: false, onRemove: () => handleRemove(url) })),
    ...localPreviews.map((blob) => ({ src: blob, key: blob, uploading: true, onRemove: null })),
  ]

  return (
    <div className="flex flex-col gap-3">
      {/* Previews */}
      {allPreviews.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {allPreviews.map(({ src, key, uploading, onRemove }) => (
            <div key={key} className="relative group">
              <div className="relative h-24 w-24 rounded-md overflow-hidden border border-border bg-bg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
                {uploading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-xs">Subiendo…</span>
                  </div>
                )}
              </div>
              {onRemove && (
                <button
                  type="button"
                  onClick={onRemove}
                  className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-danger text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      {(multiple || allPreviews.length === 0) && (
        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-dashed border-border text-sm text-text-muted cursor-pointer hover:border-primary hover:text-primary transition-colors w-fit">
          {multiple ? '+ Añadir imágenes' : '+ Subir imagen'}
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple={multiple}
            onChange={handleFiles}
            className="hidden"
          />
        </label>
      )}

      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  )
}
