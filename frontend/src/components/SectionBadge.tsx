interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionBadge({ children, className = '' }: SectionBadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase ${className}`}
    >
      {children}
    </span>
  );
}
