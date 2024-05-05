if (!process.env.DEBUG) {
  process.env.DEBUG = 'tag-manager:*'
}

const { LOGZIO_ACCESS_TOKEN, LOGZIO_LOG_TYPE } = require('../config/env')

if (LOGZIO_ACCESS_TOKEN) {
  const logzOptions = {
    token: LOGZIO_ACCESS_TOKEN, type: LOGZIO_LOG_TYPE, protocol: 'https', addTimestampWithNanoSecs: true
  }
  require('logzio-node-debug').init(logzOptions)
}
