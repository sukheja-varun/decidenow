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
        'inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium transition-colors',
        'text-[var(--md-primary)]',
        'hover:bg-[var(--md-primary-container)]/30',
        'focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)]',
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
