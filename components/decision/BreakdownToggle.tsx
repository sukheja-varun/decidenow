'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreakdownToggleProps {
  showBreakdown: boolean
  onToggle: () => void
  className?: string
}

export function BreakdownToggle({
  showBreakdown,
  onToggle,
  className,
}: BreakdownToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={showBreakdown}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
        'text-indigo-600 dark:text-indigo-400',
        'hover:bg-indigo-50 dark:hover:bg-indigo-900/30',
        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
        className
      )}
    >
      {showBreakdown ? (
        <>
          Hide breakdown
          <ChevronUp size={16} aria-hidden="true" />
        </>
      ) : (
        <>
          Show breakdown
          <ChevronDown size={16} aria-hidden="true" />
        </>
      )}
    </button>
  )
}
