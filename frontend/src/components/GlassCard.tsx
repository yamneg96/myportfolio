import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={`glass-card rounded-xl border border-outline-variant/20 relative overflow-hidden ${
        hover ? 'hover:border-primary/40 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
