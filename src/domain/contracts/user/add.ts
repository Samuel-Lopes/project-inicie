import { User } from '@/domain/entities'
import { InvalidApiTokenError, ManyRequestsError } from '@/domain/errors'
import { Either } from '@/shared/either'

export interface IAddUserRepository {
  add: (input: IAddUserRepository.Input) => Promise<IAddUserRepository.Output>
}

export namespace IAddUserRepository {
  export type Input = Omit<User, 'id'> &{ apiToken: string }
  export type Output = Either<ManyRequestsError | InvalidApiTokenError, User>
}
