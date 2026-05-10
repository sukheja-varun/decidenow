'use client'

import { useState, useEffect, useCallback } from 'react'
import { listDecisions, deleteDecision } from '@/lib/storage'
import type { Decision } from '@/types'

export function useDecisions() {
  const [decisions, setDecisions] = useState<Decision[]>([])

  useEffect(() => {
    setDecisions(listDecisions())
  }, [])

  const remove = useCallback((id: string) => {
    deleteDecision(id)
    setDecisions((prev) => prev.filter((d) => d.id !== id))
  }, [])

  const refresh = useCallback(() => {
    setDecisions(listDecisions())
  }, [])

  return { decisions, remove, refresh }
}
