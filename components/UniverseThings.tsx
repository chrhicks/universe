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
        <div className="">Up Quarks</div>
        <div className="text-right">{ getValue('u-quark') }</div>
        <div className="">Down Quarks</div>
        <div className="text-right">{ getValue('d-quark') }</div>
      </div>
    </div>
  )
}