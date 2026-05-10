'use client'

import Link from 'next/link'
import { useDecisions } from '@/hooks/useDecisions'
import { DecisionCard } from '@/components/home/DecisionCard'
import { PlusCircle } from 'lucide-react'

export function SavedDecisionsList() {
  const { decisions, remove } = useDecisions()

  if (decisions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-16 px-6 text-center">
        <PlusCircle
          size={40}
          className="mb-4 text-gray-300 dark:text-gray-600"
          aria-hidden="true"
        />
        <p className="text-base font-medium text-gray-500 dark:text-gray-400">
          No decisions yet
        </p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
          Pick a template above or start fresh to create your first decision.
        </p>
        <Link
          href="/decide/new"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
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
