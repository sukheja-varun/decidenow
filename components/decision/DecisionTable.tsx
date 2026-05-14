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

  const tdBase = 'px-3 py-2 border-b border-gray-100 dark:border-gray-800'

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={cn(
        'group bg-white dark:bg-gray-900',
        isDragging && 'shadow-lg'
      )}
    >
      {/* Criterion name + drag handle */}
      <td
        className={cn(
          tdBase,
          'sticky left-0 z-10 bg-white dark:bg-gray-900 min-w-[160px] max-w-[220px]'
        )}
      >
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="cursor-grab touch-none text-gray-300 hover:text-gray-500 dark:text-gray-700 dark:hover:text-gray-400 active:cursor-grabbing focus:outline-none focus:text-gray-500"
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
            className="min-w-0 flex-1 rounded border-0 bg-transparent px-1 py-0.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-400 dark:focus:ring-indigo-500 rounded"
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
          <td className={cn(tdBase, 'text-center text-sm text-gray-600 dark:text-gray-300 tabular-nums')}>
            {breakdownA}
          </td>
          <td className={cn(tdBase, 'text-center text-sm text-gray-600 dark:text-gray-300 tabular-nums')}>
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
              'rounded p-1 text-gray-300 dark:text-gray-700',
              'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100',
              'hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30',
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
    'text-left px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 whitespace-nowrap'

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className={cn(thClass, 'sticky left-0 z-10 bg-gray-50 dark:bg-gray-800 min-w-[160px]')}>
                Criterion
              </th>
              <th className={cn(thClass, 'text-center')}>
                <div>Weight</div>
                <div className="text-xs font-normal text-gray-400 dark:text-gray-500 normal-case tracking-normal">how much it matters</div>
              </th>
              {/* Option A name — editable */}
              <th className={cn(thClass, 'text-center min-w-[130px]')}>
                <input
                  type="text"
                  value={optionAName}
                  onChange={(e) => onUpdateOptionName('A', e.target.value)}
                  className="w-full min-w-[80px] rounded border-0 bg-transparent text-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 dark:focus:ring-indigo-500"
                  aria-label="Option A name"
                  placeholder="Option A"
                />
                <div className="text-xs font-normal text-gray-400 dark:text-gray-500 normal-case tracking-normal">score 1–10</div>
              </th>
              {/* Option B name — editable */}
              <th className={cn(thClass, 'text-center min-w-[130px]')}>
                <input
                  type="text"
                  value={optionBName}
                  onChange={(e) => onUpdateOptionName('B', e.target.value)}
                  className="w-full min-w-[80px] rounded border-0 bg-transparent text-center text-sm font-semibold text-violet-600 dark:text-violet-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 dark:focus:ring-indigo-500"
                  aria-label="Option B name"
                  placeholder="Option B"
                />
                <div className="text-xs font-normal text-gray-400 dark:text-gray-500 normal-case tracking-normal">score 1–10</div>
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
              <th className={cn(thClass, 'w-10')} aria-label="Actions" />
            </tr>
          </thead>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
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
          </DndContext>

          {/* Totals footer */}
          <tfoot>
            <tr className="bg-gray-50 dark:bg-gray-800 font-semibold">
              <td className="sticky left-0 z-10 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                Total
              </td>
              {/* Importance col */}
              <td className="px-3 py-2" />
              {/* Total A */}
              <td className="px-3 py-2 text-center text-sm tabular-nums text-indigo-600 dark:text-indigo-400">
                {totalA}
              </td>
              {/* Total B */}
              <td className="px-3 py-2 text-center text-sm tabular-nums text-indigo-600 dark:text-indigo-400">
                {totalB}
              </td>
              {showBreakdown && (
                <>
                  <td className="px-3 py-2 text-center text-sm tabular-nums text-indigo-600 dark:text-indigo-400">
                    {totalA}
                  </td>
                  <td className="px-3 py-2 text-center text-sm tabular-nums text-indigo-600 dark:text-indigo-400">
                    {totalB}
                  </td>
                </>
              )}
              <td className="px-3 py-2" />
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Add criterion */}
      <button
        type="button"
        onClick={onAddCriterion}
        className={cn(
          'self-start rounded-lg border border-dashed border-gray-300 dark:border-gray-600',
          'px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400',
          'hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400',
          'transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
        )}
      >
        + Add criterion
      </button>
    </div>
  )
}
