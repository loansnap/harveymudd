import React, { useMemo, useContext } from 'react'
import _ from 'lodash'
import md5 from 'blueimp-md5'
import { UserIdentifierContext, useTestGroupIdentifier, getNarrowTestGroupNumber } from 'utils/identifier'

export const DEFAULT_FEATURE_FLAGS = {
  'WELCOME_TITLE': {
    enabled: true,
    strValue: 'Time to get smarter!',
    // strValues: [
    //   {value: 'Hello and welcome to the App!!!', weight: 5},
    //   {value: 'Hey! How are you today?', weight: 5},
    //   {value: 'You\'re looking good! :D', weight: 1},
    // ]
  },



  'BRAND_COLOR': {
    enabled: true,
    percentageRollout: 25,
    strValue: 'dodgerblue',
  },



  'SHOW_POINTLESS_BUTTON': {
    enabled: true,
    percentageRollout: 25,
  },



  'MAIN_BUTTON_FONT_SIZE': {
    enabled: false,
    strValues: [
      {value: '1em', weight: 1},
      {value: '1.5em', weight: 1},
      {value: '2em', weight: 1},
      {value: '2.5em', weight: 1},
      {value: '3em', weight: 1},
    ]
  },
}

function getFlagRandomGroupNumber(identifier, flagName) {
  const testGroupNumber = getNarrowTestGroupNumber(identifier)
  const flagHash = md5(flagName).slice(0,4)
  return testGroupNumber + parseInt(flagHash, 16)
}

function isFeatureFlagged(featureFlags, identifier, flagName) {
  const flag = featureFlags[flagName]
  if (!flag || !flag.enabled) {
    return false
  }
  if (flag.percentageRollout) {
    return getFlagRandomGroupNumber(identifier, flagName) % 100 < flag.percentageRollout
  } else {
    return true
  }
}

function getFlagStrValue(featureFlags, identifier, flagName) {
  const flag = featureFlags[flagName]
  if (!isFeatureFlagged(featureFlags, identifier, flagName)) {
    return null
  }
  if (flag.strValues) {
    // strValuesMap is a weight ed map to identify strValue. for weights 3,2,3 looks like "00011222"
    const strValuesMap = _.map(flag.strValues, ({value, weight=1}, idx) => _.repeat(idx, weight)).join('')
    const mapIdx = getFlagRandomGroupNumber(identifier, flagName) % strValuesMap.length
    const strValueIdx = strValuesMap[mapIdx]
    return flag.strValues[strValueIdx].value
  } else {
    return flag.strValue
  }
}

export function getActiveFeatureFlags(featureFlags, identifier) {
  return _(featureFlags)
    .mapValues((flag, flagName) => {
      return {
        enabled: isFeatureFlagged(featureFlags, identifier, flagName),
        strValue: getFlagStrValue(featureFlags, identifier, flagName),
      }
    })
    .pickBy('enabled')
    .value()
}

export class FeatureFlagged extends React.Component {
  renderWithIdentifier(identifier) {
    const {flag, children} = this.props
    const enabled = isFeatureFlagged(flag, identifier)

    if (enabled) {
      return children
    } else {
      return null
    }
  }

  render() {
    return (
      <UserIdentifierContext.Consumer>
        {this.renderWithIdentifier}
      </UserIdentifierContext.Consumer>
    )
  }
}


// React hooks
export const FeatureFlagsContext = React.createContext([])

export function useAllFeatureFlags() {
  const featureFlags = useContext(FeatureFlagsContext)
  return featureFlags
}

export function useFeatureFlag(flagName) {
  const featureFlags = useAllFeatureFlags()
  const identifier = useTestGroupIdentifier()
  return isFeatureFlagged(featureFlags, identifier, flagName)
}

export function useFeatureFlags(flagNames) {
  const featureFlags = useAllFeatureFlags()
  const memoFlags = useMemo(() => _.map(flagNames, (flagName) => isFeatureFlagged(featureFlags, identifier, flagName)), flagNames)
  return memoFlags
}

export function useFeatureFlagValue(flagName) {
  const identifier = useTestGroupIdentifier()
  const featureFlags = useAllFeatureFlags()
  return getFlagStrValue(featureFlags, identifier, flagName)
}

export function useFeatureFlagsValues(flagNames) {
  const identifier = useTestGroupIdentifier()
  const featureFlags = useAllFeatureFlags()
  return _.map(flagNames, (flag) => getFlagStrValue(featureFlags, identifier, flag))
}
