'use client'

import { Button } from "@nextui-org/button";
import {
  IncrementalTypes,
  UniverseStateProps,
  useUniverseStateContext
} from "@/lib/providers/UniverseStateProvider";
import { PlusIcon } from "@heroicons/react/24/outline"

interface IncrementalProps {
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
    default:
  }
}

export default function Incremental(props: IncrementalProps) {
  const universeState = useUniverseStateContext()
  const { type } = props


  return (
    <Button isIconOnly size="sm" onClick={() =>  increment(type, universeState)}>
      <PlusIcon className="w-5 h-6" />
    </Button>
  )
}