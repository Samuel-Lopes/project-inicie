import { Comment } from '@/domain/entities'
import { InvalidApiTokenError, ManyRequestsError } from '@/domain/errors'
import { Either } from '@/shared/either'

export interface IAddComment {
  add: (input: IAddComment.Input) => Promise<IAddComment.Output>
}

export namespace IAddComment {
  export type Input = Omit<Comment, 'id'> & { apiToken: string }
  export type Output = Either<InvalidApiTokenError | ManyRequestsError, Comment>
}
