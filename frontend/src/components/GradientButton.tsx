import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function GradientButton({ children, className = '', size = 'md', ...props }: GradientButtonProps) {
  const sizeClasses = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={`primary-gradient rounded-xl font-bold text-on-primary-fixed shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
