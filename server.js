import _ from 'lodash'
import next from 'next'
import cookie from 'cookie'
import express from 'express'
import expressWs from 'express-ws'
import bodyParser from 'body-parser'
import 'isomorphic-fetch'
import { DEFAULT_FEATURE_FLAGS, getActiveFeatureFlags } from './magic/feature_flags'

const logResponseOnFinish = (req, res) => {
  res.on('finish', () => {
    console.log('Response:', res.statusCode, 'Request:', req.method, req.url)
  })
}

const {
  APP_PORT = 3000,
  APP_ENV = 'dev',
} = process.env


const NextApp = next({dev: APP_ENV !== 'production'})
const serverApp = express();
expressWs(serverApp)

let featureFlags = _.cloneDeep(DEFAULT_FEATURE_FLAGS)
let metricEvents = []
let activeConnections = []

NextApp.prepare().then(() => {
  serverApp.use("/static", express.static(__dirname + "/static", {
    maxAge: "30d"
  }))
  serverApp.use(bodyParser.json())
  serverApp.use(bodyParser.urlencoded())
  serverApp.use((req, res, next) => {
    res.json = (jsonPayload) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200)
      res.send(JSON.stringify(jsonPayload))
    }
    next()
  })

  serverApp.post('/api/metric', (req, res) => {
    console.log(req.method, req.url)
    metricEvents.push({...req.body, timestamp: Date.now()})
    res.sendStatus(201)
    res.end()
  })

  serverApp.get('/api/metric', (req, res) => {
    console.log(req.method, req.url, req.query)
    let { limit = 1000, startIndex = 0, identifier, eventName } = req.query
    startIndex = _.clamp(startIndex, 0, 10000)
    limit = _.clamp(limit, 1, 1000)

    let responsePayload = metricEvents.slice(startIndex, limit)
    const filters = _.pickBy({identifier, eventName})
    if (!_.isEmpty(filters)) {
      responsePayload = _.filter(responsePayload, filters)
    }

    res.send(JSON.stringify(responsePayload))
    res.status(200)
    res.end()
  })

  serverApp.get('/api/feature-flags', (req, res) => {
    console.log(req.method, req.url, req.query)
    const identifier = cookie.parse(req.headers.cookie || '').identifier
    const flags = getActiveFeatureFlags(featureFlags, identifier)
    res.send(JSON.stringify(flags))
    res.status(200)
    res.end()
  })

  serverApp.get('/api/all-feature-flags', (req, res) => {
    console.log(req.method, req.url, req.query)
    res.send(JSON.stringify(featureFlags))
    res.status(200)
    res.end()
  })

  serverApp.post('/api/feature-flags', (req, res) => {
    console.log(req.method, req.url, req.query)
    _.merge(featureFlags, req.body)
    activeConnections.forEach(({ ws, identifier }) => {
      const msg = {
        type: 'feature_flags_updated',
        body: getActiveFeatureFlags(featureFlags, identifier)
      }
      ws.send(JSON.stringify(msg))
    })
    res.status(204)
    res.end()
  })

  serverApp.ws('/', (ws, req) => {
    const identifier = cookie.parse(req.headers.cookie || '').identifier
    const connection = {
      ws,
      identifier,
    }
    activeConnections.push(connection)
    console.log('connection established. total connections:', activeConnections.length)
    ws.on('close', () => {
      activeConnections = _.without(activeConnections, connection)
      console.log('connection closed. total connections:', activeConnections.length)
    })
  })

  serverApp.use((req, res) => {
    // Actual routing for next.js NextApp
    NextApp.render(req, res, req.url)
  })

  const server = serverApp.listen(APP_PORT, () => {
    const port = server.address().port
    const localAppLink = `http://localhost:${port}`
    console.log(`listening on port ${port}`);
    if (APP_ENV === 'local_development') {
      console.log(`\nClick the link to open the app\n -- ${localAppLink} -- \n`);
    }
  })
})
