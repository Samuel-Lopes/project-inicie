export class InvalidApiTokenError extends Error {
  constructor (apiToken: string) {
    super(`Invalid api token: '${apiToken}'`)
    this.name = 'InvalidApiTokenError'
  }
}
