import { IPublishPost } from '@/domain/contracts/post'
import { ILoadUserById } from '@/domain/contracts/user'
import { Post } from '@/domain/entities'
import { InvalidApiTokenError, ManyRequestsError, NotExistingUserError } from '@/domain/errors'
import { Either, left, right } from '@/shared/either'

type Setup = (postRepo: IPublishPost, userRepo: ILoadUserById) => PublishPost
type Input = Omit<Post, 'id'> & { apiToken: string }
type Output = Either<NotExistingUserError | ManyRequestsError | InvalidApiTokenError, Post>
export type PublishPost = (input: Input) => Promise<Output>

export const setupPublishPost: Setup = (postRepo, userRepo) => async input => {
  const user = await userRepo.loadById({ id: input.userId, apiToken: input.apiToken })
  if (user === undefined) return left(new NotExistingUserError(input.userId))
  const postOrError = await postRepo.publish(input)
  return postOrError.isLeft() ? left(postOrError.value) : right(postOrError.value)
}
