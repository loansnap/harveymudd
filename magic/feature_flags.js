import React, { useMemo, useContext } from 'react'
import _ from 'lodash'
import md5 from 'blueimp-md5'
import { UserIdentifierContext } from 'utils/identifier'

const FEATURE_FLAGS = {
  'WELCOME_TITLE': {
    enabled: false,
    strValue: 'Time to get smarter!',
    // strValues: [
    //   {value: 'Hello and welcome to the App!!!', weight: 5},
    //   {value: 'Hey! How are you today?', weight: 5},
    //   {value: 'You\'re looking good! :D', weight: 1},
    // ]
  },



  'BRAND_COLOR': {
    enabled: false,
    percentageRollout: 25,
    strValue: 'dodgerblue',
  },



  'SHOW_POINTLESS_BUTTON': {
    enabled: false,
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
  const flagHash = md5(flagName).slice(0,4)
  return parseInt(identifier) + parseInt(flagHash, 16)
}

function isFeatureFlagged(identifier, flagName) {
  const flag = FEATURE_FLAGS[flagName]
  if (!flag || !flag.enabled) {
    return false
  }
  if (flag.percentageRollout) {
    return getFlagRandomGroupNumber(identifier, flagName) % 100 < flag.percentageRollout
  } else {
    return flag.enabled
  }
}

function getFlagStrValue(identifier, flagName) {
  const flag = FEATURE_FLAGS[flagName]
  if (!isFeatureFlagged(identifier, flagName)) {
    return null
  }
  if (flag.strValues) {
    // strValuesMap is a weight ed map to identify strValue. for weights 3,2,3 looks like "00011222"
    const strValuesMap = _.map(flag.strValues, ({value, weight}, idx) => _.repeat(idx, weight)).join('')
    const mapIdx = getFlagRandomGroupNumber(identifier, flagName) % strValuesMap.length
    const strValueIdx = strValuesMap[mapIdx]
    return flag.strValues[strValueIdx].value
  } else {
    return flag.strValue
  }
}

function getFeatureFlags(identifier) {
  return _(FEATURE_FLAGS)
    .pickBy('enabled')
    .mapValues((value, flagName) => {
      return {
        enabled: isFeatureFlagged(identifier, flagName),
        strValue: getFlagStrValue(identifier, flagName),
      }
    })
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

export function WithFeatureFlagValue({flag, children}) {
  const identifier = useContext(UserIdentifierContext)
  const flagValue = getFlagStrValue(identifier, flag)
  const renderFunc = children

  return renderFunc(flagValue)
}

export function WithFeatureFlagsValues({flags, children}) {
  const identifier = useContext(UserIdentifierContext)
  const flagValues = _.map(flags, flag => getFlagStrValue(identifier, flag))
  const renderFunc = children

  return renderFunc(flagValues)
}

export function useFeatureFlag(flagName) {
  const identifier = useContext(UserIdentifierContext)
  return isFeatureFlagged(identifier, flagName)
}

export function useFeatureFlags(flagNames) {
  const identifier = useContext(UserIdentifierContext)
  return _.map(flagNames, (flag) => isFeatureFlagged(identifier, flag))
}

export function useFeatureFlagValue(flagName) {
  const identifier = useContext(UserIdentifierContext)
  return getFlagStrValue(identifier, flagName)
}

export function useFeatureFlagsValues(flagNames) {
  const identifier = useContext(UserIdentifierContext)
  return _.map(flagNames, (flag) => getFlagStrValue(identifier, flag))
}

export function WithFeatureFlags({flag, children}) {
  const identifier = useContext(UserIdentifierContext)
  const featureFlags = getFeatureFlags(identifier)
  const renderFunc = children

  return renderFunc(featureFlags)
}

export function useAllFeatureFlags() {
  const identifier = useContext(UserIdentifierContext)
  const memoFeatureFlags = useMemo(() => getFeatureFlags(identifier), [identifier])
  return memoFeatureFlags
}
