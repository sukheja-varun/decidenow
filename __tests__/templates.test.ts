import { describe, it, expect } from 'vitest'
import { getTemplate, listTemplates, getFeaturedTemplates, seedDecision } from '@/lib/templates'

describe('listTemplates', () => {
  it('returns exactly 10 templates', () => {
    expect(listTemplates()).toHaveLength(10)
  })

  it('each template has required fields', () => {
    for (const t of listTemplates()) {
      expect(t.slug).toBeTruthy()
      expect(t.name).toBeTruthy()
      expect(t.description).toBeTruthy()
      expect(t.icon).toBeTruthy()
      expect(t.metaTitle).toBeTruthy()
      expect(t.metaDescription).toBeTruthy()
      expect(Array.isArray(t.defaultCriteria)).toBe(true)
    }
  })

  it('slugs are unique', () => {
    const slugs = listTemplates().map((t) => t.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

describe('getTemplate', () => {
  it('returns correct template by slug', () => {
    const t = getTemplate('job-offer')
    expect(t?.name).toBe('Job Offer')
  })

  it('returns null for unknown slug', () => {
    expect(getTemplate('does-not-exist')).toBeNull()
  })
})

describe('getFeaturedTemplates', () => {
  it('returns exactly 6 templates', () => {
    expect(getFeaturedTemplates()).toHaveLength(6)
  })
})

describe('seedDecision', () => {
  it('creates a decision with template criteria', () => {
    const t = getTemplate('job-offer')!
    const d = seedDecision(t)
    expect(d.criteria).toHaveLength(t.defaultCriteria.length)
    expect(d.templateSlug).toBe('job-offer')
  })

  it('uses template name as decision title', () => {
    const t = getTemplate('job-offer')!
    const d = seedDecision(t)
    expect(d.title).toBe('Job Offer Decision')
  })

  it('all scores start at 0', () => {
    const t = getTemplate('job-offer')!
    const d = seedDecision(t)
    for (const c of d.criteria) {
      expect(c.scoreA).toBe(0)
      expect(c.scoreB).toBe(0)
    }
  })

  it('importance weights are copied from template', () => {
    const t = getTemplate('vacation')!
    const d = seedDecision(t)
    for (let i = 0; i < t.defaultCriteria.length; i++) {
      expect(d.criteria[i].importance).toBe(t.defaultCriteria[i].importance)
    }
  })

  it('generates unique id each call', () => {
    const t = getTemplate('blank')!
    const d1 = seedDecision(t)
    const d2 = seedDecision(t)
    expect(d1.id).not.toBe(d2.id)
  })

  it('blank template sets templateSlug to null', () => {
    const t = getTemplate('blank')!
    expect(seedDecision(t).templateSlug).toBeNull()
  })

  it('defaults option names', () => {
    const t = getTemplate('job-offer')!
    const d = seedDecision(t)
    expect(d.optionAName).toBe('Option A')
    expect(d.optionBName).toBe('Option B')
  })
})
