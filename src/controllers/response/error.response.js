const moment = require('moment')

class ErrorResponse {

  create(statusCode, errorDetail) {
    return {
      timestamp: moment().toISOString(),
      status: {
        code: statusCode
      },
      errors: [
        errorDetail
      ]
    }
  }
}

module.exports = new ErrorResponse()
