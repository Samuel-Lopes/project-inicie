export class NotExistingUserError extends Error {
  constructor (id: number) {
    super(`User with id ${id} does not exist`)
    this.name = 'NotExistingUserError'
  }
}
