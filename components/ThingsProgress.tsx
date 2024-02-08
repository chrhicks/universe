'use client'

import { useUniverseStateCtx } from '@/lib/providers/UniverseStateProvider'
import Incremental from './Incremental'

export default function ThingsProgress() {
  const { universeState: { things: {
    upQuark,
    downQuark,
    electron,
    proton,
    neutron
  } } } = useUniverseStateCtx()

  return(
    <>
      <Incremental label="Quarks (up)" thing={upQuark} />
      <Incremental label="Quarks (down)" thing={downQuark} />
      <Incremental label="Electrons" thing={electron} />
      <Incremental label="Protons" thing={proton} />
      <Incremental label="Neutrons" thing={neutron} />
    </>
  )
}