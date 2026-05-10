'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface DarkModeToggleProps {
  className?: string
}

export function DarkModeToggle({ className }: DarkModeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Render a placeholder with the same dimensions to avoid layout shift
    return (
      <div
        className={cn(
          'h-9 w-9 rounded-lg',
          className
        )}
        aria-hidden="true"
      />
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors',
        'hover:bg-gray-100 hover:text-gray-900',
        'dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100',
        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
        className
      )}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
