export class NotExistingCommentError extends Error {
  constructor (id: number) {
    super(`Comment with id ${id} does not exist`)
    this.name = 'NotExistingCommentError'
  }
}
