'use client'

import { useRouter } from 'next/navigation'
import { Trash2, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import { calculateResult } from '@/lib/decision-engine'
import type { Decision } from '@/types'

interface DecisionCardProps {
  decision: Decision
  onDelete: (id: string) => void
  className?: string
}

export function DecisionCard({ decision, onDelete, className }: DecisionCardProps) {
  const router = useRouter()
  const result = calculateResult(decision.criteria)

  const winnerName =
    result.winner === 'A'
      ? decision.optionAName
      : result.winner === 'B'
      ? decision.optionBName
      : null

  const maxScore = result.totalA + result.totalB
  const winnerScore = result.winner === 'A' ? result.totalA : result.winner === 'B' ? result.totalB : 0
  const scorePct = maxScore > 0 ? Math.round((winnerScore / maxScore) * 100) : 0

  const templateLabel = decision.templateSlug
    ? decision.templateSlug.replace(/-/g, ' ')
    : null

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
        'group relative flex flex-col gap-3 rounded-2xl border p-4 shadow-sm cursor-pointer transition-all duration-150',
        'border-[var(--md-outline-variant)] bg-[var(--md-surface-container)]',
        'hover:shadow-md hover:border-[var(--md-primary)]/50 hover:bg-[var(--md-surface-container-high)]',
        'focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] focus:ring-offset-2',
        className
      )}
    >
      {/* Header row: category badge + delete */}
      <div className="flex items-start justify-between gap-2">
        {templateLabel ? (
          <span className="inline-flex items-center rounded-full bg-[var(--md-primary-container)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--md-on-primary-container)] capitalize">
            {templateLabel}
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full bg-[var(--md-surface-container-highest)] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--md-on-surface-variant)]">
            Custom
          </span>
        )}
        <button
          type="button"
          onClick={handleDelete}
          aria-label={`Delete "${decision.title}"`}
          className={cn(
            'shrink-0 rounded-lg p-1.5 text-[var(--md-on-surface-variant)]',
            'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
            'hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400',
            'transition-all focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-400'
          )}
        >
          <Trash2 size={14} aria-hidden="true" />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold leading-snug text-[var(--md-on-surface)] line-clamp-2">
        {decision.title}
      </h3>

      {/* Winner row */}
      {winnerName && (
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Trophy size={13} className="shrink-0 text-[var(--md-tertiary)]" aria-hidden="true" />
            <span className="text-sm font-semibold truncate" style={{ color: 'var(--md-primary)' }}>
              {winnerName}
            </span>
          </div>
          {scorePct > 0 && (
            <span className="shrink-0 rounded-full bg-[var(--md-primary-container)]/60 px-2 py-0.5 text-xs font-bold" style={{ color: 'var(--md-primary)' }}>
              {scorePct}%
            </span>
          )}
        </div>
      )}

      {result.winner === 'tie' && (
        <p className="text-sm text-[var(--md-on-surface-variant)]">🤝 It&apos;s a tie</p>
      )}

      {result.winner === 'incomplete' && (
        <p className="text-sm text-[var(--md-on-surface-variant)] italic">Scoring in progress…</p>
      )}

      {/* Options */}
      <p className="text-xs text-[var(--md-on-surface-variant)] truncate">
        <span className="font-medium" style={{ color: 'var(--md-primary)' }}>
          {decision.optionAName}
        </span>
        <span className="mx-1.5 opacity-50">vs</span>
        <span className="font-medium" style={{ color: 'var(--md-secondary)' }}>
          {decision.optionBName}
        </span>
      </p>

      {/* Date */}
      <p className="text-xs text-[var(--md-on-surface-variant)] opacity-60">
        {formatDate(decision.updatedAt)}
      </p>
    </div>
  )
}
