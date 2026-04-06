import {
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react/dist/ssr";

export default function FilterAccordion({
  title,
  items,
  selected,
  onToggle,
  isOpen,
  onToggleOpen,
}) {
  return (
    <div
      style={{ borderBottom: "1px solid var(--pub-border)" }}
      className="py-4"
    >
      <button
        onClick={onToggleOpen}
        className="w-full flex items-center justify-between cursor-pointer rounded-sm transition-colors duration-200 hover:bg-black/3 active:bg-black/6 py-0.5 -my-0.5 px-1 -mx-1"
      >
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: "var(--pub-text)" }}
        >
          {title}
        </span>
        {isOpen ? (
          <CaretUp size={16} style={{ color: "var(--pub-text-muted)" }} />
        ) : (
          <CaretDown size={16} style={{ color: "var(--pub-text-muted)" }} />
        )}
      </button>
      {isOpen && (
        <div className="mt-4 flex flex-col gap-3">
          {items.map((item) => {
            const checked = selected.includes(item);
            return (
              <label
                key={item}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
                  style={{
                    border: "1px solid",
                    borderColor: checked
                      ? "var(--pub-text)"
                      : "var(--pub-border)",
                    background: "transparent",
                  }}
                >
                  {checked && (
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "var(--pub-text)" }}
                    />
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(item)}
                  className="sr-only"
                />
                <span
                  className="text-sm font-light transition-colors duration-200"
                  style={{ color: "var(--pub-text)" }}
                >
                  {item}
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
