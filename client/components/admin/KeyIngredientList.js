'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'

export default function KeyIngredientList({ value = [], onChange }) {
  function add() {
    onChange([...value, { name: '', description: '' }])
  }

  function remove(i) {
    onChange(value.filter((_, idx) => idx !== i))
  }

  function update(i, field, val) {
    onChange(value.map((item, idx) => idx === i ? { ...item, [field]: val } : item))
  }

  return (
    <div className="flex flex-col gap-3">
      {value.map((item, i) => (
        <div key={i} className="flex gap-3 items-start p-3 rounded-md border border-border bg-bg">
          <div className="flex-1 flex flex-col gap-2">
            <Input
              placeholder="Nombre del ingrediente"
              value={item.name}
              onChange={(e) => update(i, 'name', e.target.value)}
            />
            <Textarea
              placeholder="Descripción (opcional)"
              value={item.description}
              onChange={(e) => update(i, 'description', e.target.value)}
              rows={2}
            />
          </div>
          <button
            type="button"
            onClick={() => remove(i)}
            className="text-text-muted hover:text-danger transition-colors text-lg leading-none mt-2"
          >
            ×
          </button>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={add} className="w-fit">
        + Añadir ingrediente
      </Button>
    </div>
  )
}
