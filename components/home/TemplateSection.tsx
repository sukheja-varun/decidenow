'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { TemplateGrid } from '@/components/home/TemplateGrid'
import type { Template } from '@/types'

interface TemplateSectionProps {
  templates: Template[]
}

export function TemplateSection({ templates }: TemplateSectionProps) {
  const router = useRouter()
  const [showAll, setShowAll] = useState(false)

  const handleSelect = (slug: string) => {
    if (slug === 'blank') {
      router.push('/decide/new')
    } else {
      router.push(`/decide/new?template=${slug}`)
    }
  }

  return (
    <TemplateGrid
      templates={templates}
      showAll={showAll}
      onToggle={() => setShowAll((prev) => !prev)}
      onSelect={handleSelect}
    />
  )
}
