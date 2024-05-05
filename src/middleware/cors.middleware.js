const cors = require('cors')

const corsWhitelist = []

function checkAllowedOrigin(origin) {
  if (!origin) return true
  if (origin.startsWith('http://localhost')) return true

  return corsWhitelist.includes(origin)
}

const corsOptions = {
  origin: function (origin, callback) {
    if (checkAllowedOrigin(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,
  exposedHeaders: ['x-total-count', 'X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset']
}

module.exports = cors(corsOptions)
