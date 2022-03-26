import { IAddComment } from '@/domain/contracts/comment'
import { ILoadPostById } from '@/domain/contracts/post'
import { Comment } from '@/domain/entities'
import { InvalidApiTokenError, ManyRequestsError, NotExistingPostError } from '@/domain/errors'
import { Either, left, right } from '@/shared/either'

type Setup = (commentRepo: IAddComment, postRepo: ILoadPostById) => AddComment
type Input = Omit<Comment, 'id'> & { apiToken: string }
type Output = Either<InvalidApiTokenError | ManyRequestsError | NotExistingPostError, Comment>
export type AddComment = (input: Input) => Promise<Output>

export const setupAddComment: Setup = (commentRepo, postRepo) => async input => {
  const post = await postRepo.loadById({ id: input.postId, apiToken: input.apiToken })
  if (post === undefined) return left(new NotExistingPostError(input.postId))
  const commentOrError = await commentRepo.add(input)
  return commentOrError.isLeft() ? left(commentOrError.value) : right(commentOrError.value)
}
