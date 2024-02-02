'use client'

import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import UniverseStateHelper from "../UniverseStateHelper";
import { configuration } from "../config";

export type IncrementalTypes = 'upQuark' | 'downQuark' | 'proton' | 'neutron' | 'electron'

interface Incremental {
  value: number
  setValue: Dispatch<SetStateAction<number>>
}

export interface UniverseStateProps {
  incrementals: Record<IncrementalTypes, Incremental>
  energy: number
  setEnergy: Dispatch<SetStateAction<number>>
  experience: number
  setExperience: Dispatch<SetStateAction<number>>
}

export interface ThingValue {
  thingType: IncrementalTypes
  total: number
  progress: number
  automated: boolean
}

export interface UniverseState {
  darkEnergy: number
  experience: {
    amount: number,
    nextLevel: number
    level: number
  }
  things: {
    upQuark: ThingValue
    downQuark: ThingValue
    proton: ThingValue
    neutron: ThingValue
    electron: ThingValue
  }
}

export interface StateWrapper {
  universeState: UniverseState
  setUniverseState: Dispatch<SetStateAction<UniverseState>>
}

const UniverseStateContext = createContext<UniverseStateProps>(undefined!)
const UniverseStateCtx = createContext<StateWrapper>(undefined!)

const defaultUniverseState: UniverseState = {
  darkEnergy: 0,
  experience: {
    amount: 1,
    nextLevel: configuration.experience.initialRequirement,
    level: 1
  },
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
  const [energy, setEnergy] = useState(0)
  const [experience, setExperience] = useState(0)
  const [uQuarks, setUQuarks] = useState(0)
  const [dQuarks, setDQuarks] = useState(0)
  const [protons, setProtons] = useState(0)
  const [neutrons, setNeutrons] = useState(0)
  const [electrons, setElectrons] = useState(0)

  const [universeState, setUniverseState] = useState<UniverseState>(defaultUniverseState)

  useEffect(() => {
    const tickId = setTimeout(() => {
      const helper = new UniverseStateHelper({ universeState, setUniverseState })
      setUniverseState(helper.performTick())
    }, 500)

    return () => clearTimeout(tickId)
  }, [universeState])

  return (
    <UniverseStateCtx.Provider value={{
      universeState,
      setUniverseState
    }}>
      <UniverseStateContext.Provider
        value={{
          incrementals: {
            'upQuark': {
              value: uQuarks,
              setValue: setUQuarks
            },
            'downQuark': {
              value: dQuarks,
              setValue: setDQuarks
            },
            'proton': {
              value: protons,
              setValue: setProtons
            },
            'neutron': {
              value: neutrons,
              setValue: setNeutrons
            },
            'electron': {
              value: electrons,
              setValue: setElectrons
            }
          },
          energy,
          setEnergy,
          experience,
          setExperience
        }}
      >
        {children}
      </UniverseStateContext.Provider>
    </UniverseStateCtx.Provider>
  )
}

export function useUniverseStateContext(): UniverseStateProps {
  const context = useContext(UniverseStateContext)

  if (!context) {
    throw new Error(
      "useUniverseStateContext should be used within the UniverseState provider!"
    )
  }

  return context
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