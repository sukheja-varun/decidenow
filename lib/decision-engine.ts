import type { Criterion, EngineResult } from '@/types'

export function calculateResult(criteria: Criterion[]): EngineResult {
  const breakdown = criteria.map((c) => ({
    criterionId: c.id,
    weightedA: c.importance * c.scoreA,
    weightedB: c.importance * c.scoreB,
  }))

  const totalA = breakdown.reduce((sum, b) => sum + b.weightedA, 0)
  const totalB = breakdown.reduce((sum, b) => sum + b.weightedB, 0)

  const hasZero = criteria.some(
    (c) => c.importance === 0 || c.scoreA === 0 || c.scoreB === 0
  )

  let winner: EngineResult['winner']
  if (criteria.length === 0 || hasZero) {
    winner = 'incomplete'
  } else if (totalA === totalB) {
    winner = 'tie'
  } else {
    winner = totalA > totalB ? 'A' : 'B'
  }

  return { totalA, totalB, winner, breakdown }
}
