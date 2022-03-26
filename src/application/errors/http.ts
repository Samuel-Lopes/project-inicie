export class ServerError extends Error {
  constructor (error?: Error) {
    super('Server failed. Try again soon')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class UnauthorizedError extends Error {
  constructor () {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

export class TooManyRequestsError extends Error {
  constructor () {
    super('ToManyRequests')
    this.name = 'TooManyRequestsError'
  }
}
