'use client'

import { cn } from '@/lib/utils'
import type { ChangeEvent, FocusEvent } from 'react'

interface ScoreInputProps {
  value: number
  onChange: (v: number) => void
  'aria-label': string
  className?: string
}

export function ScoreInput({
  value,
  onChange,
  'aria-label': ariaLabel,
  className,
}: ScoreInputProps) {
  const isEmpty = value === 0

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (raw === '') {
      onChange(0)
      return
    }
    const parsed = parseInt(raw, 10)
    if (!isNaN(parsed)) {
      onChange(parsed)
    }
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const raw = e.target.value
    if (raw === '' || raw === '0') {
      onChange(0)
      return
    }
    const parsed = parseInt(raw, 10)
    if (isNaN(parsed)) {
      onChange(0)
    } else {
      // Clamp to 1–10
      const clamped = Math.min(10, Math.max(1, parsed))
      onChange(clamped)
    }
  }

  return (
    <input
      type="number"
      inputMode="numeric"
      min={1}
      max={10}
      value={value === 0 ? '' : value}
      onChange={handleChange}
      onBlur={handleBlur}
      aria-label={ariaLabel}
      className={cn(
        'w-12 sm:w-14 rounded-lg border text-center text-sm font-medium transition-colors',
        'bg-[var(--md-surface-container-high)] text-[var(--md-on-surface)]',
        'focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)]',
        isEmpty
          ? 'border-amber-400 placeholder-amber-400'
          : 'border-[var(--md-outline-variant)]',
        'py-1 px-1',
        className
      )}
      placeholder="—"
    />
  )
}
