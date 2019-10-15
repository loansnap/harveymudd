import React from 'react'
import { ensureIdentifier, getIdentifier, UserIdentifierContext, subscribeOnIdentifierUpdate } from 'utils/identifier'
import { sleep } from 'utils/helpers'
import { FeatureFlagsContext } from 'magic/feature_flags'
import config from 'config'

const FeatureFlagsWrapper = (ComposedComponent) => {
  return class FeatureFlagsWrapper extends React.Component {
    static async getInitialProps (ctx) {
      let identifier
      if (ctx && ctx.req) {
        identifier = ensureIdentifier(ctx.req, ctx.res)
      } else if (process.browser) {
        identifier = getIdentifier(document.cookie || '')
      }
      let featureFlags = []

      try {
        featureFlags = await fetch(
          `${config.API_URL}/feature-flags`,
          {
            headers: {
              'Cookie': ctx && ctx.req ? ctx.req.headers.cookie : document.cookie
            }
          }
        ).then(res => res.json())
      } catch (err) {
        console.error(err)
      }
      let composedProps = {}
      if (ComposedComponent.getInitialProps) {
        composedProps = await ComposedComponent.getInitialProps(ctx)
      }
      return {
        ...composedProps,
        identifier,
        featureFlags,
      }
    }

    websocket = null
    state = {
      featureFlags: [],
    }

    componentWillMount() {
      this.state.featureFlags = this.props.featureFlags || []
    }

    componentDidMount() {
      this.establishWebsocketConnection()
    }

    configureWebsocket = (ws) => {
      ws.addEventListener('message', (msg) => {
        const message = JSON.parse(msg.data)
        this.handleWebsocketMessage(message)
      })
    }

    handleWebsocketMessage = (message) => {
      switch (message.type) {
        case 'feature_flags_updated':
          console.log('Received new feature flags:', message.body)
          this.setState({featureFlags: message.body})
          break
        default:
          break
      }
    }

    establishWebsocketConnection = () => {
      try {
        this.websocket = new WebSocket(config.API_WS_URL)
        this.configureWebsocket(this.websocket)
        this.websocket.addEventListener('close', () => {
          this.websocket = null
          this.reconnectWebsocket()
        })
        return this.websocket
      } catch (err) {
        console.error(err)
        return null
      }
    }

    reconnectWebsocket = async (attempt = 0) => {
      const baseDelay = 5000
      const delayIncrease = 3000
      sleep(baseDelay + delayIncrease * attempt)
      const ws = this.establishWebsocketConnection()
      if (!ws) {
        if (attempt < 10) {
          console.error('Failed reconnecting to websocket on attempt ' + (attempt + 1))
          this.reconnectWebsocket(attempt + 1)
        } else {
          console.error('Failed reconnecting to websocket')
        }
      }
    }

    render() {
      const {identifier, ...props} = this.props
      const {featureFlags} = this.state
      return (
        <UserIdentifierContext.Provider value={identifier}>
          <FeatureFlagsContext.Provider value={featureFlags}>
            <ComposedComponent {...props}/>
          </FeatureFlagsContext.Provider>
        </UserIdentifierContext.Provider>
      )
    }
  }
}

export default FeatureFlagsWrapper
