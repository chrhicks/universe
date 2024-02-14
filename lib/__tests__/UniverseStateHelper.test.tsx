import '@testing-library/jest-dom'
import UniverseStateHelper from '@/lib/UniverseStateHelper'
import { configuration } from '@/lib/config'
import { UniverseState } from '@/lib/types'

const defaultUniverseState: UniverseState = {
  darkEnergy: 0,
  experience: {
    amount: 1,
    nextLevel: configuration.experience.initialRequirement,
    points: 0,
    totalPoints: 0,
    theNumber: 1
  },
  appliedUpgrades: [],
  things: {
    upQuark: {
      thingType: 'upQuark',
      total: 0,
      progress: 0,
      totalPerProgressComplete: 1,
      pointsForNext: 1,
      rate: configuration.things['upQuark'].rate,
      xpAmount: configuration.things['upQuark'].xpAmount,
      automated: false
    },
    downQuark: {
      thingType: 'downQuark',
      total: 0,
      progress: 0,
      totalPerProgressComplete: 1,
      pointsForNext: 1,
      rate: configuration.things['downQuark'].rate,
      xpAmount: configuration.things['downQuark'].xpAmount,
      automated: false
    },
    proton: {
      thingType: 'proton',
      total: 0,
      progress: 0,
      totalPerProgressComplete: 1,
      pointsForNext: 1,
      rate: configuration.things['proton'].rate,
      xpAmount: configuration.things['proton'].xpAmount,
      automated: false
    },
    neutron: {
      thingType: 'neutron',
      total: 0,
      progress: 0,
      totalPerProgressComplete: 1,
      pointsForNext: 1,
      rate: configuration.things['neutron'].rate,
      xpAmount: configuration.things['neutron'].xpAmount,
      automated: false
    },
    electron: {
      thingType: 'electron',
      total: 0,
      progress: 0,
      totalPerProgressComplete: 1,
      pointsForNext: 1,
      rate: configuration.things['electron'].rate,
      xpAmount: configuration.things['electron'].xpAmount,
      automated: false
    }
  }
}

describe('UniverseStateHelper', () => {
  it('increments XP predictably', () => {
    const helper = new UniverseStateHelper({ universeState: defaultUniverseState, setUniverseState: () => {} })
    const state1 =  helper.performTick()
    const helper2 = new UniverseStateHelper({ universeState: state1, setUniverseState: () => {} })
    const newState = helper2.increment('upQuark')

    expect(newState).toMatchObject({
      ...defaultUniverseState,
      darkEnergy: 0,
      things: {
        ...defaultUniverseState.things,
        'upQuark': {
          total: 1,
          progress: 10,
          pointsForNext: 1,
          rate: 10,
          xpAmount: 5,
          automated: false
        }
      }
    })
  })
})