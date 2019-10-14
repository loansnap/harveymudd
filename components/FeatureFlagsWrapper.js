import React from 'react'
import { ensureIdentifier, getIdentifier, UserIdentifierContext, subscribeOnIdentifierUpdate } from 'utils/identifier'

const FeatureFlagsWrapper = (ComposedComponent) => {
  return class FeatureFlagsWrapper extends React.Component {
    static async getInitialProps (ctx) {
      let identifier
      if (ctx && ctx.req) {
        identifier = ensureIdentifier(ctx.req, ctx.res)
      } else if (process.browser) {
        identifier = getIdentifier(document.cookie || '')
      }
      let composedProps = {}
      if (ComposedComponent.getInitialProps) {
        composedProps = await ComposedComponent.getInitialProps(ctx)
      }
      return {
        ...composedProps,
        identifier
      }
    }

    render() {
      const {identifier, ...props} = this.props
      return (
        <UserIdentifierContext.Provider value={identifier}>
          <ComposedComponent {...props}/>
        </UserIdentifierContext.Provider>
      )
    }
  }
}

export default FeatureFlagsWrapper
