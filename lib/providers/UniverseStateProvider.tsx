'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import UniverseStateHelper from '../UniverseStateHelper'
import { configuration } from '../config'
import { StateWrapper, UniverseState } from '../types'

const UniverseStateCtx = createContext<StateWrapper>(undefined!)

const defaultUniverseState: UniverseState = {
  darkEnergy: 0,
  experience: {
    amount: 1,
    nextLevel: configuration.experience.initialRequirement,
    level: 1
  },
  appliedUpgrades: [{ id: 'sub-atomic-automation' }],
  things: {
    upQuark: {
      thingType: 'upQuark',
      total: 0,
      progress: 0,
      automated: false
    },
    downQuark: {
      thingType: 'downQuark',
      total: 0,
      progress: 0,
      automated: false
    },
    proton: {
      thingType: 'proton',
      total: 0,
      progress: 0,
      automated: false
    },
    neutron: {
      thingType: 'neutron',
      total: 0,
      progress: 0,
      automated: false
    },
    electron: {
      thingType: 'electron',
      total: 0,
      progress: 0,
      automated: false
    }
  }
}

export function UniverseStateProvider({ children }: { children: React.ReactNode }) {
  const [universeState, setUniverseState] = useState<UniverseState>(defaultUniverseState)

  useEffect(() => {
    const fn = () => {
      const helper = new UniverseStateHelper({ universeState, setUniverseState })
      const newState = helper.performTick()
      setUniverseState(newState)
    }

    const tickId = setTimeout(fn, configuration.tickSpeed)

    // const promise = new Promise((resolve) => {
    //   let amount = 250
    //   let level = 2
    //   const helper = new UniverseStateHelper({ universeState, setUniverseState })
    //   for (let i = 0; i < 15; i++) {
    //     console.log(`amount[${amount}], nextLevel[${helper.xpGrowthFn(amount, level)}]`)
    //   }
    // })

    return () => clearTimeout(tickId)
  })

  return (
    <UniverseStateCtx.Provider value={{
      universeState,
      setUniverseState
    }}>
      {children}
    </UniverseStateCtx.Provider>
  )
}

export function useUniverseStateCtx(): StateWrapper {
  const context = useContext(UniverseStateCtx)

  if (!context) {
    throw new Error(
      'useUniverseStateCtx should be used within the UniverseState provider!'
    )
  }

  return context
}