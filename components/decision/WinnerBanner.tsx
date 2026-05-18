import { cn } from '@/lib/utils'
import type { EngineResult } from '@/types'

interface WinnerBannerProps {
  result: EngineResult
  optionAName: string
  optionBName: string
}

export function WinnerBanner({
  result,
  optionAName,
  optionBName,
}: WinnerBannerProps) {
  const { winner, totalA, totalB } = result

  const winnerName = winner === 'A' ? optionAName : winner === 'B' ? optionBName : null

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'sticky top-14 z-20 w-full px-4 py-3 text-center backdrop-blur-sm transition-all',
        winner === 'A' || winner === 'B'
          ? 'bg-gradient-to-r from-[#494bd6] to-[#571bc1] text-white shadow-md'
          : winner === 'tie'
          ? 'bg-[var(--md-surface-container)] text-[var(--md-on-surface-variant)] border-b border-[var(--md-outline-variant)]'
          : 'bg-[var(--md-surface-container)] text-[var(--md-on-surface-variant)] border-b border-[var(--md-outline-variant)]'
      )}
    >
      {(winner === 'A' || winner === 'B') && winnerName && (
        <p className="text-xl font-bold tracking-tight sm:text-2xl">
          {'🏆 '}
          <span>{winnerName}</span>
          {' wins! '}
          <span className="text-lg font-semibold opacity-90 sm:text-xl">
            {totalA} vs {totalB}
          </span>
        </p>
      )}
      {winner === 'tie' && (
        <p className="text-base font-semibold sm:text-lg">
          {'🤔 Too close to call — go with your gut!'}
        </p>
      )}
      {winner === 'incomplete' && (
        <p className="text-sm font-medium sm:text-base">
          Fill in all scores to see your winner
        </p>
      )}
    </div>
  )
}
