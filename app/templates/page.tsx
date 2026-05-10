import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Home,
  Briefcase,
  Car,
  Laptop,
  Heart,
  Shirt,
  UtensilsCrossed,
  Plane,
  GraduationCap,
  PlusCircle,
  type LucideIcon,
} from 'lucide-react'
import { listTemplates } from '@/lib/templates'
import type { Template } from '@/types'

export const metadata: Metadata = {
  title: 'Templates',
  description: 'Browse all decision templates',
}

const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  Briefcase,
  Car,
  Laptop,
  Heart,
  Shirt,
  UtensilsCrossed,
  Plane,
  GraduationCap,
  PlusCircle,
}

function TemplateCard({ template }: { template: Template }) {
  const Icon = ICON_MAP[template.icon] ?? PlusCircle
  return (
    <Link
      href={`/templates/${template.slug}`}
      className="group flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 transition-all hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
    >
      <span className="text-indigo-600 dark:text-indigo-400">
        <Icon size={24} aria-hidden="true" />
      </span>
      <div>
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {template.name}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {template.description}
        </p>
      </div>
      <div className="mt-auto flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
        {template.defaultCriteria.length > 0
          ? `${template.defaultCriteria.length} criteria`
          : 'Custom criteria'}
      </div>
    </Link>
  )
}

export default function TemplatesPage() {
  const templates = listTemplates()

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          All Templates
        </h1>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
          Choose a template to get started with pre-built criteria, or start blank.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <TemplateCard key={template.slug} template={template} />
        ))}
      </div>
    </div>
  )
}
