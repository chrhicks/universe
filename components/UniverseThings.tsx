'use client'

import { useUniverseStateCtx } from '@/lib/providers/UniverseStateProvider'

export default function UniverseThings() {
  const { universeState: { things: {
    upQuark,
    downQuark,
    electron,
    proton,
    neutron
  } } } = useUniverseStateCtx()


  return (
    <div className="bg-gray-800 rounded-md px-2">
      <p className="text-lg mb-2">Universe Things</p>
      <div className="grid grid-cols-2 gap-1">
        <div className="">Quarks(up)</div>
        <div className="text-right">{ upQuark.total }</div>

        <div className="">Quarks(down)</div>
        <div className="text-right">{ downQuark.total }</div>

        <div className="">Electrons</div>
        <div className="text-right">{ electron.total }</div>

        <div className="">Protons</div>
        <div className="text-right">{ proton.total }</div>

        <div className="">Neutron</div>
        <div className="text-right">{ neutron.total }</div>
      </div>
    </div>
  )
}