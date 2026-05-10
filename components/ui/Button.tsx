import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  className?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-indigo-300 dark:disabled:bg-indigo-800',
  secondary:
    'border border-gray-300 dark:border-gray-600 bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-700 disabled:text-gray-400 dark:disabled:text-gray-600',
  ghost:
    'bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 disabled:text-gray-400 dark:disabled:text-gray-600',
}

export function Button({
  variant = 'primary',
  className,
  children,
  disabled,
  type = 'button',
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:cursor-not-allowed',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
