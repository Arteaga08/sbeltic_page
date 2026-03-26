'use client'

import { PlusIcon as Plus, Trash } from '@phosphor-icons/react'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

// value: [{ product: id, quantity: number }]
// productOptions: [{ value: id, label: name }]
export default function PackageItemPicker({ value = [], onChange, productOptions = [] }) {
  function add() {
    onChange([...value, { product: '', quantity: 1 }])
  }

  function remove(i) {
    onChange(value.filter((_, idx) => idx !== i))
  }

  function update(i, field, val) {
    onChange(value.map((item, idx) => idx === i ? { ...item, [field]: val } : item))
  }

  return (
    <div className="flex flex-col gap-3">
      {value.length > 0 && (
        <div className="grid grid-cols-[1fr_100px_36px] gap-2 px-1">
          <span className="text-xs font-semibold text-text-subtle uppercase tracking-wider">Producto</span>
          <span className="text-xs font-semibold text-text-subtle uppercase tracking-wider">Cantidad</span>
          <span />
        </div>
      )}

      {value.map((item, i) => (
        <div key={i} className="grid grid-cols-[1fr_100px_36px] gap-2 items-center">
          <Select
            value={item.product}
            onChange={(e) => update(i, 'product', e.target.value)}
            options={productOptions}
            placeholder="Seleccionar producto…"
          />
          <Input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => update(i, 'quantity', Number(e.target.value))}
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="h-9 w-9 flex items-center justify-center rounded-sm text-text-muted hover:text-danger hover:bg-danger-light transition-colors"
          >
            <Trash size={16} />
          </button>
        </div>
      ))}

      <Button type="button" variant="secondary" size="sm" onClick={add} className="w-fit">
        <Plus size={14} weight="bold" />
        Añadir producto al paquete
      </Button>

      {value.length === 0 && (
        <p className="text-sm text-text-subtle">
          Añade los productos que componen este paquete.
        </p>
      )}
    </div>
  )
}
