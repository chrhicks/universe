'use client'

import {
   useUniverseStateCtx
} from '@/lib/providers/UniverseStateProvider'
import { Progress } from '@nextui-org/react'
import { ArrowUpIcon, PlusIcon } from '@heroicons/react/24/outline'
import UniverseStateHelper from '@/lib/UniverseStateHelper'
import { ThingValue } from '@/lib/types'
import { toFixedFloat } from '@/lib/utils'

interface IncrementalProps {
  label: string
  thing: ThingValue
}


/**
 *  TODO: add handlers for clicking the buttons.
 *
 * helper.increment(type)
 * helper.upgrade(type)
 *
 * @param props
 * @returns
 */
export default function Incremental(props: IncrementalProps) {
  const {
    label,
    thing: {
      thingType,
      total,
      progress,
      pointsForNext,
      totalPerProgressComplete,
      xpAmount
    }
  } = props
  const state = useUniverseStateCtx()
  const { experience: { level } } = state.universeState

  function increment() {
    const helper = new UniverseStateHelper(state)
    const newUniverseState = helper.increment(thingType)

    state.setUniverseState(newUniverseState)
  }

  function upgradeThing() {
    const helper = new UniverseStateHelper(state)
    state.setUniverseState(helper.applyThingUpgrade(props.thing))
  }

  return (
    <div className="rounded-md bg-slate-800 p-2">
      <p className="text-sm mb-2">{label} ({total})</p>
      <div className="mb-2">
        <Progress
          size="sm"
          color="success"
          aria-label={label}
          value={progress}
          isStriped
          disableAnimation
        />
      </div>
      <div className="flex space-x-2 items-center">
        <button disabled={pointsForNext > level } className="bg-yellow-500 p-1 rounded flex justify-center items-center" onClick={upgradeThing}>
          <div className="px-1 text-tiny font-semibold flex items-center justify-center bg-yellow-700 rounded-lg">
            <div className="w-2 h-2 mr-2 bg-gray-400 rounded-full"></div>
            { pointsForNext }
          </div>
          <div>
            <ArrowUpIcon className="w-5 h-5 text-green-900" />
          </div>
        </button>
        <div className='flex flex-1 space-x-4 text-xs'>
          <div>
            rate: {toFixedFloat(totalPerProgressComplete)}
          </div>
          <div>
            XP: {toFixedFloat(xpAmount)}
          </div>
        </div>
        <button className="p-1 rounded bg-cyan-900">
          <PlusIcon className="w-5 h-5 text-slate-900" onClick={increment}/>
        </button>
      </div>
    </div>
  )
}