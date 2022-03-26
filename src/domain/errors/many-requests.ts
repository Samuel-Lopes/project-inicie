export class ManyRequestsError extends Error {
  constructor () {
    super('Too many requests, try again later')
    this.name = 'ManyRequestsError'
  }
}
