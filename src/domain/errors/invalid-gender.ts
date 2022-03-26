export class InvalidGenderError extends Error {
  constructor (gender: string) {
    super(`Invalid gender: '${gender}'`)
    this.name = 'InvalidGenderError'
  }
}
