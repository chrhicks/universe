'use client'

import UniverseStateHelper from "@/lib/UniverseStateHelper";
import { configuration } from "@/lib/config";
import { useUniverseStateCtx } from "@/lib/providers/UniverseStateProvider";
import { UpgradeConfig } from "@/lib/types";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/outline";




function UpgradeTile({ config }: { config: UpgradeConfig }) {
  const stateWrapper = useUniverseStateCtx()

  function applyUpgrade(id: string) {
    const helper = new UniverseStateHelper(stateWrapper)
    const updatedState = helper.applyUpgrade(id)
    stateWrapper.setUniverseState(updatedState)
  }

  return (
    <div className="flex rounded text-slate-800 bg-teal-600 p-2 space-x-4 justify-between">
      <div className="max-w-xs">
        <p className="font-bold">{config.name}</p>
        <p className="text-sm text-slate-600 font-semibold">Cost: {config.cost}</p>
        <p className="text-tiny text-slate-600">{config.description}</p>
      </div>
      <div className="flex-1"></div>
      <div>
        <button className="rounded p-2 bg-sky-700" onClick={() => applyUpgrade(config.id) } >
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
        <UpgradeTile config={upgrade} key={upgrade.id} />)
      }
    </div>
  )
}