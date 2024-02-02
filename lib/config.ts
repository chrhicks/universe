
export interface ThingConfig {
  // The rate at which to increase progress
  rate: number // Float - Fixed(3)

  // % based value - 0-100
  progress: number // Integer

  // How much to increment XP progress by
  xpAmount: number // Integer
}

export interface IncrementalConfig {
  upQuark: ThingConfig,
  downQuark: ThingConfig,
  proton: ThingConfig,
  neutron: ThingConfig,
  electron: ThingConfig
}

export interface DarkEnergyConfig {
  maxAmount: number
}

export interface ExperienceConfig {
  initialRequirement: number
  fn: 'linear' | 'exponential' | 'variable',
  growthFactor: number
}

export interface UpgradeConfig {
  name: string
  description: string
  cost: number
}

export interface UpgradesConfig {
  items: UpgradeConfig[]
}

export interface Configuration {
  darkEnergy: DarkEnergyConfig
  experience: ExperienceConfig
  upgrades: UpgradesConfig
  things: IncrementalConfig
}

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
    name: 'Sub-atomic Automation',
    description: 'Automatically creates up / down quarks',
    cost: 4
  }, {
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