import { describe, it, expect, beforeEach, vi } from 'vitest'
import { saveDecision, loadDecision, listDecisions, deleteDecision } from '@/lib/storage'
import type { Decision } from '@/types'

function makeDecision(overrides: Partial<Decision> = {}): Decision {
  return {
    id: 'test-id',
    title: 'Test Decision',
    optionAName: 'Option A',
    optionBName: 'Option B',
    templateSlug: null,
    criteria: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  }
}

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: vi.fn((key: string) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
    get length() { return Object.keys(store).length },
    key: vi.fn((i: number) => Object.keys(store)[i] ?? null),
  }
})()

vi.stubGlobal('localStorage', localStorageMock)
vi.stubGlobal('window', { localStorage: localStorageMock })

beforeEach(() => {
  localStorageMock.clear()
  vi.clearAllMocks()
})

describe('saveDecision / loadDecision round-trip', () => {
  it('persists and restores all fields', () => {
    const d = makeDecision({ id: 'abc123', title: 'My House' })
    saveDecision(d)
    const loaded = loadDecision('abc123')
    expect(loaded).toEqual(d)
  })

  it('overwrites existing decision with same id', () => {
    const d = makeDecision({ id: 'x1', title: 'Old' })
    saveDecision(d)
    saveDecision({ ...d, title: 'New' })
    expect(loadDecision('x1')?.title).toBe('New')
  })
})

describe('loadDecision', () => {
  it('returns null for unknown id', () => {
    expect(loadDecision('nonexistent')).toBeNull()
  })
})

describe('listDecisions', () => {
  it('returns empty array when nothing saved', () => {
    expect(listDecisions()).toEqual([])
  })

  it('returns decisions sorted by updatedAt descending', () => {
    const older = makeDecision({ id: 'old', updatedAt: '2024-01-01T00:00:00Z' })
    const newer = makeDecision({ id: 'new', updatedAt: '2024-06-01T00:00:00Z' })
    saveDecision(older)
    saveDecision(newer)
    const list = listDecisions()
    expect(list[0].id).toBe('new')
    expect(list[1].id).toBe('old')
  })

  it('ignores non-decidenow localStorage keys', () => {
    localStorageMock.setItem('other:key', 'value')
    const d = makeDecision({ id: 'z1' })
    saveDecision(d)
    expect(listDecisions()).toHaveLength(1)
  })
})

describe('deleteDecision', () => {
  it('removes exactly one item', () => {
    saveDecision(makeDecision({ id: 'a' }))
    saveDecision(makeDecision({ id: 'b' }))
    deleteDecision('a')
    expect(loadDecision('a')).toBeNull()
    expect(loadDecision('b')).not.toBeNull()
  })

  it('does not throw for unknown id', () => {
    expect(() => deleteDecision('ghost')).not.toThrow()
  })
})
