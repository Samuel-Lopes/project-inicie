export class NotExistingPostError extends Error {
  constructor (id: number) {
    super(`Post with id ${id} does not exist`)
    this.name = 'NotExistingPostError'
  }
}
