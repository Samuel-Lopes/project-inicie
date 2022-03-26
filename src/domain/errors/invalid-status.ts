export class InvalidStatusError extends Error {
  constructor (status: string) {
    super(`Invalid status: '${status}'`)
    this.name = 'InvalidStatusError'
  }
}
