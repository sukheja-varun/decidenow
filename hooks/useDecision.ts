'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { nanoid } from 'nanoid'
import { loadDecision, saveDecision } from '@/lib/storage'
import { calculateResult } from '@/lib/decision-engine'
import { getTemplate } from '@/lib/templates'
import type { Decision, Criterion, EngineResult } from '@/types'

export function useDecision(id: string) {
  const [decision, setDecision] = useState<Decision | null>(null)
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const d = loadDecision(id)
    setDecision(d)
  }, [id])

  const persist = useCallback((d: Decision) => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => saveDecision(d), 500)
  }, [])

  const update = useCallback(
    (updater: (prev: Decision) => Decision) => {
      setDecision((prev) => {
        if (!prev) return prev
        const next = updater({ ...prev, updatedAt: new Date().toISOString() })
        persist(next)
        return next
      })
    },
    [persist]
  )

  const updateTitle = useCallback(
    (title: string) => update((d) => ({ ...d, title })),
    [update]
  )

  const updateOptionName = useCallback(
    (option: 'A' | 'B', name: string) =>
      update((d) => ({
        ...d,
        optionAName: option === 'A' ? name : d.optionAName,
        optionBName: option === 'B' ? name : d.optionBName,
      })),
    [update]
  )

  const updateCriterion = useCallback(
    (criterionId: string, patch: Partial<Criterion>) =>
      update((d) => ({
        ...d,
        criteria: d.criteria.map((c) =>
          c.id === criterionId ? { ...c, ...patch } : c
        ),
      })),
    [update]
  )

  const addCriterion = useCallback(
    () =>
      update((d) => ({
        ...d,
        criteria: [
          ...d.criteria,
          { id: nanoid(10), name: 'New criterion', importance: 5, scoreA: 0, scoreB: 0 },
        ],
      })),
    [update]
  )

  const deleteCriterion = useCallback(
    (criterionId: string) =>
      update((d) => ({
        ...d,
        criteria: d.criteria.filter((c) => c.id !== criterionId),
      })),
    [update]
  )

  const reorderCriteria = useCallback(
    (oldIndex: number, newIndex: number) =>
      update((d) => {
        const criteria = [...d.criteria]
        const [moved] = criteria.splice(oldIndex, 1)
        criteria.splice(newIndex, 0, moved)
        return { ...d, criteria }
      }),
    [update]
  )

  const resetToTemplate = useCallback(() => {
    if (!decision?.templateSlug) return
    const template = getTemplate(decision.templateSlug)
    if (!template) return
    update((d) => ({
      ...d,
      criteria: template.defaultCriteria.map((c) => ({
        ...c,
        id: nanoid(10),
        scoreA: 0,
        scoreB: 0,
      })),
    }))
  }, [decision?.templateSlug, update])

  const result: EngineResult = decision
    ? calculateResult(decision.criteria)
    : { totalA: 0, totalB: 0, winner: 'incomplete', breakdown: [] }

  return {
    decision,
    result,
    updateTitle,
    updateOptionName,
    updateCriterion,
    addCriterion,
    deleteCriterion,
    reorderCriteria,
    resetToTemplate,
  }
}
