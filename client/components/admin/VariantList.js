'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function VariantList({ value = [], onChange }) {
  function add() {
    onChange([...value, { title: '', price: '', sku: '', stock: 0 }])
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
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-2 px-1 text-xs text-text-muted font-medium">
          <span>Título</span>
          <span>Precio</span>
          <span>SKU</span>
          <span>Stock</span>
          <span />
        </div>
      )}
      {value.map((item, i) => (
        <div key={i} className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-2 items-center">
          <Input
            placeholder="Ej: 50ml"
            value={item.title}
            onChange={(e) => update(i, 'title', e.target.value)}
          />
          <Input
            type="number"
            placeholder="0"
            min="0"
            value={item.price}
            onChange={(e) => update(i, 'price', e.target.value)}
          />
          <Input
            placeholder="SKU"
            value={item.sku}
            onChange={(e) => update(i, 'sku', e.target.value)}
          />
          <Input
            type="number"
            placeholder="0"
            min="0"
            value={item.stock}
            onChange={(e) => update(i, 'stock', e.target.value)}
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="text-text-muted hover:text-danger transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>
      ))}
      <Button type="button" variant="secondary" size="sm" onClick={add} className="w-fit">
        + Añadir variante
      </Button>
    </div>
  )
}
