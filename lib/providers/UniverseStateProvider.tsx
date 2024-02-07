'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import UniverseStateHelper from "../UniverseStateHelper";
import { configuration } from "../config";
import { StateWrapper, UniverseState } from "../types";

const UniverseStateCtx = createContext<StateWrapper>(undefined!)

const defaultUniverseState: UniverseState = {
  darkEnergy: 0,
  experience: {
    amount: 1,
    nextLevel: configuration.experience.initialRequirement,
    level: 1
  },
  appliedUpgrades: [],
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
      setUniverseState(helper.performTick())
    }

    const tickId = setTimeout(fn, 500)

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
      "useUniverseStateCtx should be used within the UniverseState provider!"
    )
  }

  return context
}