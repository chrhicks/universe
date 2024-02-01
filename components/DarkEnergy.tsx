'use client'

import { useUniverseStateContext, useUniverseStateCtx } from "@/lib/providers/UniverseStateProvider";
import { Progress } from "@nextui-org/react";
import { configuration } from '@/lib/config'

export default function DarkEnergy() {
  const { universeState: { darkEnergy } } = useUniverseStateCtx()
  const progress = parseInt(((darkEnergy / configuration.darkEnergy.maxAmount) * 100).toFixed())

  return (
    <Progress
      size="lg"
      classNames={{
        track: "drop-shadow-md border border-default",
        indicator: "bg-gradient-to-r from-gray-700 to-purple-800",
        label: "tracking-wider font-medium text-default-600",
        value: "text-foreground/60",
      }}
      label="Dark Energy"
      value={progress}
      showValueLabel={true}
      valueLabel={
        <div>
          {darkEnergy} / {configuration.darkEnergy.maxAmount}
        </div>
      }
    />
  )
}