import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { BottomNav } from '@/components/ui/BottomNav'
import { TopBar } from '@/components/ui/TopBar'
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
      <body
        className="min-h-full flex flex-col bg-[var(--md-background)]"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TopBar />
          <main className="flex flex-1 flex-col pb-20 sm:pb-0">
            {children}
          </main>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  )
}
