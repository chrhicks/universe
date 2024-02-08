'use client'

import { UniverseStateProvider } from '@/lib/providers/UniverseStateProvider'
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <UniverseStateProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </UniverseStateProvider>
  )
}