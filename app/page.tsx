import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { getFeaturedTemplates, listTemplates } from '@/lib/templates'
import { TemplateSection } from '@/components/home/TemplateSection'
import { SavedDecisionsList } from '@/components/home/SavedDecisionsList'

export default function HomePage() {
  const featured = getFeaturedTemplates()
  const all = listTemplates()

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 space-y-12">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Stop overthinking.{' '}
          <span className="text-indigo-600 dark:text-indigo-400">Start deciding.</span>
        </h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Pick a template or start fresh. Score your options, see a winner instantly.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/decide/new"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
          >
            <PlusCircle size={16} aria-hidden="true" />
            New Decision
          </Link>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
          >
            Browse templates
          </Link>
        </div>
      </section>

      {/* Template discovery */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Start with a template
          </h2>
          <Link
            href="/templates"
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            See all
          </Link>
        </div>
        <TemplateSection templates={all} />
      </section>

      {/* Saved decisions */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Your decisions
          </h2>
          <Link
            href="/decide/new"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <PlusCircle size={14} aria-hidden="true" />
            New Decision
          </Link>
        </div>
        <SavedDecisionsList />
      </section>
    </div>
  )
}
