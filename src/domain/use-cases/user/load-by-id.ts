import { ILoadUserById } from '@/domain/contracts/user'
import { User } from '@/domain/entities'

type Setup = (userRepo: ILoadUserById) => LoadUserById
type Input = { id: number, apiToken: string }
type Output = User | undefined
export type LoadUserById = (input: Input) => Promise<Output>

export const setupLoadUserById: Setup = (userRepo) => async input => {
  return await userRepo.loadById(input)
}
