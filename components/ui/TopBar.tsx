'use client'

import Link from 'next/link'
import { DarkModeToggle } from '@/components/ui/DarkModeToggle'

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-[var(--md-outline-variant)] bg-[var(--md-surface-container)]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
          style={{ color: 'var(--md-primary)' }}
        >
          DecideNow
        </Link>
        <div className="flex items-center gap-2">
          <DarkModeToggle />
        </div>
      </div>
    </header>
  )
}
