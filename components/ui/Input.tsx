import { cn } from '@/lib/utils'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange']
  placeholder?: string
  className?: string
  'aria-label'?: string
}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors',
        'focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0',
        'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400',
        'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500',
        'dark:focus:border-indigo-400 dark:focus:ring-indigo-400',
        'dark:disabled:bg-gray-900 dark:disabled:text-gray-600',
        className
      )}
      {...props}
    />
  )
}
