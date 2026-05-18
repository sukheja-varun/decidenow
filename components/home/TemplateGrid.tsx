'use client'

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
import { cn } from '@/lib/utils'
import type { Template } from '@/types'

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

// Cycle through a set of complementary icon container colors
const ICON_BG_COLORS = [
  'bg-indigo-500/20 text-indigo-400 dark:bg-indigo-400/10 dark:text-indigo-400',
  'bg-violet-500/20 text-violet-400 dark:bg-violet-400/10 dark:text-violet-400',
  'bg-emerald-500/20 text-emerald-500 dark:bg-emerald-400/10 dark:text-emerald-400',
  'bg-amber-500/20 text-amber-500 dark:bg-amber-400/10 dark:text-amber-400',
  'bg-rose-500/20 text-rose-400 dark:bg-rose-400/10 dark:text-rose-400',
  'bg-sky-500/20 text-sky-400 dark:bg-sky-400/10 dark:text-sky-400',
]

interface TemplateGridProps {
  templates: Template[]
  showAll: boolean
  onToggle: () => void
  onSelect: (slug: string) => void
  className?: string
}

export function TemplateGrid({
  templates,
  showAll,
  onToggle,
  onSelect,
  className,
}: TemplateGridProps) {
  const displayed = showAll ? templates : templates.slice(0, 6)
  const total = templates.length

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <ul
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
        role="list"
      >
        {displayed.map((template, i) => {
          const Icon = ICON_MAP[template.icon]
          const colorCls = ICON_BG_COLORS[i % ICON_BG_COLORS.length]
          return (
            <li key={template.slug}>
              <button
                type="button"
                onClick={() => onSelect(template.slug)}
                className={cn(
                  'flex h-full w-full flex-col items-center gap-3 rounded-2xl border p-4 text-center transition-all',
                  'border-[var(--md-outline-variant)] bg-[var(--md-surface-container)]',
                  'hover:shadow-md hover:border-[var(--md-primary)]/50 hover:bg-[var(--md-surface-container-high)]',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)] focus:ring-offset-2'
                )}
              >
                {/* Circular icon container */}
                <span className={cn('flex h-12 w-12 items-center justify-center rounded-full', colorCls)}>
                  {Icon ? (
                    <Icon size={22} aria-hidden="true" />
                  ) : (
                    <span className="text-xs font-mono">{template.icon}</span>
                  )}
                </span>
                <span className="text-xs font-semibold leading-snug text-[var(--md-on-surface)] line-clamp-2">
                  {template.name}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {total > 6 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              'rounded-xl px-5 py-2 text-sm font-medium transition-colors',
              'text-[var(--md-primary)] hover:bg-[var(--md-primary-container)]/30',
              'focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)]'
            )}
          >
            {showAll ? 'Show less' : `See all ${total}`}
          </button>
        </div>
      )}
    </div>
  )
}
