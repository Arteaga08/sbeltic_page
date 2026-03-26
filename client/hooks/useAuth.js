'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const TOKEN_KEY = 'sbeltic_token'
const USER_KEY = 'sbeltic_user'

export function getToken() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getStoredUser() {
  if (typeof window === 'undefined') return null
  try {
    return JSON.parse(localStorage.getItem(USER_KEY))
  } catch {
    return null
  }
}

export function setStoredUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

// Hook para usar en el admin layout
export function useAuth() {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.replace('/admin/login')
      setChecking(false)
      return
    }
    const stored = getStoredUser()
    setUser(stored)
    setChecking(false)
  }, [router, pathname])

  function logout() {
    clearAuth()
    router.replace('/admin/login')
  }

  return { user, checking, logout }
}
