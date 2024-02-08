'use client'

import { useUniverseStateCtx } from '@/lib/providers/UniverseStateProvider'
import { Progress } from '@nextui-org/react'

export default function Experience() {
  const { universeState: { experience } } = useUniverseStateCtx()

  const xpPercent = parseInt(((experience.amount / experience.nextLevel) * 100).toFixed(3))

  return (
    <Progress
      size="md"
      classNames={{
        track: 'drop-shadow-md border border-default',
        indicator: 'bg-gradient-to-r from-orange-700 to-red-800',
        label: 'tracking-wider font-medium text-default-600',
        value: 'text-foreground/60'
      }}
      label="XP"
      value={xpPercent}
      showValueLabel={true}
    />
  )
}