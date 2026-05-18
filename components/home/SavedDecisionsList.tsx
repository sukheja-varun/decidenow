'use client'

import Link from 'next/link'
import { useDecisions } from '@/hooks/useDecisions'
import { DecisionCard } from '@/components/home/DecisionCard'
import { PlusCircle } from 'lucide-react'

export function SavedDecisionsList() {
  const { decisions, remove } = useDecisions()

  if (decisions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--md-outline-variant)] bg-[var(--md-surface-container)] py-16 px-6 text-center">
        <PlusCircle
          size={40}
          className="mb-4 text-[var(--md-outline)]"
          aria-hidden="true"
        />
        <p className="text-base font-medium text-[var(--md-on-surface-variant)]">
          No decisions yet
        </p>
        <p className="mt-1 text-sm text-[var(--md-on-surface-variant)] opacity-70">
          Pick a template above or start fresh to create your first decision.
        </p>
        <Link
          href="/decide/new"
          className="mt-4 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium text-[var(--md-on-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)]"
          style={{ background: 'var(--md-primary)' }}
        >
          <PlusCircle size={15} aria-hidden="true" />
          New Decision
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {decisions.map((decision) => (
        <DecisionCard
          key={decision.id}
          decision={decision}
          onDelete={remove}
        />
      ))}
    </div>
  )
}
