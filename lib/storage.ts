import type { Decision } from '@/types'

const PREFIX = 'decidenow:'

function isAvailable(): boolean {
  if (typeof window === 'undefined') return false
  try {
    localStorage.setItem('__test__', '1')
    localStorage.removeItem('__test__')
    return true
  } catch {
    return false
  }
}

export function saveDecision(decision: Decision): void {
  if (!isAvailable()) return
  localStorage.setItem(PREFIX + decision.id, JSON.stringify(decision))
}

export function loadDecision(id: string): Decision | null {
  if (!isAvailable()) return null
  const raw = localStorage.getItem(PREFIX + id)
  if (!raw) return null
  try {
    return JSON.parse(raw) as Decision
  } catch {
    return null
  }
}

export function listDecisions(): Decision[] {
  if (!isAvailable()) return []
  const decisions: Decision[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key?.startsWith(PREFIX)) continue
    const raw = localStorage.getItem(key)
    if (!raw) continue
    try {
      decisions.push(JSON.parse(raw) as Decision)
    } catch {
      // skip corrupt entries
    }
  }
  return decisions.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )
}

export function deleteDecision(id: string): void {
  if (!isAvailable()) return
  localStorage.removeItem(PREFIX + id)
}
