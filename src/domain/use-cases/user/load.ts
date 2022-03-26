import { ILoadUser } from '@/domain/contracts/user'
import { User } from '@/domain/entities'

type Setup = (userRepo: ILoadUser) => LoadUser
type Input = ILoadUser.Input
type Output = User[] | undefined
export type LoadUser = (input: Input) => Promise<Output>

export const seutpLoadUser: Setup = (userRepo) => async input => {
  const users = await userRepo.load(input)
  return users.length > 0 ? users : undefined
}
