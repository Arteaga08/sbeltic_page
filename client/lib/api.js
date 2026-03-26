const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

function getToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('sbeltic_token')
}

function handleUnauthorized() {
  if (typeof window === 'undefined') return
  // Solo actuar si había una sesión activa — un login fallido no debe redirigir
  const hadSession = !!localStorage.getItem('sbeltic_token')
  localStorage.removeItem('sbeltic_token')
  localStorage.removeItem('sbeltic_user')
  if (hadSession) window.location.href = '/admin/login'
}

async function request(method, path, body = null) {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (res.status === 401) {
    handleUnauthorized()
    throw new Error('Sesión expirada, inicia sesión nuevamente')
  }

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Error en la solicitud')
  return data
}

function buildQS(params) {
  const filtered = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== '' && v !== null)
  )
  const qs = new URLSearchParams(filtered).toString()
  return qs ? `?${qs}` : ''
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export const auth = {
  login: (email, password) =>
    request('POST', '/api/auth/login', { email, password }),
  logout: () =>
    request('POST', '/api/auth/logout'),
  me: () =>
    request('GET', '/api/auth/me'),
  changePassword: (currentPassword, newPassword) =>
    request('PUT', '/api/auth/change-password', { currentPassword, newPassword }),
}

// ─── Categories ──────────────────────────────────────────────────────────────

export const categories = {
  list: (params = {}) =>
    request('GET', `/api/categories${buildQS(params)}`),
  get: (id) =>
    request('GET', `/api/categories/${id}`),
  create: (body) =>
    request('POST', '/api/categories', body),
  update: (id, body) =>
    request('PUT', `/api/categories/${id}`, body),
  delete: (id) =>
    request('DELETE', `/api/categories/${id}`),
}

// ─── Treatments ──────────────────────────────────────────────────────────────

export const treatments = {
  list: (params = {}) =>
    request('GET', `/api/treatments${buildQS(params)}`),
  get: (id) =>
    request('GET', `/api/treatments/${id}`),
  create: (body) =>
    request('POST', '/api/treatments', body),
  update: (id, body) =>
    request('PUT', `/api/treatments/${id}`, body),
  delete: (id) =>
    request('DELETE', `/api/treatments/${id}`),
}

// ─── Products ────────────────────────────────────────────────────────────────

export const products = {
  list: (params = {}) =>
    request('GET', `/api/products${buildQS(params)}`),
  get: (id) =>
    request('GET', `/api/products/${id}`),
  create: (body) =>
    request('POST', '/api/products', body),
  update: (id, body) =>
    request('PUT', `/api/products/${id}`, body),
  delete: (id) =>
    request('DELETE', `/api/products/${id}`),
}

// ─── Upload ──────────────────────────────────────────────────────────────────

export const upload = {
  // entity: 'categories' | 'treatments' | 'products'
  uploadImages: async (files, entity) => {
    const token = getToken()
    const formData = new FormData()
    Array.from(files).forEach((file) => formData.append('images', file))

    const res = await fetch(`${BASE_URL}/api/upload/${entity}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
    if (res.status === 401) {
      handleUnauthorized()
      throw new Error('Sesión expirada, inicia sesión nuevamente')
    }
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Error al subir imágenes')
    return data // { urls: ["/uploads/..."] }
  },

  deleteImage: (url) =>
    request('DELETE', '/api/upload', { url }),
}
