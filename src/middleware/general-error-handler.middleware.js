const debug = require('logzio-node-debug').debug(`tag-manager:${require('path').basename(__filename)}`)
const error = require('logzio-node-debug').debug(`tag-manager:${require('path').basename(__filename)}:error`)
const json = require('circular-json')
const ApiError = require('../utils/error/api.error')
const GeneralError = require('../utils/error/general.error')
const UniqueConstraintDbError = require('../utils/error/unique-constraint-db.error')
const errorResponse = require('../controllers/response/error.response')

// noinspection JSUnusedLocalSymbols - `next` must be there.
// Otherwise, this middleware is not detected as the ERROR HANDLER MIDDLEWARE
module.exports = (err, req, res, next) => {

  if (err instanceof ApiError) {
    debug('api error:', err)
    res.status(err.status).json(errorResponse.create(err.status, err.toObject()))
    return
  }

  if (err instanceof UniqueConstraintDbError) {
    debug('unique constraint db error:', err)
    res.status(409).json(errorResponse.create(409, err.toObject()))
    return
  }

  // `instanceof` cannot be used as Joi does not expose ValidationError.
  if (err.name === 'ValidationError') {
    debug(`JoiValidationError message: ${err.message}`)
    res.status(422).json(errorResponse.create(422, err.details[0]))
    return
  }

  if (err instanceof GeneralError) {
    debug('general error:', err)
    res.status(422).json(errorResponse.create(422, err.toObject()))
    return
  }

  res.status(err.status || 500)

  if (err.response) {
    error(JSON.stringify(err.response.data, null, 2))
    res.json(`error - Status ${err.response.status} - ${JSON.stringify(err.response.data, null, 2)}`)
    return
  }

  if (err.message === 'Not allowed by CORS') {
    debug('CORS error:', err)
  } else {
    error('Unknown error type: ', err)
  }

  const errorObject = resolveErrorObject(err)
  res.status(500).json(errorResponse.create(500, errorObject))
}

function resolveErrorObject(e) {
  if (e.response && e.response.data && e.response.data.errors) {
    return { message: json.stringify(e.response.data.errors[0]) }
  }

  return { message: 'Something went wrong.' }
}
