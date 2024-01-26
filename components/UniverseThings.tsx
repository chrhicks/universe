'use client'

import { IncrementalTypes, useUniverseStateContext } from "@/lib/providers/UniverseStateProvider"

export default function UniverseThings() {
  const { incrementals } = useUniverseStateContext()

  function getValue(type: IncrementalTypes) {
    const incremental = incrementals[type]
    return incremental.value
  }


  return (
    <div className="bg-gray-800 rounded-md px-2">
      <p className="text-lg mb-2">Universe Things</p>
      <div className="grid grid-cols-2 gap-1">
        <div className="">Quarks(up)</div>
        <div className="text-right">{ getValue('u-quark') }</div>

        <div className="">Quarks(down)</div>
        <div className="text-right">{ getValue('d-quark') }</div>

        <div className="">Electrons</div>
        <div className="text-right">{ getValue('electron') }</div>

        <div className="">Protons</div>
        <div className="text-right">{ getValue('proton') }</div>

        <div className="">Neutron</div>
        <div className="text-right">{ getValue('neutron') }</div>
      </div>
    </div>
  )
}