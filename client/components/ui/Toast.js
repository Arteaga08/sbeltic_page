import { CheckCircle, XCircle, Info } from '@phosphor-icons/react/dist/ssr'

const ICONS = {
  success: <CheckCircle size={18} weight="fill" className="text-success shrink-0" />,
  error: <XCircle size={18} weight="fill" className="text-danger shrink-0" />,
  info: <Info size={18} weight="fill" className="text-primary shrink-0" />,
}

export default function Toast({ toasts }) {
  if (!toasts?.length) return null

  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm font-medium max-w-sm pointer-events-auto"
          style={{ animation: 'toastIn 0.2s ease-out' }}
        >
          {ICONS[t.type] ?? ICONS.info}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  )
}
