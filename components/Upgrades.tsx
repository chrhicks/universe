'use client'

import { configuration } from "@/lib/config";
import { useUniverseStateCtx } from "@/lib/providers/UniverseStateProvider";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";

function UpgradeTile({ name, description, cost }: { name: string, description: string, cost: number }) {
  return (
    <div className="flex rounded text-slate-800 bg-teal-600 p-2 space-x-4 justify-between">
      <div className="max-w-xs">
        <p className="font-bold">{name}</p>
        <p className="text-sm text-slate-600 font-semibold">Cost: {cost}</p>
        <p className="text-tiny text-slate-600">{description}</p>
      </div>
      <div className="flex-1"></div>
      <div>
        <button className="rounded p-2 bg-sky-700">
          <ChevronDoubleUpIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default function Upgrades() {
  const { upgrades: { items } } = configuration
  const { universeState: { experience } } = useUniverseStateCtx()
  return (
    <div className="rounded-md bg-slate-800 p-2 space-y-4">
      <p>Upgrades</p>
      <div>Points: {experience.level}</div>
      {items.map(upgrade =>
        <UpgradeTile cost={upgrade.cost} name={upgrade.name} description={upgrade.description} key={upgrade.name} />)
      }
    </div>
  )
}