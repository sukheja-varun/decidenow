import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import { listTemplates } from '@/lib/templates'
import { TemplateSection } from '@/components/home/TemplateSection'
import { SavedDecisionsList } from '@/components/home/SavedDecisionsList'

export default function HomePage() {
  const all = listTemplates()

  return (
    <div className="flex flex-1 flex-col">
      {/* ── Gradient hero ── */}
      <section
        className="relative overflow-hidden px-4 py-12 sm:py-20 sm:px-6"
        style={{
          background: 'linear-gradient(135deg, #494bd6 0%, #571bc1 100%)',
        }}
      >
        {/* Decorative blob */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #c0c1ff 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            ⚖️ Weighted decision making, made simple
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            Stop overthinking.<br />
            <span className="text-[#c0c1ff]">Start deciding.</span>
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-lg mx-auto">
            Score two options across what matters most to you. Get a clear winner in seconds.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/decide/new"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-[#4648d4] shadow-lg hover:bg-white/90 transition-colors"
            >
              <PlusCircle size={16} aria-hidden="true" />
              Start a decision
            </Link>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 space-y-12">

        {/* ── Templates ── */}
        <section id="templates" className="space-y-5">
          <div>
            <h2 className="text-xl font-bold text-[var(--md-on-surface)]">Pick a template</h2>
            <p className="mt-1 text-sm text-[var(--md-on-surface-variant)]">Pre-filled criteria for common tough decisions.</p>
          </div>
          <TemplateSection templates={all} />
        </section>

        {/* ── How it works ── */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold text-[var(--md-on-surface)]">How it works</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { emoji: '📋', title: '1. Pick your criteria', desc: 'List what matters — salary, culture, location. Give each a weight 1–10.' },
              { emoji: '🎯', title: '2. Score each option', desc: 'Rate Option A and B on each criterion 1–10. Go with your gut.' },
              { emoji: '🏆', title: '3. See your winner', desc: 'Weight × score per criterion, totalled up. The highest score wins.' },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-[var(--md-outline-variant)] bg-[var(--md-surface-container)] p-5 space-y-2"
              >
                <div className="text-2xl">{step.emoji}</div>
                <h3 className="font-semibold text-[var(--md-on-surface)]">{step.title}</h3>
                <p className="text-sm text-[var(--md-on-surface-variant)]">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Saved decisions ── */}
        <section id="history" className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[var(--md-on-surface)]">Your decisions</h2>
              <p className="mt-1 text-sm text-[var(--md-on-surface-variant)]">Pick up where you left off.</p>
            </div>
            <Link
              href="/decide/new"
              className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
              style={{ color: 'var(--md-primary)' }}
            >
              <PlusCircle size={14} aria-hidden="true" />
              New
            </Link>
          </div>
          <SavedDecisionsList />
        </section>
      </div>
    </div>
  )
}
