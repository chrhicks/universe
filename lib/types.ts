import { Dispatch, SetStateAction } from 'react'

export type IncrementalTypes = 'upQuark' | 'downQuark' | 'proton' | 'neutron' | 'electron'
export type UpgradeId = 'sub-atomic-automation' | 'atomic-automation'

export interface ThingValue {
  thingType: IncrementalTypes
  total: number
  totalPerProgressComplete: number
  progress: number
  pointsForNext: number
  rate: number
  xpAmount: number
  automated: boolean
}

export interface AppliedUpgrade {
  id: UpgradeId
}

export interface UniverseState {
  darkEnergy: number
  experience: {
    amount: number,
    nextLevel: number
    level: number
  }
  appliedUpgrades: AppliedUpgrade[]
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

export interface ThingConfig {
  // The rate at which to increase progress
  rate: number // Float - Fixed(3)

  // % based value - 0-100
  progress: number // Integer

  // How much to increment XP progress by
  xpAmount: number // Integer
}

export interface IncrementalConfig {
  upQuark: ThingConfig
  downQuark: ThingConfig
  proton: ThingConfig
  neutron: ThingConfig
  electron: ThingConfig
}

export interface DarkEnergyConfig {
  maxAmount: number
}

export interface ExperienceConfig {
  initialRequirement: number
  growthType: 'exponential' | 'logarithmic'
  expGrowthFactor: number
  logGrowthFactor: number
}

export interface UpgradeConfig {
  id: UpgradeId
  name: string
  description: string
  cost: number
}

export interface UpgradesConfig {
  items: UpgradeConfig[]
}

export interface Configuration {
  tickSpeed: number
  darkEnergy: DarkEnergyConfig
  experience: ExperienceConfig
  upgrades: UpgradesConfig
  things: IncrementalConfig
}