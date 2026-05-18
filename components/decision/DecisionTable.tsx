'use client'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2 } from 'lucide-react'
import { ScoreInput } from '@/components/decision/ScoreInput'
import { cn } from '@/lib/utils'
import type { Decision, EngineResult, Criterion } from '@/types'

interface DecisionTableProps {
  decision: Decision
  result: EngineResult
  showBreakdown: boolean
  onUpdateCriterion: (criterionId: string, patch: Partial<Criterion>) => void
  onAddCriterion: () => void
  onDeleteCriterion: (criterionId: string) => void
  onReorderCriteria: (oldIndex: number, newIndex: number) => void
  onUpdateOptionName: (option: 'A' | 'B', name: string) => void
}

interface SortableRowProps {
  criterion: Criterion
  index: number
  totalCriteria: number
  showBreakdown: boolean
  breakdownA: number
  breakdownB: number
  onUpdateCriterion: (criterionId: string, patch: Partial<Criterion>) => void
  onDeleteCriterion: (criterionId: string) => void
}

function SortableRow({
  criterion,
  index,
  totalCriteria,
  showBreakdown,
  breakdownA,
  breakdownB,
  onUpdateCriterion,
  onDeleteCriterion,
}: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: criterion.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: isDragging ? ('relative' as const) : undefined,
    zIndex: isDragging ? 10 : undefined,
  }

  const tdBase = 'px-2 sm:px-3 py-1.5 sm:py-2 border-b border-[var(--md-outline-variant)]/40'

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={cn(
        'group bg-[var(--md-surface-container)]',
        isDragging && 'shadow-lg opacity-80'
      )}
    >
      {/* Criterion name + drag handle */}
      <td
        className={cn(
          tdBase,
          'sticky left-0 z-10 bg-[var(--md-surface-container)] min-w-[110px] sm:min-w-[160px] max-w-[160px] sm:max-w-[220px]'
        )}
      >
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="cursor-grab touch-none text-[var(--md-outline)] hover:text-[var(--md-on-surface-variant)] active:cursor-grabbing focus:outline-none"
            aria-label={`Drag to reorder ${criterion.name}`}
            tabIndex={-1}
          >
            <GripVertical size={15} aria-hidden="true" />
          </button>
          <input
            type="text"
            value={criterion.name}
            onChange={(e) =>
              onUpdateCriterion(criterion.id, { name: e.target.value })
            }
            className="min-w-0 flex-1 rounded border-0 bg-transparent px-1 py-0.5 text-sm text-[var(--md-on-surface)] focus:outline-none focus:ring-1 focus:ring-[var(--md-primary)]"
            aria-label={`Criterion ${index + 1} name`}
          />
        </div>
      </td>

      {/* Importance */}
      <td className={cn(tdBase, 'text-center')}>
        <ScoreInput
          value={criterion.importance}
          onChange={(v) => onUpdateCriterion(criterion.id, { importance: v })}
          aria-label={`Importance for ${criterion.name}`}
        />
      </td>

      {/* Score A */}
      <td className={cn(tdBase, 'text-center')}>
        <ScoreInput
          value={criterion.scoreA}
          onChange={(v) => onUpdateCriterion(criterion.id, { scoreA: v })}
          aria-label={`Score A for ${criterion.name}`}
        />
      </td>

      {/* Score B */}
      <td className={cn(tdBase, 'text-center')}>
        <ScoreInput
          value={criterion.scoreB}
          onChange={(v) => onUpdateCriterion(criterion.id, { scoreB: v })}
          aria-label={`Score B for ${criterion.name}`}
        />
      </td>

      {/* Breakdown columns */}
      {showBreakdown && (
        <>
          <td className={cn(tdBase, 'text-center text-sm text-[var(--md-primary)] tabular-nums font-medium')}>
            {breakdownA}
          </td>
          <td className={cn(tdBase, 'text-center text-sm text-[var(--md-secondary)] tabular-nums font-medium')}>
            {breakdownB}
          </td>
        </>
      )}

      {/* Delete action */}
      <td className={cn(tdBase, 'text-center')}>
        {totalCriteria > 1 && (
          <button
            type="button"
            onClick={() => onDeleteCriterion(criterion.id)}
            aria-label={`Delete criterion: ${criterion.name}`}
            className={cn(
              'rounded p-1 text-[var(--md-outline)]',
              'opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100',
              'hover:text-red-500 hover:bg-red-500/10',
              'transition-all focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-red-400'
            )}
          >
            <Trash2 size={14} aria-hidden="true" />
          </button>
        )}
      </td>
    </tr>
  )
}

export function DecisionTable({
  decision,
  result,
  showBreakdown,
  onUpdateCriterion,
  onAddCriterion,
  onDeleteCriterion,
  onReorderCriteria,
  onUpdateOptionName,
}: DecisionTableProps) {
  const { criteria, optionAName, optionBName } = decision
  const { totalA, totalB, breakdown } = result

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = criteria.findIndex((c) => c.id === active.id)
    const newIndex = criteria.findIndex((c) => c.id === over.id)

    if (oldIndex !== -1 && newIndex !== -1) {
      onReorderCriteria(oldIndex, newIndex)
    }
  }

  const thClass =
    'text-left px-2 sm:px-3 py-2 text-sm font-medium text-[var(--md-on-surface-variant)] bg-[var(--md-surface-container-high)]'

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-3">
        <div className="overflow-x-auto rounded-2xl border border-[var(--md-outline-variant)] shadow-sm">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className={cn(thClass, 'sticky left-0 z-10 bg-[var(--md-surface-container-high)] min-w-[110px] sm:min-w-[160px]')}>
                  Criterion
                </th>
                <th className={cn(thClass, 'text-center')}>
                  <span className="block">Weight</span>
                  <span className="block text-xs font-normal text-[var(--md-on-surface-variant)] opacity-60 normal-case tracking-normal">how much it matters</span>
                </th>
                {/* Option A name — editable */}
                <th className={cn(thClass, 'text-center min-w-[80px] sm:min-w-[130px]')}>
                  <input
                    type="text"
                    value={optionAName}
                    onChange={(e) => onUpdateOptionName('A', e.target.value)}
                    className="w-full min-w-[56px] sm:min-w-[80px] rounded border-0 bg-transparent text-center text-sm font-semibold text-[var(--md-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--md-primary)]"
                    aria-label="Option A name"
                    placeholder="Option A"
                  />
                  <span className="block text-xs font-normal text-[var(--md-on-surface-variant)] opacity-60 normal-case tracking-normal">score 1–10</span>
                </th>
                {/* Option B name — editable */}
                <th className={cn(thClass, 'text-center min-w-[80px] sm:min-w-[130px]')}>
                  <input
                    type="text"
                    value={optionBName}
                    onChange={(e) => onUpdateOptionName('B', e.target.value)}
                    className="w-full min-w-[56px] sm:min-w-[80px] rounded border-0 bg-transparent text-center text-sm font-semibold text-[var(--md-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--md-primary)]"
                    aria-label="Option B name"
                    placeholder="Option B"
                  />
                  <span className="block text-xs font-normal text-[var(--md-on-surface-variant)] opacity-60 normal-case tracking-normal">score 1–10</span>
                </th>
                {showBreakdown && (
                  <>
                    <th className={cn(thClass, 'text-center')}>
                      Weighted {optionAName}
                    </th>
                    <th className={cn(thClass, 'text-center')}>
                      Weighted {optionBName}
                    </th>
                  </>
                )}
                {/* Actions column */}
                <th className={cn(thClass, 'w-8 sm:w-10')} aria-label="Actions" />
              </tr>
            </thead>

            <SortableContext
              items={criteria.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <tbody>
                {criteria.map((criterion, index) => {
                  const bd = breakdown.find((b) => b.criterionId === criterion.id)
                  return (
                    <SortableRow
                      key={criterion.id}
                      criterion={criterion}
                      index={index}
                      totalCriteria={criteria.length}
                      showBreakdown={showBreakdown}
                      breakdownA={bd?.weightedA ?? 0}
                      breakdownB={bd?.weightedB ?? 0}
                      onUpdateCriterion={onUpdateCriterion}
                      onDeleteCriterion={onDeleteCriterion}
                    />
                  )
                })}
              </tbody>
            </SortableContext>

            {/* Totals footer */}
            <tfoot>
              <tr className="bg-[var(--md-surface-container-high)] font-semibold">
                <td className="sticky left-0 z-10 bg-[var(--md-surface-container-high)] px-2 sm:px-3 py-2 text-sm text-[var(--md-on-surface)]">
                  Total
                </td>
                <td className="px-2 sm:px-3 py-2" />
                <td className="px-2 sm:px-3 py-2 text-center text-sm tabular-nums text-[var(--md-primary)] font-bold">
                  {totalA}
                </td>
                <td className="px-2 sm:px-3 py-2 text-center text-sm tabular-nums text-[var(--md-secondary)] font-bold">
                  {totalB}
                </td>
                {showBreakdown && (
                  <>
                    <td className="px-2 sm:px-3 py-2 text-center text-sm tabular-nums text-[var(--md-primary)] font-bold">
                      {totalA}
                    </td>
                    <td className="px-2 sm:px-3 py-2 text-center text-sm tabular-nums text-[var(--md-secondary)] font-bold">
                      {totalB}
                    </td>
                  </>
                )}
                <td className="px-2 sm:px-3 py-2" />
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Add criterion */}
        <button
          type="button"
          onClick={onAddCriterion}
          className={cn(
            'self-start rounded-xl border border-dashed border-[var(--md-outline-variant)]',
            'px-4 py-2 text-sm font-medium text-[var(--md-on-surface-variant)]',
            'hover:border-[var(--md-primary)] hover:text-[var(--md-primary)] hover:bg-[var(--md-primary-container)]/20',
            'transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)]'
          )}
        >
          + Add criterion
        </button>
      </div>
    </DndContext>
  )
}
