const {
  APP_ENV = 'dev',
  API_HOSTNAME = 'localhost:3000',
  API_URL = `http://${API_HOSTNAME}/api`,
  API_WS_URL = `ws://${API_HOSTNAME}`,
} = process.env

const publicRuntimeConfig = {
  API_HOSTNAME: API_HOSTNAME,
  API_URL: API_URL,
  API_WS_URL: API_WS_URL,
  APP_ENV: APP_ENV,
}

module.exports = {
  publicRuntimeConfig: publicRuntimeConfig,
  serverRuntimeConfig: publicRuntimeConfig,
}
