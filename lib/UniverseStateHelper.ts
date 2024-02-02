import { Dispatch, SetStateAction } from "react"
import { IncrementalTypes, StateWrapper, ThingValue, UniverseState } from "./providers/UniverseStateProvider"
import { ThingConfig, configuration } from "./config"

export default class UniverseStateHelper {
  universeState: UniverseState
  setUniverseState: Dispatch<SetStateAction<UniverseState>>

  constructor(state: StateWrapper) {
    this.universeState = state.universeState
    this.setUniverseState = state.setUniverseState
  }

  performTick(): UniverseState {
    let xpIncrement = 0

    const increment = (config: ThingConfig, thingValue: ThingValue): ThingValue => {
      const { xpAmount, rate } = config
      const { total, progress, automated } = thingValue

      if (!automated) {
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
        total: newTotal
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
          ? (nextAmount * Math.pow(configuration.experience.growthFactor, newNextLevel -1 ))
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
      electron: increment(configuration.things.electron, this.universeState.things.electron),
    }

    // 2.
    const experience = incrementXp()

    const newState: UniverseState = {
      ...this.universeState,
      things,
      darkEnergy: this.universeState.darkEnergy + xpIncrement,
      experience
    }

    return newState
  }

  incrementThing(type: IncrementalTypes): ThingValue {
    const config = configuration.things[type]
    const thingValue = this.universeState.things[type]
    const { rate } = config
    const { total } = thingValue

    return {
      ...thingValue,
      total: total + 1
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
        ? (nextAmount * Math.pow(configuration.experience.growthFactor, newNextLevel -1 ))
        : nextLevel,
      level: newNextLevel
    }
  }

  increment(type: IncrementalTypes): UniverseState {
    const newThingValue = this.incrementThing(type)
    const newExperience = this.incrementXp(type)

    return {
      ...this.universeState,
      things: {
        ...this.universeState.things,
        [type]: newThingValue
      },
      experience: newExperience
    }
  }
}