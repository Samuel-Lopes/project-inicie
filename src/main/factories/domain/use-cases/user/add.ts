import { AddUser, setupAddUser } from '@/domain/use-cases/user'
import { makeAxiosUserRepository } from '@/main/factories/external/axios'

export const makeAddUser = (): AddUser => {
  return setupAddUser(makeAxiosUserRepository())
}
