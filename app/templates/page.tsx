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
  MapPin,
  Globe,
  Rocket,
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
  MapPin,
  Globe,
  Rocket,
}

const ICON_BG_COLORS = [
  'bg-indigo-500/20 text-indigo-400',
  'bg-violet-500/20 text-violet-400',
  'bg-emerald-500/20 text-emerald-500',
  'bg-amber-500/20 text-amber-500',
  'bg-rose-500/20 text-rose-400',
  'bg-sky-500/20 text-sky-400',
]

function TemplateCard({ template, index }: { template: Template; index: number }) {
  const Icon = ICON_MAP[template.icon] ?? PlusCircle
  const colorCls = ICON_BG_COLORS[index % ICON_BG_COLORS.length]
  return (
    <Link
      href={`/templates/${template.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container)] p-5 transition-all hover:shadow-md hover:border-[var(--md-primary)]/50 hover:bg-[var(--md-surface-container-high)] focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)]"
    >
      <span className={`flex h-12 w-12 items-center justify-center rounded-full ${colorCls}`}>
        <Icon size={22} aria-hidden="true" />
      </span>
      <div>
        <h2 className="text-base font-semibold text-[var(--md-on-surface)] transition-colors">
          {template.name}
        </h2>
        <p className="mt-1 text-sm text-[var(--md-on-surface-variant)] line-clamp-2 leading-relaxed">
          {template.description}
        </p>
      </div>
      <div className="mt-auto flex items-center gap-1 text-xs font-medium text-[var(--md-primary)]">
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
        <h1 className="text-3xl font-bold tracking-tight text-[var(--md-on-surface)]">
          All Templates
        </h1>
        <p className="mt-2 text-base text-[var(--md-on-surface-variant)]">
          Choose a template to get started with pre-built criteria, or start blank.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, i) => (
          <TemplateCard key={template.slug} template={template} index={i} />
        ))}
      </div>
    </div>
  )
}
