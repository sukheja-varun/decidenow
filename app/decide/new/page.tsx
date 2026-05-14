'use client'

import { useEffect, useRef, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { nanoid } from 'nanoid'
import { seedDecision, getTemplate } from '@/lib/templates'
import { saveDecision } from '@/lib/storage'
import type { Decision } from '@/types'

function NewDecisionRedirector() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const didRun = useRef(false)

  useEffect(() => {
    if (didRun.current) return
    didRun.current = true

    const templateSlug = searchParams.get('template')

    let decision: Decision

    if (templateSlug) {
      const template = getTemplate(templateSlug)
      if (template) {
        decision = seedDecision(template)
      } else {
        // Unknown template slug — fall back to blank
        const now = new Date().toISOString()
        decision = {
          id: nanoid(10),
          title: 'My Decision',
          optionAName: 'Option A',
          optionBName: 'Option B',
          templateSlug: null,
          criteria: [],
          createdAt: now,
          updatedAt: now,
        }
      }
    } else {
      const now = new Date().toISOString()
      decision = {
        id: nanoid(10),
        title: 'My Decision',
        optionAName: 'Option A',
        optionBName: 'Option B',
        templateSlug: null,
        criteria: [],
        createdAt: now,
        updatedAt: now,
      }
    }

    saveDecision(decision)
    router.replace(`/decide/${decision.id}`)
  }, [router, searchParams])

  return (
    <div
      className="flex flex-1 items-center justify-center"
      aria-label="Creating your decision…"
      role="status"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <svg
          className="h-10 w-10 animate-spin text-indigo-600 dark:text-indigo-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Setting up your decision…
        </p>
      </div>
    </div>
  )
}

export default function NewDecisionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        </div>
      }
    >
      <NewDecisionRedirector />
    </Suspense>
  )
}
