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
        'sticky top-0 z-10 w-full px-4 py-3 text-center backdrop-blur-sm transition-all',
        winner === 'A' || winner === 'B'
          ? 'bg-gradient-to-r from-green-500 to-yellow-400 dark:from-green-600 dark:to-yellow-500 text-white'
          : winner === 'tie'
          ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 border-b border-amber-200 dark:border-amber-700'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700'
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
