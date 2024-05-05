const {is} = require('ramda')
const moment = require('moment')
const GeneralError = require('./error/general.error')

// Moment uses a bad naming "deprecation" that would spam our logs with a warning that tells you a "value can't be parsed".
moment.suppressDeprecationWarnings = true

module.exports = {
  checkIsDefined: function (value, name) {
    if (!value) throw new GeneralError(`${name} must be defined. It was ${value}.`)
  },

  checkIsBoolean(value, name) {
    _checkIsType(value, Boolean, name)
  },

  checkIsArray: function (value, name) {
    _checkIsType(value, Array, name)
  },

  checkIsMoment: (value, name) => {
    if (moment.isMoment(value)) return

    throw new GeneralError(`${name} must be instance of Moment. Actual value: ${value}`)
  },

  checkIsObject: function (value, name) {
    _checkIsType(value, Object, name)
    if (is(Array, value)) { // In JS, ([] instanceof Object) is true. For this reason, we have to do this extra check.
      throw new GeneralError(`${name} must be of type ${Object.name}. It was ${JSON.stringify(value)}.`)
    }
  },

  checkIsNumber: function (value, name) {
    _checkIsType(value, Number, name)
  },

  checkIsString: _checkIsString,

  checkIsType: _checkIsType,

  checkRegex: function (value, regex, name) {
    _checkIsString(value, name)

    if (!regex.test(value)) {
      throw new GeneralError(`${name} with value ${JSON.stringify(value)} not found in regex ${regex}.`)
    }
  },

  checkIsRegex: function (value, name) {
    _checkIsString(value, name)

    try {
      RegExp(value)
    } catch {
      throw new GeneralError(`${name} with value ${value} is not a valid regular expression.`)
    }
  },

  checkIsEnum: function (value, enums, name) {
    if (!enums.includes(value)) {
      throw new GeneralError(`${name} with value ${JSON.stringify(value)} not found in [${enums}].`)
    }
  },

  equals: function (valueA, valueB, name) {
    if (valueA !== valueB) {
      throw new GeneralError(`${name} doesn't with value ${valueA} does not equal ${valueB}.`)
    }
  }
}

function _checkIsString(value, name) {
  _checkIsType(value, String, name)
}

function _checkIsType(value, type, name) {
  if (!is(type, value)) throw new GeneralError(`${name} must be of type ${type.name}. It was ${JSON.stringify(value)}.`)
}
