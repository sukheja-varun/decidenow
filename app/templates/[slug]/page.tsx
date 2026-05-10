import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTemplate, listTemplates } from '@/lib/templates'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const templates = listTemplates()
  return templates.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const template = getTemplate(slug)
  if (!template) return {}
  return {
    title: template.metaTitle,
    description: template.metaDescription,
  }
}

export default async function TemplatePage({ params }: PageProps) {
  const { slug } = await params
  const template = getTemplate(slug)

  if (!template) {
    notFound()
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/templates" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Templates
        </Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300">{template.name}</span>
      </nav>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {template.name}
          </h1>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
            {template.description}
          </p>
        </div>

        {/* Default criteria */}
        {template.defaultCriteria.length > 0 ? (
          <div>
            <h2 className="mb-3 text-base font-semibold text-gray-900 dark:text-gray-100">
              Default criteria ({template.defaultCriteria.length})
            </h2>
            <ul className="divide-y divide-gray-100 dark:divide-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
              {template.defaultCriteria.map((criterion) => (
                <li
                  key={criterion.name}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    {criterion.name}
                  </span>
                  <span className="ml-4 shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/40 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                    Importance: {criterion.importance}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-600 p-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This template starts blank — add your own criteria after creating a decision.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center gap-3 pt-2">
          <Link
            href={`/decide/new?template=${template.slug}`}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
          >
            Use this template
          </Link>
          <Link
            href="/templates"
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            ← Back to templates
          </Link>
        </div>
      </div>
    </div>
  )
}
