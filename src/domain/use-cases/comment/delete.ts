import { IDeleteComment, ILoadCommentById } from '@/domain/contracts/comment'
import { InvalidApiTokenError, ManyRequestsError, NotExistingCommentError } from '@/domain/errors'
import { Either, left, right } from '@/shared/either'

type Setup = (commentRepo: IDeleteComment & ILoadCommentById) => DeleteComment
type Input = { id: number, apiToken: string }
type Output = Either<NotExistingCommentError | InvalidApiTokenError | ManyRequestsError, boolean>
export type DeleteComment = (input: Input) => Promise<Output>

export const setupDeleteComment: Setup = (commentRepo) => async input => {
  const comment = await commentRepo.loadById(input)
  if (comment === undefined) return left(new NotExistingCommentError(input.id))
  const isDeletedOrError = await commentRepo.delete(input)
  return isDeletedOrError.isLeft() ? left(isDeletedOrError.value) : right(isDeletedOrError.value)
}
