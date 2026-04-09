export default function CategoryNav({ categories, activeCategory, onSelect }) {
  return (
    <nav
      className="relative overflow-x-auto scrollbar-hide border-b border-black/5"
      style={{ background: "var(--pub-accent-light)" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-3 py-4 md:py-5">
        {[{ _id: "todos", name: "Todos los productos" }, ...categories].map(
          (cat) => {
            const isActive = activeCategory === cat._id;
            return (
              <button
                key={cat._id}
                onClick={() => onSelect(cat._id)}
                className={`shrink-0 flex items-center justify-center px-5 py-2.5 md:px-10 md:py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-200 cursor-pointer whitespace-nowrap rounded-full active:scale-[0.97] border ${
                  isActive
                    ? "bg-(--pub-accent) text-white border-(--pub-accent)"
                    : "bg-transparent text-(--pub-text) border-(--pub-border) hover:bg-(--pub-accent)/8 hover:border-(--pub-accent)"
                }`}
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
