'use client'

import { useState } from 'react'
import { Download, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Decision, EngineResult } from '@/types'

interface ExportBarProps {
  decision: Decision
  result: EngineResult
  className?: string
}

function formatDecisionAsMarkdown(decision: Decision, result: EngineResult): string {
  const { optionAName, optionBName, title, criteria } = decision
  const { totalA, totalB, winner } = result

  const winnerName =
    winner === 'A'
      ? optionAName
      : winner === 'B'
      ? optionBName
      : winner === 'tie'
      ? 'Tie'
      : 'Incomplete'

  const lines: string[] = [
    `# ${title}`,
    '',
    `| Criterion | Importance | ${optionAName} Score | ${optionBName} Score | ${optionAName} Weighted | ${optionBName} Weighted |`,
    `|-----------|------------|${'-'.repeat(optionAName.length + 8)}|${'-'.repeat(optionBName.length + 8)}|${'-'.repeat(optionAName.length + 11)}|${'-'.repeat(optionBName.length + 11)}|`,
  ]

  for (const c of criteria) {
    const weightedA = c.importance * c.scoreA
    const weightedB = c.importance * c.scoreB
    lines.push(
      `| ${c.name} | ${c.importance} | ${c.scoreA || '—'} | ${c.scoreB || '—'} | ${weightedA} | ${weightedB} |`
    )
  }

  lines.push('')
  lines.push(`**Total: ${optionAName} ${totalA} — ${optionBName} ${totalB}**`)
  lines.push('')
  lines.push(
    winner === 'incomplete'
      ? '_Scores incomplete_'
      : winner === 'tie'
      ? '_Result: Tie_'
      : `_Winner: ${winnerName}_`
  )

  return lines.join('\n')
}

export function ExportBar({ decision, result, className }: ExportBarProps) {
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)

  const handleExportImage = async () => {
    setExporting(true)
    try {
      const target = document.getElementById('export-target')
      if (!target) {
        console.error('Export target element not found (#export-target)')
        return
      }
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(target, {
        backgroundColor: '#ffffff',
        useCORS: true,
        scale: 2,
      })
      const url = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = url
      link.download = 'decidenow-export.png'
      link.click()
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setExporting(false)
    }
  }

  const handleCopyText = async () => {
    try {
      const markdown = formatDecisionAsMarkdown(decision, result)
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2',
        className
      )}
    >
      <button
        type="button"
        onClick={handleExportImage}
        disabled={exporting}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-600',
          'bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium',
          'text-gray-700 dark:text-gray-200',
          'hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
          'disabled:cursor-not-allowed disabled:opacity-60'
        )}
      >
        <Download size={15} aria-hidden="true" />
        {exporting ? 'Exporting…' : 'Export as image'}
      </button>

      <button
        type="button"
        onClick={handleCopyText}
        className={cn(
          'inline-flex items-center gap-2 rounded-lg border',
          'px-4 py-2 text-sm font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900',
          copied
            ? 'border-green-400 bg-green-50 dark:bg-green-900/20 dark:border-green-500 text-green-700 dark:text-green-300'
            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
        )}
      >
        <Copy size={15} aria-hidden="true" />
        {copied ? 'Copied! ✓' : 'Copy as text'}
      </button>
    </div>
  )
}
