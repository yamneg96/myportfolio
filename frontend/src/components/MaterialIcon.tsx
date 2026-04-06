interface MaterialIconProps {
  icon: string;
  className?: string;
  filled?: boolean;
  size?: string;
}

export function MaterialIcon({ icon, className = '', filled = false, size }: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
        fontSize: size,
      }}
    >
      {icon}
    </span>
  );
}
