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
      totalPerProgressComplete: 1,
      pointsForNext: 1,
      rate: configuration.things['upQuark'].rate,
      xpAmount: configuration.things['upQuark'].xpAmount,
      automated: false
    },
    downQuark: {
      thingType: 'downQuark',
      total: 0,
      progress: 0,
      totalPerProgressComplete: 1,
      pointsForNext: 1,
      rate: configuration.things['downQuark'].rate,
      xpAmount: configuration.things['downQuark'].xpAmount,
      automated: false
    },
    proton: {
      thingType: 'proton',
      total: 0,
      progress: 0,
      totalPerProgressComplete: 1,
      pointsForNext: 1,
      rate: configuration.things['proton'].rate,
      xpAmount: configuration.things['proton'].xpAmount,
      automated: false
    },
    neutron: {
      thingType: 'neutron',
      total: 0,
      progress: 0,
      totalPerProgressComplete: 1,
      pointsForNext: 1,
      rate: configuration.things['neutron'].rate,
      xpAmount: configuration.things['neutron'].xpAmount,
      automated: false
    },
    electron: {
      thingType: 'electron',
      total: 0,
      progress: 0,
      totalPerProgressComplete: 1,
      pointsForNext: 1,
      rate: configuration.things['electron'].rate,
      xpAmount: configuration.things['electron'].xpAmount,
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