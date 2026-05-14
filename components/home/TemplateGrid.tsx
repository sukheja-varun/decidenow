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
}

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
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
        role="list"
      >
        {displayed.map((template) => {
          const Icon = ICON_MAP[template.icon]
          return (
            <li key={template.slug}>
              <button
                type="button"
                onClick={() => onSelect(template.slug)}
                className={cn(
                  'flex h-full w-full flex-col items-start gap-2 rounded-xl border border-gray-200 dark:border-gray-700',
                  'bg-white dark:bg-gray-800 p-4 text-left transition-all',
                  'hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20',
                  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
                )}
              >
                <span className="text-indigo-600 dark:text-indigo-400">
                  {Icon ? (
                    <Icon size={20} aria-hidden="true" />
                  ) : (
                    <span className="rounded bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 text-xs font-mono text-gray-500 dark:text-gray-400">
                      {template.icon}
                    </span>
                  )}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {template.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {template.description}
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
              'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              'text-indigo-600 dark:text-indigo-400',
              'hover:bg-indigo-50 dark:hover:bg-indigo-900/30',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
            )}
          >
            {showAll ? 'Show less' : `See all ${total}`}
          </button>
        </div>
      )}
    </div>
  )
}
