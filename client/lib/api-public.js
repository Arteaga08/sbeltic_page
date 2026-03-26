// Fetch functions for public (unauthenticated) Server Components
// Uses native fetch — no localStorage, no auth headers

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

function buildQS(params = {}) {
  const filtered = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== '' && v !== null)
  )
  const qs = new URLSearchParams(filtered).toString()
  return qs ? `?${qs}` : ''
}

async function get(path, params = {}) {
  try {
    const res = await fetch(`${BASE_URL}${path}${buildQS(params)}`, {
      next: { revalidate: 60 }, // ISR: revalidar cada 60 segundos
    })
    if (!res.ok) return { data: [], total: 0 }
    return res.json()
  } catch {
    return { data: [], total: 0 }
  }
}

// ─── Treatments ──────────────────────────────────────────────────────────────

export const publicTreatments = {
  list: (params = {}) => get('/api/treatments', params),
  get: (slug) => get(`/api/treatments/${slug}`),
}

// ─── Products ────────────────────────────────────────────────────────────────

export const publicProducts = {
  list: (params = {}) => get('/api/products', params),
  get: (slug) => get(`/api/products/${slug}`),
}

// ─── Categories ──────────────────────────────────────────────────────────────

export const publicCategories = {
  list: (params = {}) => get('/api/categories', params),
}
