export default function SectionHeading({
  lightText,
  boldText,
  sizeClasses = "text-4xl md:text-5xl lg:text-6xl",
  as: Tag = "h2",
  textColor = "var(--pub-text)",
  boldColor = "var(--pub-accent)",
  break: lineBreak = false,
  className = "",
  children,
}) {
  if (children) {
    return (
      <Tag
        className={`${sizeClasses} leading-tight ${className}`}
        style={{ color: textColor }}
      >
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={`${sizeClasses} leading-tight ${className}`}
      style={{ color: textColor }}
    >
      <span className="font-light">{lightText} </span>
      {lineBreak && <br />}
      <span className="font-bold" style={{ color: boldColor }}>
        {boldText}
      </span>
    </Tag>
  );
}
