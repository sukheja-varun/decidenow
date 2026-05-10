import { describe, it, expect } from 'vitest'
import { calculateResult } from '@/lib/decision-engine'
import type { Criterion } from '@/types'

function makeCriterion(overrides: Partial<Criterion> = {}): Criterion {
  return { id: '1', name: 'Test', importance: 5, scoreA: 5, scoreB: 5, ...overrides }
}

describe('calculateResult', () => {
  it('returns correct totals when A wins', () => {
    const criteria: Criterion[] = [
      makeCriterion({ id: '1', importance: 10, scoreA: 10, scoreB: 3 }),
      makeCriterion({ id: '2', importance: 8, scoreA: 10, scoreB: 3 }),
    ]
    const result = calculateResult(criteria)
    expect(result.totalA).toBe(180)
    expect(result.totalB).toBe(54)
    expect(result.winner).toBe('A')
  })

  it('returns correct totals when B wins', () => {
    const criteria: Criterion[] = [
      makeCriterion({ id: '1', importance: 5, scoreA: 3, scoreB: 9 }),
    ]
    const result = calculateResult(criteria)
    expect(result.totalA).toBe(15)
    expect(result.totalB).toBe(45)
    expect(result.winner).toBe('B')
  })

  it('detects tie', () => {
    const criteria: Criterion[] = [
      makeCriterion({ id: '1', importance: 5, scoreA: 6, scoreB: 6 }),
    ]
    const result = calculateResult(criteria)
    expect(result.winner).toBe('tie')
    expect(result.totalA).toBe(result.totalB)
  })

  it('returns incomplete when any importance is 0', () => {
    const criteria: Criterion[] = [
      makeCriterion({ id: '1', importance: 0, scoreA: 5, scoreB: 5 }),
    ]
    expect(calculateResult(criteria).winner).toBe('incomplete')
  })

  it('returns incomplete when any scoreA is 0', () => {
    const criteria: Criterion[] = [
      makeCriterion({ id: '1', importance: 5, scoreA: 0, scoreB: 5 }),
    ]
    expect(calculateResult(criteria).winner).toBe('incomplete')
  })

  it('returns incomplete when any scoreB is 0', () => {
    const criteria: Criterion[] = [
      makeCriterion({ id: '1', importance: 5, scoreA: 5, scoreB: 0 }),
    ]
    expect(calculateResult(criteria).winner).toBe('incomplete')
  })

  it('returns incomplete for empty criteria', () => {
    expect(calculateResult([]).winner).toBe('incomplete')
  })

  it('handles single criterion correctly', () => {
    const criteria: Criterion[] = [
      makeCriterion({ id: '1', importance: 7, scoreA: 8, scoreB: 4 }),
    ]
    const result = calculateResult(criteria)
    expect(result.totalA).toBe(56)
    expect(result.totalB).toBe(28)
    expect(result.winner).toBe('A')
  })

  it('handles max values without overflow', () => {
    const criteria = Array.from({ length: 50 }, (_, i) =>
      makeCriterion({ id: String(i), importance: 10, scoreA: 10, scoreB: 10 })
    )
    const result = calculateResult(criteria)
    expect(result.totalA).toBe(5000)
    expect(result.totalB).toBe(5000)
    expect(result.winner).toBe('tie')
  })

  it('returns correct per-criterion breakdown', () => {
    const criteria: Criterion[] = [
      makeCriterion({ id: 'a', importance: 4, scoreA: 3, scoreB: 7 }),
      makeCriterion({ id: 'b', importance: 6, scoreA: 9, scoreB: 2 }),
    ]
    const result = calculateResult(criteria)
    expect(result.breakdown[0]).toEqual({ criterionId: 'a', weightedA: 12, weightedB: 28 })
    expect(result.breakdown[1]).toEqual({ criterionId: 'b', weightedA: 54, weightedB: 12 })
  })
})
