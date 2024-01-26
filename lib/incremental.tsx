'use client'

import { Button } from "@nextui-org/button";
import {
  IncrementalTypes,
  UniverseStateProps,
  useUniverseStateContext
} from "@/lib/providers/UniverseStateProvider";
import { PlusIcon } from "@heroicons/react/24/outline"
import { Progress } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface IncrementalProps {
  label: string
  rate?: number
  type:  Exclude<IncrementalTypes, 'u-quark' | 'd-quark'> | 'quarks'
}

function increment(type: IncrementalTypes | 'quarks', state: UniverseStateProps) {
  switch(type) {
    case 'quarks': {
      const { value: uQuarks, setValue: setUQuarks } = state.incrementals['u-quark']
      const { value: dQuarks, setValue: setDQuarks } = state.incrementals['d-quark']


      setUQuarks(uQuarks + (Math.round(Math.random() * 3)))
      setDQuarks(dQuarks + (Math.round(Math.random() * 3)))


    }

    // Ratio: 1 neutron for every 7 protons
    case 'proton': {
      const { value: uQuarks, setValue: setUQuarks } = state.incrementals['u-quark']
      const { value: dQuarks, setValue: setDQuarks } = state.incrementals['d-quark']
      const { value: protons, setValue: setProtons } = state.incrementals['proton']
      const { value: electrons, setValue: setElectrons } = state.incrementals['electron']

      if (uQuarks > 2 && dQuarks > 1) {
        setUQuarks(uQuarks - 2)
        setDQuarks(dQuarks - 1)
        setProtons(protons + 1)
        setElectrons(electrons + 1)
      }
    }

    case 'neutron': {
      const { value: uQuarks, setValue: setUQuarks } = state.incrementals['u-quark']
      const { value: dQuarks, setValue: setDQuarks } = state.incrementals['d-quark']
      const { value: neutons, setValue: setNeutons } = state.incrementals['neutron']
      if (uQuarks > 1 && dQuarks > 2) {
        setUQuarks(uQuarks - 1)
        setDQuarks(dQuarks - 2)
        setNeutons(neutons + 1)
      }
    }
    default:
  }
}


export default function Incremental(props: IncrementalProps) {
  const universeState = useUniverseStateContext()
  const { type, label, rate = 0.001 } = props
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    (function() {
      setTimeout(() => {
        if (progress >= 100) {
          increment(type, universeState)
        }
        setProgress(progress >=100 ? 0 : parseFloat((progress + (rate * 100)).toFixed(3)))
      }, 50)
    })()
  })

  return (
    <div>
      <Progress
        size="sm"
        color="success"
        label={label}
        value={progress}
        disableAnimation
        isStriped
      />
    </div>
  )
}