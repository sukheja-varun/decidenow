'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { calculateResult } from '@/lib/decision-engine'
import type { Criterion, Decision } from '@/types'

// ─── Score selector ───────────────────────────────────────────────────────────

function ScoreRow({
  label,
  value,
  onChange,
  color,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  color: 'primary' | 'secondary'
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span
          className="text-sm font-semibold"
          style={{ color: color === 'primary' ? 'var(--md-primary)' : 'var(--md-secondary)' }}
        >
          {label}
        </span>
        <span className="text-xs text-[var(--md-on-surface-variant)] opacity-70">
          {value > 0 ? `${value} / 10` : 'tap to score'}
        </span>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            style={value === n ? {
              background: color === 'primary' ? 'var(--md-primary)' : 'var(--md-secondary)',
              color: color === 'primary' ? 'var(--md-on-primary)' : 'var(--md-on-primary)',
            } : undefined}
            className={cn(
              'min-h-[48px] rounded-xl text-sm font-bold transition-all focus:outline-none focus:ring-2',
              value === n
                ? 'scale-105 shadow-md ring-2'
                : 'bg-[var(--md-surface-container-high)] text-[var(--md-on-surface-variant)] hover:bg-[var(--md-surface-container-highest)]'
            )}
            aria-label={`Score ${n} out of 10`}
            aria-pressed={value === n}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function WizardProgress({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-xs text-[var(--md-on-surface-variant)]">
        <span>Criterion {current} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--md-surface-container-highest)]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: 'var(--md-primary)' }}
        />
      </div>
    </div>
  )
}

// ─── Importance badge ─────────────────────────────────────────────────────────

function ImportanceBadge({ importance }: { importance: number }) {
  const label =
    importance >= 8 ? 'High importance' : importance >= 5 ? 'Medium' : 'Lower weight'
  const cls =
    importance >= 8
      ? 'bg-[var(--md-primary-container)] text-[var(--md-on-primary-container)]'
      : importance >= 5
      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
      : 'bg-[var(--md-surface-container-highest)] text-[var(--md-on-surface-variant)]'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        cls
      )}
    >
      Weight {importance}/10 · {label}
    </span>
  )
}

// ─── Step 1: Name options ─────────────────────────────────────────────────────

function NameStep({
  decisionTitle,
  defaultA,
  defaultB,
  onSkip,
  onConfirm,
}: {
  decisionTitle: string
  defaultA: string
  defaultB: string
  onSkip: () => void
  onConfirm: (a: string, b: string) => void
}) {
  const [nameA, setNameA] = useState(defaultA === 'Option A' ? '' : defaultA)
  const [nameB, setNameB] = useState(defaultB === 'Option B' ? '' : defaultB)
  const canContinue = nameA.trim().length > 0 && nameB.trim().length > 0

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--md-primary)' }}>
          {decisionTitle}
        </p>
        <h2 className="text-2xl font-bold text-[var(--md-on-surface)]">
          What are you comparing?
        </h2>
        <p className="mt-1.5 text-sm text-[var(--md-on-surface-variant)]">
          Give each option a name — you&apos;ll see them throughout your comparison and in your saved history.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold" style={{ color: 'var(--md-primary)' }}>
            Option 1
          </span>
          <input
            type="text"
            value={nameA}
            onChange={(e) => setNameA(e.target.value)}
            placeholder="e.g. Google, Apartment A, Bali…"
            autoFocus
            className="rounded-xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-high)] px-4 py-3 text-base text-[var(--md-on-surface)] placeholder-[var(--md-outline)] focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] transition"
          />
        </label>

        <div className="flex items-center gap-3 px-2">
          <div className="h-px flex-1 bg-[var(--md-outline-variant)]" />
          <span className="text-sm font-bold text-[var(--md-on-surface-variant)]">vs</span>
          <div className="h-px flex-1 bg-[var(--md-outline-variant)]" />
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold" style={{ color: 'var(--md-secondary)' }}>
            Option 2
          </span>
          <input
            type="text"
            value={nameB}
            onChange={(e) => setNameB(e.target.value)}
            placeholder="e.g. Startup, Apartment B, Paris…"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && canContinue)
                onConfirm(nameA.trim(), nameB.trim())
            }}
            className="rounded-xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-high)] px-4 py-3 text-base text-[var(--md-on-surface)] placeholder-[var(--md-outline)] focus:outline-none focus:ring-2 focus:ring-[var(--md-secondary)] transition"
          />
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => onConfirm(nameA.trim(), nameB.trim())}
          disabled={!canContinue}
          className={cn(
            'flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-base font-semibold transition-all',
            canContinue
              ? 'shadow-md hover:shadow-lg'
              : 'cursor-not-allowed bg-[var(--md-surface-container-highest)] text-[var(--md-on-surface-variant)]'
          )}
          style={canContinue ? { background: 'var(--md-primary)', color: 'var(--md-on-primary)' } : undefined}
        >
          Let&apos;s go
          <ArrowRight size={18} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={onSkip}
          className="text-center text-sm text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)] transition underline-offset-2 hover:underline"
        >
          Skip — go straight to table
        </button>
      </div>
    </div>
  )
}

// ─── Step 2-N: Score a criterion ──────────────────────────────────────────────

function ScoringStep({
  criterion,
  index,
  total,
  optionAName,
  optionBName,
  onUpdateCriterion,
  onNext,
  onBack,
}: {
  criterion: Criterion
  index: number
  total: number
  optionAName: string
  optionBName: string
  onUpdateCriterion: (id: string, patch: Partial<Criterion>) => void
  onNext: () => void
  onBack: () => void
}) {
  const canNext = criterion.scoreA > 0 && criterion.scoreB > 0
  const isLast = index === total - 1

  return (
    <div className="flex flex-col gap-6">
      <WizardProgress current={index + 1} total={total} />

      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--md-on-surface-variant)] opacity-60">
          Criterion {index + 1} of {total}
        </p>
        <h2 className="text-xl font-bold leading-snug text-[var(--md-on-surface)]">
          {criterion.name}
        </h2>
        <div className="mt-2">
          <ImportanceBadge importance={criterion.importance} />
        </div>
      </div>

      <div>
        <p className="mb-4 text-sm text-[var(--md-on-surface-variant)]">
          Score each option from <strong>1</strong> (poor) to <strong>10</strong> (excellent):
        </p>
        <div className="flex flex-col gap-5">
          <ScoreRow
            label={optionAName}
            value={criterion.scoreA}
            onChange={(v) => onUpdateCriterion(criterion.id, { scoreA: v })}
            color="primary"
          />
          <ScoreRow
            label={optionBName}
            value={criterion.scoreB}
            onChange={(v) => onUpdateCriterion(criterion.id, { scoreB: v })}
            color="secondary"
          />
        </div>
      </div>

      {(criterion.scoreA > 0 || criterion.scoreB > 0) && !canNext && (
        <p className="text-xs text-amber-500">
          ⚠ Score both options to continue
        </p>
      )}

      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container-high)] px-4 py-2.5 text-sm font-medium text-[var(--md-on-surface-variant)] hover:bg-[var(--md-surface-container-highest)] transition focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)]"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className={cn(
            'flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all focus:outline-none focus:ring-2',
            canNext
              ? 'shadow-sm'
              : 'cursor-not-allowed bg-[var(--md-surface-container-highest)] text-[var(--md-on-surface-variant)]'
          )}
          style={canNext ? { background: 'var(--md-primary)', color: 'var(--md-on-primary)' } : undefined}
        >
          {isLast ? 'See results' : 'Next'}
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

// ─── Final step: Winner reveal ────────────────────────────────────────────────

function CompleteStep({
  decision,
  onViewTable,
}: {
  decision: Decision
  onViewTable: () => void
}) {
  const result = calculateResult(decision.criteria)

  const winnerName =
    result.winner === 'A'
      ? decision.optionAName
      : result.winner === 'B'
      ? decision.optionBName
      : null
  const winnerScore = result.winner === 'A' ? result.totalA : result.totalB
  const loserName =
    result.winner === 'A' ? decision.optionBName : decision.optionAName
  const loserScore = result.winner === 'A' ? result.totalB : result.totalA

  return (
    <div className="flex flex-col items-center gap-6 py-4 text-center">
      {result.winner === 'tie' ? (
        <>
          <div className="text-5xl">🤝</div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--md-on-surface)]">
              It&apos;s a tie!
            </h2>
            <p className="mt-1 text-sm text-[var(--md-on-surface-variant)]">
              {decision.optionAName} and {decision.optionBName} scored exactly the same.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="text-5xl">🏆</div>
          <div>
            <p className="text-sm font-medium text-[var(--md-on-surface-variant)]">
              The numbers say…
            </p>
            <h2 className="mt-0.5 text-3xl font-extrabold" style={{ color: 'var(--md-primary)' }}>
              {winnerName}
            </h2>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-3xl font-extrabold" style={{ color: 'var(--md-primary)' }}>
                {winnerScore}
              </span>
              <span className="text-xs text-[var(--md-on-surface-variant)]">{winnerName}</span>
            </div>
            <span className="text-base font-bold text-[var(--md-outline-variant)]">vs</span>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-3xl font-extrabold text-[var(--md-on-surface-variant)]">
                {loserScore}
              </span>
              <span className="text-xs text-[var(--md-on-surface-variant)]">{loserName}</span>
            </div>
          </div>
        </>
      )}

      <button
        type="button"
        onClick={onViewTable}
        className="mt-2 flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold shadow-md transition hover:shadow-lg focus:outline-none focus:ring-2"
        style={{ background: 'var(--md-primary)', color: 'var(--md-on-primary)' }}
      >
        See full breakdown
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </div>
  )
}

// ─── Orchestrator ─────────────────────────────────────────────────────────────

type WizardState =
  | { step: 'naming' }
  | { step: 'scoring'; index: number }
  | { step: 'complete' }

interface DecisionWizardProps {
  decision: Decision
  onUpdateOptionName: (option: 'A' | 'B', name: string) => void
  onUpdateCriterion: (criterionId: string, patch: Partial<Criterion>) => void
  onComplete: () => void
}

export function DecisionWizard({
  decision,
  onUpdateOptionName,
  onUpdateCriterion,
  onComplete,
}: DecisionWizardProps) {
  const [state, setState] = useState<WizardState>({ step: 'naming' })
  const criteria = decision.criteria

  const card = (
    <div className="mx-auto w-full max-w-lg px-4 py-8 sm:px-6">
      <div className="rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container)] p-6 shadow-sm">
        {state.step === 'naming' && (
          <NameStep
            decisionTitle={decision.title}
            defaultA={decision.optionAName}
            defaultB={decision.optionBName}
            onSkip={onComplete}
            onConfirm={(a, b) => {
              onUpdateOptionName('A', a)
              onUpdateOptionName('B', b)
              setState({ step: 'scoring', index: 0 })
            }}
          />
        )}

        {state.step === 'scoring' && (
          <ScoringStep
            criterion={criteria[state.index]}
            index={state.index}
            total={criteria.length}
            optionAName={decision.optionAName}
            optionBName={decision.optionBName}
            onUpdateCriterion={onUpdateCriterion}
            onNext={() => {
              if (state.index < criteria.length - 1) {
                setState({ step: 'scoring', index: state.index + 1 })
              } else {
                setState({ step: 'complete' })
              }
            }}
            onBack={() => {
              if (state.index === 0) {
                setState({ step: 'naming' })
              } else {
                setState({ step: 'scoring', index: state.index - 1 })
              }
            }}
          />
        )}

        {state.step === 'complete' && (
          <CompleteStep decision={decision} onViewTable={onComplete} />
        )}
      </div>
    </div>
  )

  return <div className="flex flex-1 flex-col">{card}</div>
}
