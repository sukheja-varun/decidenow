'use client'

import { useState } from 'react'
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
import { Input } from '@/components/ui/Input'
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

interface TemplateSearchProps {
  templates: Template[]
  onSelect: (slug: string) => void
  className?: string
}

export function TemplateSearch({ templates, onSelect, className }: TemplateSearchProps) {
  const [query, setQuery] = useState('')

  const normalized = query.trim().toLowerCase()

  const filtered = normalized
    ? templates.filter(
        (t) =>
          t.name.toLowerCase().includes(normalized) ||
          t.description.toLowerCase().includes(normalized)
      )
    : templates

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search templates…"
        aria-label="Search templates"
      />

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
          No templates found for &lsquo;{query}&rsquo;
        </p>
      ) : (
        <ul className="flex flex-col gap-2" role="list">
          {filtered.map((template) => {
            const Icon = ICON_MAP[template.icon]
            return (
              <li key={template.slug}>
                <button
                  type="button"
                  onClick={() => onSelect(template.slug)}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-xl border border-gray-200 dark:border-gray-700',
                    'bg-white dark:bg-gray-800 p-3 text-left transition-colors',
                    'hover:border-indigo-300 hover:bg-indigo-50 dark:hover:border-indigo-600 dark:hover:bg-indigo-900/20',
                    'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900'
                  )}
                >
                  <span className="mt-0.5 flex-shrink-0 text-indigo-600 dark:text-indigo-400">
                    {Icon ? (
                      <Icon size={18} aria-hidden="true" />
                    ) : (
                      <span className="rounded bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 text-xs font-mono text-gray-500 dark:text-gray-400">
                        {template.icon}
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {template.name}
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {template.description}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
