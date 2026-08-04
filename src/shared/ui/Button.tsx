import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../utils';

type ButtonVariant =
  'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'outline';

type ButtonSize = 'sm' | 'md' | 'lg';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
  secondary:
    'bg-surface border border-border text-foreground hover:bg-surface-hover',
  danger: 'bg-danger text-white hover:brightness-110',
  success: 'bg-success text-white hover:brightness-110',
  ghost: 'bg-transparent text-foreground hover:bg-surface',
  outline: 'border-2 border-primary bg-transparent text-primary',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4',
  lg: 'h-12 px-6 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      type,
      className,
      variant = 'outline',
      size = 'md',
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled || loading}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors',
        'disabled:border-disabled disabled:text-disabled-foreground disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent',
        'focus:ring-ring focus:ring-2 focus:outline-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  ),
);

Button.displayName = 'Button';
