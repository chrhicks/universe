'use client'

import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

export type IncrementalTypes = 'u-quark' | 'd-quark' | 'proton' | 'neutron' | 'electron'

interface Incremental {
  value: number
  setValue: Dispatch<SetStateAction<number>>
}

export interface UniverseStateProps {
  incrementals: Record<IncrementalTypes, Incremental>
}

const UniverseStateContext = createContext<UniverseStateProps>(undefined!)

export function UniverseStateProvider({ children }: { children: React.ReactNode }) {
  const [uQuarks, setUQuarks] = useState<number>(0)
  const [dQuarks, setDQuarks] = useState<number>(0)
  const [protons, setProtons] = useState<number>(0)
  const [neutrons, setNeutrons] = useState<number>(0)
  const [electrons, setElectrons] = useState<number>(0)

  return (
    <UniverseStateContext.Provider
      value={{
        incrementals: {
          'u-quark': {
            value: uQuarks,
            setValue: setUQuarks
          },
          'd-quark': {
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
        }
      }}
    >
      {children}
    </UniverseStateContext.Provider>
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