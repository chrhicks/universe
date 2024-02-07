import { Configuration, IncrementalConfig, UpgradesConfig } from "./types"

const things: IncrementalConfig = {
  upQuark: {
    rate: 10,
    progress: 0,
    xpAmount: 50
  },
  downQuark: {
    rate: 10,
    progress: 0,
    xpAmount: 50
  },
  proton: {
    rate: 5,
    progress: 0,
    xpAmount: 65
  },
  neutron: {
    rate: 5,
    progress: 0,
    xpAmount: 65
  },
  electron: {
    rate: 15,
    progress: 0,
    xpAmount: 25
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
  darkEnergy: {
    maxAmount: 28123,
  },
  experience: {
    initialRequirement: 250,
    fn: 'exponential',
    growthFactor: 1.5
  },
  upgrades,
  things
}