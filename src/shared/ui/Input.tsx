import clsx from 'clsx';
import { forwardRef, type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-foreground text-sm font-medium">
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={id}
        className={clsx(
          'bg-surface text-foreground h-11 rounded-md border px-3 transition-colors outline-none',
          'border-border',
          'placeholder:text-muted-foreground',
          'focus:border-primary focus:ring-ring focus:ring-2',
          'disabled:bg-disabled disabled:text-disabled-foreground disabled:cursor-not-allowed',
          error && 'border-danger focus:border-danger focus:ring-danger/25',
          className,
        )}
        {...props}
      />

      {error && <span className="text-danger text-sm">{error}</span>}
    </div>
  ),
);

Input.displayName = 'Input';
