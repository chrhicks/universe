import { Dispatch, SetStateAction } from 'react'
import { configuration } from './config'
import { AppliedUpgrade, IncrementalTypes, StateWrapper, ThingConfig, ThingValue, UniverseState, UpgradeId } from './types'

export default class UniverseStateHelper {
  universeState: UniverseState
  setUniverseState: Dispatch<SetStateAction<UniverseState>>

  constructor(state: StateWrapper) {
    this.universeState = state.universeState
    this.setUniverseState = state.setUniverseState
  }

  performTick(universeState?: UniverseState): UniverseState {
    let xpIncrement = 0
    const { appliedUpgrades } = this.universeState

    const upgradeModifications = (thingValue: ThingValue) => {
      let mods = {
        automated: false
      }

      const subAtomicAutomation: IncrementalTypes[] = ['upQuark', 'downQuark', 'electron']
      const atomicAutomation: IncrementalTypes[] = ['neutron', 'proton']

      if (subAtomicAutomation.includes(thingValue.thingType)
            && appliedUpgrades.find(au => au.id === 'sub-atomic-automation')) {
        mods = {
          ...mods,
          automated: true
        }
      }

      if (atomicAutomation.includes(thingValue.thingType)
            && appliedUpgrades.find(au => au.id === 'atomic-automation')) {

        mods = {
          ...mods,
          automated: true
        }
      }

      return mods
    }

    const increment = (config: ThingConfig, thingValue: ThingValue): ThingValue => {
      const { xpAmount, rate } = config
      const { total, progress } = thingValue

      const mods = upgradeModifications(thingValue)

      if (!mods.automated) {
        return thingValue
      }

      const newProgress = progress + rate
      const newTotal = newProgress >= 100 ? total + 1 : total

      if (newProgress >= 100) {
        xpIncrement += xpAmount
      }

      return {
        ...thingValue,
        progress: newProgress >= 100 ? 0 : newProgress,
        total: newTotal,
        automated: mods.automated
      }
    }

    const incrementXp = () => {
      const { amount, nextLevel, level } = this.universeState.experience
      const nextAmount = amount + xpIncrement
      const isNewLevel = nextAmount >= nextLevel
      const newNextLevel = isNewLevel ? level + 1 : level

      return {
        amount: isNewLevel ? 0 : nextAmount,
        nextLevel: isNewLevel
          ? this.xpGrowthFn(nextAmount, newNextLevel)
          : nextLevel,
        level: newNextLevel
      }
    }

    //
    // order of operations: `increment`, `experience`
    //

    // 1.
    const things = {
      ...this.universeState.things,
      upQuark: increment(configuration.things.upQuark, this.universeState.things.upQuark),
      downQuark: increment(configuration.things.downQuark, this.universeState.things.downQuark),
      proton: increment(configuration.things.proton, this.universeState.things.proton),
      neutron: increment(configuration.things.neutron, this.universeState.things.neutron),
      electron: increment(configuration.things.electron, this.universeState.things.electron)
    }

    // 2.
    const experience = incrementXp()

    const newState: UniverseState = {
      ...(universeState || this.universeState),
      things,
      darkEnergy: this.universeState.darkEnergy + xpIncrement,
      experience
    }

    return newState
  }

  xpGrowthFn(amount: number, level: number): number {
    const { expGrowthFactor, logGrowthFactor, growthType } = configuration.experience
    console.log(`growthType: ${growthType}`)
    switch (growthType) {
      case 'exponential':
        return (amount * Math.pow(configuration.experience.expGrowthFactor, level -1 ))
      default:
        throw new Error(`Unhandled experience growthType [${growthType}]`)
    }
  }

  incrementThing(type: IncrementalTypes, appliedUpgrades: AppliedUpgrade[]): ThingValue {
    const config = configuration.things[type]
    const thingValue = this.universeState.things[type]
    const { rate } = config
    const { total, progress } = thingValue
    const newProgress = progress + rate

    return {
      ...thingValue,
      total: total + 1,
      progress:  newProgress >= 100 ? 0 : newProgress
    }
  }

  incrementXp(type: IncrementalTypes) {
    const { xpAmount } = configuration.things[type]
    const { amount, nextLevel, level } = this.universeState.experience
    const nextAmount = amount + xpAmount
    const isNewLevel = nextAmount >= nextLevel
    const newNextLevel = isNewLevel ? level + 1 : level

    return {
      amount: isNewLevel ? 0 : nextAmount,
      nextLevel: isNewLevel
        // ? (nextAmount * Math.pow(configuration.experience.growthFactor, newNextLevel -1 ))
        // ? ((nextAmount + 1) * Math.log(nextLevel))
        ? this.xpGrowthFn(nextAmount, newNextLevel)
        : nextLevel,
      level: newNextLevel
    }
  }

  increment(type: IncrementalTypes): UniverseState {
    const { appliedUpgrades, experience } = this.universeState
    const { xpAmount } = configuration.things[type]
    const newThingValue = this.incrementThing(type, appliedUpgrades)
    const newExperience =
      experience.level > 0
        && newThingValue.progress === 0
        ? this.incrementXp(type) : experience

    return {
      ...this.universeState,
      things: {
        ...this.universeState.things,
        [type]: newThingValue
      },
      experience: newExperience,
      darkEnergy: this.universeState.darkEnergy + xpAmount
    }
  }

  // TODO: save applied modifiers to state
  // -- maybe. Will it just sort itself on the next Tick?
  applyUpgrade(id: UpgradeId): UniverseState {
    const { appliedUpgrades, experience: { level } } = this.universeState
    const upgrade = configuration.upgrades.items.find(au => au.id === id)

    if (!upgrade || level < upgrade.cost) return this.universeState

    const isExisting = appliedUpgrades.find(u => u.id === id)

    if (isExisting) return this.universeState

    const newAppliedUpgrades = [...appliedUpgrades, { id }]

    return {
      ...this.universeState,
      experience: {
        ...this.universeState.experience,
        level: (level - upgrade.cost)
      },
      appliedUpgrades: newAppliedUpgrades
    }
  }
}