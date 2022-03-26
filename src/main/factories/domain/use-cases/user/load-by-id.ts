import { LoadUserById, setupLoadUserById } from '@/domain/use-cases/user'
import { makeAxiosUserRepository } from '@/main/factories/external/axios'

export const makeLoadUserById = (): LoadUserById => {
  return setupLoadUserById(makeAxiosUserRepository())
}
