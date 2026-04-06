import { X } from "@phosphor-icons/react/dist/ssr";

export default function MobileFilterPanel({ isOpen, onClose, children }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(26,22,20,0.5)" }}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "var(--pub-accent-light)" }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid var(--pub-border)" }}
        >
          <h2
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "var(--pub-text)" }}
          >
            Filtros
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:bg-black/6 active:bg-black/12 active:scale-[0.92]"
            style={{ color: "var(--pub-text)" }}
            aria-label="Cerrar filtros"
          >
            <X size={20} weight="light" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
        <div
          className="px-6 py-4"
          style={{ borderTop: "1px solid var(--pub-border)" }}
        >
          <button
            onClick={onClose}
            className="w-full py-4 text-xs font-bold tracking-widest uppercase cursor-pointer transition-all duration-200 bg-(--pub-text) hover:bg-[#2C2420] active:scale-[0.97] active:opacity-90 rounded-none"
            style={{ color: "#fff" }}
          >
            Aplicar
          </button>
        </div>
      </div>
    </>
  );
}
