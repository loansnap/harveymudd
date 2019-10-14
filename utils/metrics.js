import React, { useMemo, useCallback, useContext } from 'react'
import { useAllFeatureFlags } from 'magic/feature_flags'
import { useIdentifier } from './identifier'

export function trackEvent(eventName, eventAttrs, identifier, featureFlags) {
  fetch(`${window.location.origin}/api/metric`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...eventAttrs,
      eventName,
      identifier,
      featureFlags,
    })
  })
}

export function useDefaultTrackAttributes() {
  const identifier = useIdentifier()
  const featureFlags = useAllFeatureFlags()
  const memoAttrs = useMemo(() => ({
    identifier,
    featureFlags,
  }), [identifier, featureFlags])
  return memoAttrs
}

export function useTrackEvent() {
  const { identifier, featureFlags } = useDefaultTrackAttributes()
  const trackHandler = useCallback(
    (eventName, eventAttrs) => {
      trackEvent(eventName, eventAttrs, identifier, featureFlags)
    },
    [identifier, featureFlags],
  )
  return trackHandler
}
