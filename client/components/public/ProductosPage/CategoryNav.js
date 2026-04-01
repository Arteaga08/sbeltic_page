export default function CategoryNav({ categories, activeCategory, onSelect }) {
  return (
    <nav
      className="relative overflow-x-auto scrollbar-hide border-b border-black/5"
      style={{ background: "var(--pub-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-3 py-4 md:py-5">
        {[{ _id: "todos", name: "Todos los productos" }, ...categories].map(
          (cat) => {
            const isActive = activeCategory === cat._id;
            return (
              <button
                key={cat._id}
                onClick={() => onSelect(cat._id)}
                className="shrink-0 flex items-center justify-center px-8 py-3 md:px-10 md:py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer whitespace-nowrap rounded-full"
                style={{
                  background: isActive ? "var(--pub-accent)" : "transparent",
                  color: isActive ? "#ffffff" : "var(--pub-text)",
                  border: "1px solid",
                  borderColor: isActive
                    ? "var(--pub-accent)"
                    : "var(--pub-border)",
                }}
              >
                {cat.name}
              </button>
            );
          },
        )}
      </div>
    </nav>
  );
}
