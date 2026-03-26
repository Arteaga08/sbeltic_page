'use client'

import Link from 'next/link'
import { PlusIcon as Plus, ArrowLeftIcon as ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import Button from './Button'

function ActionButton({ action }) {
  const btn = (
    <Button variant={action.variant ?? 'primary'} onClick={action.onClick}>
      {action.icon !== false && <Plus size={16} weight="bold" />}
      {action.label}
    </Button>
  )
  if (action.href) return <Link href={action.href}>{btn}</Link>
  return btn
}

export default function PageHeader({ title, subtitle, action, secondaryAction, eyebrow, icon: Icon, badge, backHref }) {
  return (
    <div className="bg-surface border border-border rounded-xl shadow-(--shadow-sm) px-6 py-5 mb-7">
      {backHref && (
        <Link href={backHref} className="inline-flex items-center gap-1.5 text-xs text-text-subtle hover:text-primary transition-colors duration-150 mb-4">
          <ArrowLeft size={13} weight="bold" />
          Volver
        </Link>
      )}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3.5">
          {Icon && (
            <div className="shrink-0 mt-0.5 p-2.5 bg-primary-light rounded-lg border border-primary/10">
              <Icon size={20} weight="duotone" className="text-primary" />
            </div>
          )}
          <div>
            {eyebrow && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-text-subtle mb-1">
                {eyebrow}
              </p>
            )}
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-bold text-text md:text-3xl">{title}</h1>
              {badge && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-text-muted border border-border">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && <p className="text-sm text-text-subtle mt-0.5">{subtitle}</p>}
          </div>
        </div>

        {(action || secondaryAction) && (
          <div className="flex items-center gap-2 shrink-0">
            {secondaryAction && <ActionButton action={{ variant: 'secondary', ...secondaryAction }} />}
            {action && <ActionButton action={action} />}
          </div>
        )}
      </div>
    </div>
  )
}
