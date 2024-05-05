class GeneralError extends Error {

  constructor(message) {
    super(message)
  }

  toObject() {
    return {
      message: this.message
    }
  }
}

module.exports = GeneralError
