import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { listTemplates } from '@/lib/templates'
import { TemplateSection } from '@/components/home/TemplateSection'
import { SavedDecisionsList } from '@/components/home/SavedDecisionsList'

export default function HomePage() {
  const all = listTemplates()

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 space-y-16">

      {/* ── Hero ── */}
      <section className="text-center space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950 px-4 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400">
          ⚖️ Weighted decision making, made simple
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl leading-tight">
          Stop overthinking.<br />
          <span className="text-indigo-600 dark:text-indigo-400">Start deciding.</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          Score two options across what matters most to you. Get a clear winner in seconds.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/decide/new"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <PlusCircle size={16} aria-hidden="true" />
            Start a decision
          </Link>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">How it works</h2>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Three steps. No spreadsheets.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 space-y-2">
            <div className="text-2xl">📋</div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">1. Pick your criteria</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              List the things that matter — salary, culture, location. Give each one a weight from 1–10.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 space-y-2">
            <div className="text-2xl">🎯</div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">2. Score each option</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Rate Option A and Option B on each criterion from 1–10. Go with your gut.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 space-y-2">
            <div className="text-2xl">🏆</div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">3. See your winner</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              The app multiplies weight × score for every criterion and totals them up. The higher score wins.
            </p>
          </div>
        </div>

        {/* Interactive example */}
        <div className="rounded-2xl border border-indigo-100 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950/50 p-5 space-y-3">
          <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
            Example — Choosing between two job offers
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  <th className="text-left pb-2 pr-4 font-medium">Criterion</th>
                  <th className="text-center pb-2 px-3 font-medium">Weight</th>
                  <th className="text-center pb-2 px-3 font-medium text-indigo-600 dark:text-indigo-400">Google</th>
                  <th className="text-center pb-2 px-3 font-medium text-violet-600 dark:text-violet-400">Startup</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-100 dark:divide-indigo-900">
                {[
                  { name: 'Salary', weight: 10, a: 8, b: 6 },
                  { name: 'Work-life balance', weight: 9, a: 7, b: 5 },
                  { name: 'Growth potential', weight: 8, a: 6, b: 10 },
                  { name: 'Company culture', weight: 7, a: 8, b: 9 },
                ].map((row) => (
                  <tr key={row.name}>
                    <td className="py-1.5 pr-4 text-gray-700 dark:text-gray-300">{row.name}</td>
                    <td className="py-1.5 px-3 text-center text-gray-500 dark:text-gray-400">{row.weight}</td>
                    <td className="py-1.5 px-3 text-center font-medium text-indigo-600 dark:text-indigo-400">{row.a}</td>
                    <td className="py-1.5 px-3 text-center font-medium text-violet-600 dark:text-violet-400">{row.b}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-indigo-200 dark:border-indigo-800">
                  <td className="pt-2 pr-4 font-bold text-gray-900 dark:text-gray-100">Total score</td>
                  <td />
                  <td className="pt-2 px-3 text-center font-bold text-indigo-600 dark:text-indigo-400">253</td>
                  <td className="pt-2 px-3 text-center font-bold text-violet-600 dark:text-violet-400">210</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">
            🏆 Google wins — despite the startup having better growth potential, salary and balance swung it.
          </p>
        </div>
      </section>

      {/* ── Templates ── */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Pick a template</h2>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Pre-filled criteria for common tough decisions. Edit anything.</p>
        </div>
        <TemplateSection templates={all} />
      </section>

      {/* ── Saved decisions ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Your decisions</h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Pick up where you left off.</p>
          </div>
          <Link
            href="/decide/new"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <PlusCircle size={14} aria-hidden="true" />
            New
          </Link>
        </div>
        <SavedDecisionsList />
      </section>
    </div>
  )
}
