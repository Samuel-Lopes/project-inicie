import { InvalidApiTokenError, ManyRequestsError } from '@/domain/errors'
import { Either } from '@/shared/either'

export interface IDeleteComment {
  delete: (input: IDeleteComment.Input) => Promise<IDeleteComment.Output>
}

export namespace IDeleteComment {
  export type Input = { id: number, apiToken: string }
  export type Output = Either<InvalidApiTokenError | ManyRequestsError, boolean>
}
