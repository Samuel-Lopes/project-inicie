import { Post } from '@/domain/entities'
import { InvalidApiTokenError, ManyRequestsError } from '@/domain/errors'
import { Either } from '@/shared/either'

export interface IPublishPost {
  publish: (input: IPublishPost.Input) => Promise<IPublishPost.Output>
}

export namespace IPublishPost {
  export type Input = Omit<Post, 'id'> & { apiToken: string }
  export type Output = Either<ManyRequestsError | InvalidApiTokenError, Post>
}
