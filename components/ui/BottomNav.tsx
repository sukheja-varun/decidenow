'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, PlusCircle, Clock, LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home, matchExact: true },
  { href: '/decide/new', label: 'New', icon: PlusCircle, matchExact: false },
  { href: '/#history', label: 'History', icon: Clock, matchExact: false },
  { href: '/#templates', label: 'Templates', icon: LayoutGrid, matchExact: false },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 sm:hidden border-t border-[var(--md-outline-variant)] bg-[var(--md-surface-container)]"
      aria-label="Primary navigation"
    >
      <ul className="flex h-16 items-center justify-around px-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon, matchExact }) => {
          const basePath = href.split('#')[0]
          const isActive = matchExact
            ? pathname === basePath
            : basePath !== '/' && pathname.startsWith(basePath)
          return (
            <li key={label} className="flex-1">
              <Link
                href={href}
                className={cn(
                  'flex flex-col items-center gap-0.5 rounded-2xl px-3 py-1.5 mx-auto w-fit transition-colors',
                  isActive
                    ? 'text-[var(--md-on-primary-container)] bg-[var(--md-primary-container)]'
                    : 'text-[var(--md-on-surface-variant)] hover:text-[var(--md-on-surface)]'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  size={22}
                  aria-hidden="true"
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                <span className="text-[10px] font-medium leading-none">{label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
