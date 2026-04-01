const SIZE_CLASSES = {
  sm: "w-12",
  md: "w-14",
  lg: "w-3/4 max-w-70 md:max-w-100",
};

export default function GoldDivider({
  size = "md",
  centered = true,
  className = "",
}) {
  return (
    <div
      className={`h-0.5 bg-(--pub-gold) ${SIZE_CLASSES[size]} ${centered ? "mx-auto" : ""} ${className}`}
    />
  );
}
