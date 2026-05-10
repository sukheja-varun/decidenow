'use client'

import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import type { Decision } from '@/types'

interface DecisionCardProps {
  decision: Decision
  onDelete: (id: string) => void
  className?: string
}

export function DecisionCard({ decision, onDelete, className }: DecisionCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/decide/${decision.id}`)
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (window.confirm(`Delete "${decision.title}"? This cannot be undone.`)) {
      onDelete(decision.id)
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleCardClick()
        }
      }}
      className={cn(
        'group relative flex flex-col gap-2 rounded-xl border border-gray-200 dark:border-gray-700',
        'bg-white dark:bg-gray-800 p-4 shadow-sm',
        'cursor-pointer transition-all duration-150',
        'hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600',
        'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
        className
      )}
    >
      {/* Title */}
      <h3 className="pr-8 text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
        {decision.title}
      </h3>

      {/* Options */}
      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
        <span className="font-medium text-indigo-600 dark:text-indigo-400">
          {decision.optionAName}
        </span>
        <span className="mx-1.5 text-gray-400 dark:text-gray-500">vs</span>
        <span className="font-medium text-indigo-600 dark:text-indigo-400">
          {decision.optionBName}
        </span>
      </p>

      {/* Date */}
      <p className="text-xs text-gray-400 dark:text-gray-500">
        {formatDate(decision.updatedAt)}
      </p>

      {/* Delete button */}
      <button
        type="button"
        onClick={handleDelete}
        aria-label={`Delete "${decision.title}"`}
        className={cn(
          'absolute right-3 top-3 rounded-lg p-1.5 text-gray-400',
          'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
          'hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/30 dark:hover:text-red-400',
          'transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-400'
        )}
      >
        <Trash2 size={15} aria-hidden="true" />
      </button>
    </div>
  )
}
