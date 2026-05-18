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
        <p className="py-8 text-center text-sm text-[var(--md-on-surface-variant)]">
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
                    'flex w-full items-start gap-3 rounded-xl border border-[var(--md-outline-variant)]',
                    'bg-[var(--md-surface-container)] p-3 text-left transition-colors',
                    'hover:border-[var(--md-primary)]/50 hover:bg-[var(--md-surface-container-high)]',
                    'focus:outline-none focus:ring-2 focus:ring-[var(--md-primary)]'
                  )}
                >
                  <span className="mt-0.5 flex-shrink-0 text-[var(--md-primary)]">
                    {Icon ? (
                      <Icon size={18} aria-hidden="true" />
                    ) : (
                      <span className="rounded bg-[var(--md-surface-container-highest)] px-1.5 py-0.5 text-xs font-mono text-[var(--md-on-surface-variant)]">
                        {template.icon}
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-[var(--md-on-surface)]">
                      {template.name}
                    </span>
                    <span className="block text-xs text-[var(--md-on-surface-variant)] line-clamp-2">
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
