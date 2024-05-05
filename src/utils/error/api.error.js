class ApiError extends Error {

  constructor(message, status) {
    super(message)
    this.status = status
  }

  toObject() {
    return {
      message: this.message
    }
  }
}

module.exports = ApiError
