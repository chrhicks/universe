
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

export interface Configuration {
  darkEnergy: DarkEnergyConfig
  experience: ExperienceConfig
  things: IncrementalConfig
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
  things: {
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
}