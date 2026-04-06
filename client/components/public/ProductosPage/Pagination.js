import {
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";

export default function Pagination({ page, pages, total, perPage, onChange }) {
  if (pages <= 1) return null;

  const from = (page - 1) * perPage + 1;
  const to = Math.min(page * perPage, total);

  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8"
      style={{ borderTop: "1px solid var(--pub-border)" }}
    >
      <p
        className="text-[11px] uppercase tracking-widest"
        style={{ color: "var(--pub-text-muted)" }}
      >
        Mostrando {from}–{to} de {total} productos
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className="flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-widest uppercase text-(--pub-text) border border-(--pub-border) bg-transparent transition-all duration-200 cursor-pointer hover:bg-(--pub-accent)/6 hover:border-(--pub-accent) hover:-translate-y-0.5 active:bg-(--pub-accent)/12 active:scale-[0.97] active:translate-y-0 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-(--pub-border) disabled:hover:translate-y-0 disabled:active:scale-100"
        >
          <CaretLeft size={14} />
          Anterior
        </button>

        <span
          className="px-4 py-3 text-xs font-semibold tracking-widest"
          style={{ color: "var(--pub-text-muted)" }}
        >
          {page} / {pages}
        </span>

        <button
          onClick={() => onChange(page + 1)}
          disabled={page === pages}
          className="flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-widest uppercase text-(--pub-text) border border-(--pub-border) bg-transparent transition-all duration-200 cursor-pointer hover:bg-(--pub-accent)/6 hover:border-(--pub-accent) hover:-translate-y-0.5 active:bg-(--pub-accent)/12 active:scale-[0.97] active:translate-y-0 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-(--pub-border) disabled:hover:translate-y-0 disabled:active:scale-100"
        >
          Siguiente
          <CaretRight size={14} />
        </button>
      </div>
    </div>
  );
}
