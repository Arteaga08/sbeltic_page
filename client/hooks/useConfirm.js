'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'

export function useConfirm() {
  const [state, setState] = useState({ open: false, title: '', message: '', onConfirm: null })
  const [loading, setLoading] = useState(false)

  function confirm({ title, message, onConfirm }) {
    setState({ open: true, title, message, onConfirm })
  }

  function close() {
    setState((prev) => ({ ...prev, open: false }))
  }

  async function handleConfirm() {
    if (!state.onConfirm) return
    setLoading(true)
    try {
      await state.onConfirm()
    } finally {
      setLoading(false)
      close()
    }
  }

  function ConfirmModal() {
    return (
      <Modal
        open={state.open}
        title={state.title}
        message={state.message}
        onConfirm={handleConfirm}
        onClose={close}
        loading={loading}
      />
    )
  }

  return { confirm, ConfirmModal }
}
