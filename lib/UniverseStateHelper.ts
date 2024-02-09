import { Dispatch, SetStateAction } from 'react'
import { configuration } from './config'
import { ExperienceState, IncrementalTypes, StateWrapper, ThingValue, UniverseState, UpgradeId } from './types'
import { toInt } from './utils'

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

    const increment = (thingValue: ThingValue): ThingValue => {
      const { total, progress, rate, totalPerProgressComplete, xpAmount } = thingValue

      const mods = upgradeModifications(thingValue)

      if (!mods.automated) {
        return thingValue
      }

      const newProgress = progress + rate
      const newTotal = newProgress >= 100 ? total + toInt(totalPerProgressComplete) : total

      if (newProgress >= 100) {
        xpIncrement += xpAmount
      }

      return {
        ...thingValue,
        progress: newProgress >= 100 ? 0 : newProgress,
        xpAmount: newProgress >= 100 ? (xpAmount * 1.25) : xpAmount,
        total: newTotal,
        automated: mods.automated
      }
    }

    const isNewLevel = () => {
      const { amount, nextLevel } = this.universeState.experience
      const nextAmount = amount + xpIncrement
      return nextAmount >= nextLevel
    }

    const incrementXp = (): ExperienceState => {
      const { amount, nextLevel, points, totalPoints, theNumber } = this.universeState.experience
      const nextAmount = amount + xpIncrement
      const iisNewLevel = isNewLevel()
      const newPoints = iisNewLevel ? Math.max(points, -1) + 1 : points
      const newTheNumber = iisNewLevel ? theNumber + 1 : theNumber
      const newAmount = iisNewLevel ? 0 : nextAmount + newTheNumber
      const newTotalPoints = iisNewLevel ? totalPoints + 1 : totalPoints
      const newNextLevel = iisNewLevel
          ? this.xpGrowthFn(Math.max(newAmount, nextLevel), newTotalPoints + 1)
          : nextLevel

      return {
        ...this.universeState.experience,
        amount: newAmount,
        nextLevel: newNextLevel,
        points: newPoints,
        totalPoints: newTotalPoints,
        theNumber: newTheNumber
      }
    }

    //
    // order of operations: `increment`, `experience`
    //

    // 1.
    const things = {
      ...this.universeState.things,
      upQuark: increment(this.universeState.things.upQuark),
      downQuark: increment(this.universeState.things.downQuark),
      proton: increment(this.universeState.things.proton),
      neutron: increment(this.universeState.things.neutron),
      electron: increment(this.universeState.things.electron)
    }

    // 2.
    const experience = isNewLevel() ? incrementXp() : this.universeState.experience

    const newState: UniverseState = {
      ...(universeState || this.universeState),
      things,
      darkEnergy: this.universeState.darkEnergy + xpIncrement,
      experience
    }

    return newState
  }

  xpGrowthFn(amount: number, level: number): number {
    const { expGrowthFactor, growthType } = configuration.experience

    switch (growthType) {
      case 'exponential':
        return (amount * Math.pow(expGrowthFactor, level -1 ))
      case 'logarithmic':
        return (amount + Math.log2(level))
      default:
        throw new Error(`Unhandled experience growthType [${growthType}]`)
    }
  }

  incrementThing(type: IncrementalTypes): ThingValue {
    const config = configuration.things[type]
    const thingValue = this.universeState.things[type]
    const { rate } = config
    const { total, progress, xpAmount } = thingValue
    const newProgress = progress + rate

    return {
      ...thingValue,
      total: total + 1,
      progress:  newProgress >= 100 ? 0 : newProgress,
      xpAmount: newProgress >= 100 ? (xpAmount * 1.1) : xpAmount
    }
  }

  incrementXp(type: IncrementalTypes): ExperienceState {
    const { amount, nextLevel, points, totalPoints, theNumber } = this.universeState.experience
    const { things: { [type]: { xpAmount } } } = this.universeState
    const nextAmount = amount + xpAmount
    const isNewLevel = nextAmount >= nextLevel
    const newPoints = isNewLevel ? Math.max(points, -1) + 1 : points
    const newTheNumber = isNewLevel ? theNumber + 1 : theNumber
    const newAmount = isNewLevel ? 0 : nextAmount + newTheNumber
    const newTotalPoints = isNewLevel ? totalPoints + 1 : totalPoints
    const newNextLevel = isNewLevel
        ? this.xpGrowthFn(Math.max(newAmount, nextLevel), newTotalPoints + 1)
        : nextLevel

    const nextState = {
      ...this.universeState.experience,
      amount: newAmount,
      nextLevel: newNextLevel,
      points: newPoints,
      totalPoints: newTotalPoints,
      theNumber: newTheNumber
    }

    return nextState
  }

  increment(type: IncrementalTypes): UniverseState {
    const { experience } = this.universeState
    const { xpAmount } = configuration.things[type]
    const newThingValue = this.incrementThing(type)
    const newExperience =
      experience.points >= 0
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

  applyUpgrade(id: UpgradeId): UniverseState {
    const { appliedUpgrades, experience: { points } } = this.universeState
    const upgrade = configuration.upgrades.items.find(au => au.id === id)

    if (!upgrade || points < upgrade.cost) return this.universeState

    const isExisting = appliedUpgrades.find(u => u.id === id)

    if (isExisting) return this.universeState

    const newAppliedUpgrades = [...appliedUpgrades, { id }]

    return {
      ...this.universeState,
      experience: {
        ...this.universeState.experience,
        points: (points - upgrade.cost)
      },
      appliedUpgrades: newAppliedUpgrades
    }
  }

  applyThingUpgrade(thingValue: ThingValue): UniverseState {
    const { pointsForNext, rate, totalPerProgressComplete, xpAmount } = thingValue
    return {
      ...this.universeState,
      experience: {
        ...this.universeState.experience,
        points: this.universeState.experience.points - pointsForNext
      },
      things: {
        ...this.universeState.things,
        [thingValue.thingType]: {
          ...thingValue,
          pointsForNext: pointsForNext + 1,
          rate: this.xpGrowthFn(rate, rate),
          totalPerProgressComplete: (totalPerProgressComplete * 1.1),
          xpAmount: xpAmount * 1.1
        }
      }
    }
  }
}