import { Configuration, IncrementalConfig, UpgradesConfig } from './types'

const things: IncrementalConfig = {
  upQuark: {
    rate: 10,
    progress: 0,
    xpAmount: 5
  },
  downQuark: {
    rate: 10,
    progress: 0,
    xpAmount: 5
  },
  electron: {
    rate: 15,
    progress: 0,
    xpAmount: 8
  },
  proton: {
    rate: 5,
    progress: 0,
    xpAmount: 10
  },
  neutron: {
    rate: 5,
    progress: 0,
    xpAmount: 10
  }
}

const upgrades: UpgradesConfig = {
  items: [{
    id: 'sub-atomic-automation',
    name: 'Sub-atomic Automation',
    description: 'Automatically creates up / down quarks',
    cost: 3
  }, {
    id: 'atomic-automation',
    name: 'Atomic Automation',
    description: 'Automatically creates atomic particles (elections, protons, neutrons)',
    cost: 5
  }]
}

export const configuration: Configuration = {
  tickSpeed: 250,
  darkEnergy: {
    maxAmount: 85000000000
  },
  experience: {
    initialRequirement: 30,
    growthType: 'logarithmic',
    expGrowthFactor: 1.5,
    logGrowthFactor: 1
  },
  upgrades,
  things
}