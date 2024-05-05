const debug = require('logzio-node-debug').debug(`tag-manager:${require('path').basename(__filename)}`)

const logzPrefix = process.env.LOGZIO_LOG_PREFIX || 'dev'

const env = {
  LOGZIO_ACCESS_TOKEN: process.env.LOGZIO_ACCESS_TOKEN || null,
  LOGZIO_LOG_TYPE: logzPrefix + '-tag-manager',
  PORT: process.env.PORT || 8080,
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:8080',
}

debug('DEBUG:', process.env.DEBUG)
debug('PORT:', env.PORT)
debug('SERVER_URL:', env.SERVER_URL)

module.exports = env
