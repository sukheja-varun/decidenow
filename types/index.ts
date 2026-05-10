export type Decision = {
  id: string
  title: string
  optionAName: string
  optionBName: string
  templateSlug: string | null
  criteria: Criterion[]
  createdAt: string
  updatedAt: string
}

export type Criterion = {
  id: string
  name: string
  importance: number
  scoreA: number
  scoreB: number
}

export type EngineResult = {
  totalA: number
  totalB: number
  winner: 'A' | 'B' | 'tie' | 'incomplete'
  breakdown: CriterionBreakdown[]
}

export type CriterionBreakdown = {
  criterionId: string
  weightedA: number
  weightedB: number
}

export type Template = {
  slug: string
  name: string
  description: string
  icon: string
  metaTitle: string
  metaDescription: string
  defaultCriteria: Omit<Criterion, 'id' | 'scoreA' | 'scoreB'>[]
}
