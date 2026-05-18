'use client'

import { useState, use, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDecision } from '@/hooks/useDecision'
import { WinnerBanner } from '@/components/decision/WinnerBanner'
import { BreakdownToggle } from '@/components/decision/BreakdownToggle'
import { ExportBar } from '@/components/decision/ExportBar'
import { DecisionTable } from '@/components/decision/DecisionTable'
import { DecisionWizard } from '@/components/wizard/DecisionWizard'

interface PageProps {
  params: Promise<{ id: string }>
}

function DecisionPageContent({ id }: { id: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const {
    decision,
    result,
    updateTitle,
    updateOptionName,
    updateCriterion,
    addCriterion,
    deleteCriterion,
    reorderCriteria,
    resetToTemplate,
  } = useDecision(id)

  const [showBreakdown, setShowBreakdown] = useState(false)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [wizardDone, setWizardDone] = useState(false)

  if (!decision) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading decision…</p>
        </div>
      </div>
    )
  }

  const isWizardMode =
    !wizardDone &&
    searchParams.get('wizard') === '1' &&
    decision.criteria.length > 0

  if (isWizardMode) {
    return (
      <DecisionWizard
        decision={decision}
        onUpdateOptionName={updateOptionName}
        onUpdateCriterion={updateCriterion}
        onComplete={() => {
          setWizardDone(true)
          router.replace(`/decide/${id}`)
        }}
      />
    )
  }

  const handleResetToTemplate = () => {
    if (
      window.confirm(
        'Reset criteria to template defaults? Your current scores will be lost.'
      )
    ) {
      resetToTemplate()
    }
  }

  const handleTitleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const trimmed = e.target.value.trim()
    if (trimmed) updateTitle(trimmed)
    setIsEditingTitle(false)
  }

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') e.currentTarget.blur()
    if (e.key === 'Escape') setIsEditingTitle(false)
  }

  const optionsNamed =
    decision.optionAName !== 'Option A' || decision.optionBName !== 'Option B'

  return (
    <div className="flex flex-1 flex-col">
      <WinnerBanner
        result={result}
        optionAName={decision.optionAName}
        optionBName={decision.optionBName}
      />

      <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-6 sm:px-6">
        {/* Title row */}
        <div className="flex items-center gap-3">
          {isEditingTitle ? (
            <input
              type="text"
              defaultValue={decision.title}
              onBlur={handleTitleBlur}
              onKeyDown={handleTitleKeyDown}
              autoFocus
              className="flex-1 rounded-lg border border-indigo-400 bg-white dark:bg-gray-800 px-3 py-1.5 text-2xl font-bold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Decision title"
            />
          ) : (
            <h1
              role="button"
              tabIndex={0}
              onClick={() => setIsEditingTitle(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setIsEditingTitle(true)
                }
              }}
              className="flex-1 cursor-text text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none focus:underline"
              title="Click to edit title"
            >
              {decision.title}
            </h1>
          )}

          {decision.templateSlug && (
            <button
              type="button"
              onClick={handleResetToTemplate}
              className="shrink-0 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Reset
            </button>
          )}

          <button
            type="button"
            onClick={() => router.push('/')}
            className="shrink-0 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            ← Back
          </button>
        </div>

        {/* Hint — only shown when options haven't been named yet */}
        {!optionsNamed && (
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 px-4 py-3 text-sm text-amber-800 dark:text-amber-300">
            <span className="shrink-0 text-base">💡</span>
            <span>
              <strong>How to use:</strong> Click the column headers to rename your options (e.g.
              &ldquo;Google&rdquo; vs &ldquo;Startup&rdquo;). Set a <strong>Weight</strong> (1–10)
              for how much each criterion matters, then score each option. Winner is calculated
              automatically.
            </span>
          </div>
        )}

        <div className="flex items-center justify-end">
          <BreakdownToggle
            showBreakdown={showBreakdown}
            onToggle={() => setShowBreakdown((prev) => !prev)}
          />
        </div>

        <div id="export-target">
          <DecisionTable
            decision={decision}
            result={result}
            showBreakdown={showBreakdown}
            onUpdateCriterion={updateCriterion}
            onAddCriterion={addCriterion}
            onDeleteCriterion={deleteCriterion}
            onReorderCriteria={reorderCriteria}
            onUpdateOptionName={updateOptionName}
          />
        </div>

        <ExportBar decision={decision} result={result} className="pt-2" />
      </div>
    </div>
  )
}

export default function DecisionPage({ params }: PageProps) {
  const { id } = use(params)
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        </div>
      }
    >
      <DecisionPageContent id={id} />
    </Suspense>
  )
}
