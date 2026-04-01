const VARIANT_COLORS = {
  dark: "var(--pub-gold-dark)",
  light: "rgba(255,255,255,0.6)",
  gold: "var(--pub-gold)",
  accent: "var(--pub-accent)",
};

export default function SectionEyebrow({
  children,
  variant = "dark",
  className = "",
}) {
  return (
    <p
      className={`text-xs font-semibold tracking-[0.3em] uppercase ${className}`}
      style={{ color: VARIANT_COLORS[variant] }}
    >
      {children}
    </p>
  );
}
