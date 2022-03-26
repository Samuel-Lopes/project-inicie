import { LoadUser, seutpLoadUser } from '@/domain/use-cases/user'
import { makeAxiosUserRepository } from '@/main/factories/external/axios'

export const makeLoadUser = (): LoadUser => {
  return seutpLoadUser(makeAxiosUserRepository())
}
