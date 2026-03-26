'use client'

import { useState } from 'react'

export default function TagInput({ value = [], onChange, placeholder = 'Añadir…', suggestions = [] }) {
  const [input, setInput] = useState('')

  function add(text) {
    const trimmed = text.trim()
    if (!trimmed || value.includes(trimmed)) { setInput(''); return }
    onChange([...value, trimmed])
    setInput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      add(input)
    }
    if (e.key === 'Backspace' && !input && value.length) {
      onChange(value.slice(0, -1))
    }
  }

  function remove(tag) {
    onChange(value.filter((t) => t !== tag))
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1.5 min-h-[2.5rem] p-2 rounded-md border border-border bg-surface focus-within:border-[var(--color-border-focus)]">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-light text-primary text-xs font-medium"
          >
            {tag}
            <button type="button" onClick={() => remove(tag)} className="hover:opacity-70 leading-none">×</button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input && add(input)}
          placeholder={value.length ? '' : placeholder}
          className="flex-1 min-w-[120px] bg-transparent text-sm text-text outline-none placeholder:text-text-muted"
        />
      </div>
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {suggestions.filter((s) => !value.includes(s)).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChange([...value, s])}
              className="px-2 py-0.5 rounded-full border border-border text-xs text-text-muted hover:border-primary hover:text-primary transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>
      )}
      <p className="text-xs text-text-muted">Presiona Enter o coma para añadir</p>
    </div>
  )
}
