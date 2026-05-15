import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import Link from 'next/link'
import { DarkModeToggle } from '@/components/ui/DarkModeToggle'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://decidenow.app'),
  title: {
    template: '%s | DecideNow',
    default: 'DecideNow',
  },
  description: 'Stop overthinking. Start deciding.',
  other: {
    'color-scheme': 'light dark',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-gray-50 dark:bg-gray-950" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Top nav bar */}
          <header className="sticky top-0 z-30 w-full border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
              <Link
                href="/"
                className="text-xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight hover:opacity-80 transition-opacity"
              >
                DecideNow
              </Link>
              <div className="flex items-center gap-2">
                <DarkModeToggle />
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex flex-1 flex-col">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
