export class ExistingUserError extends Error {
  constructor (email: string) {
    super(`Existing user with email: ${email}`)
    this.name = 'ExistingUserError'
  }
}
