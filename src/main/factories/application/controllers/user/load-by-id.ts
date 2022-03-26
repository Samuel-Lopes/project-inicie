import { Controller } from '@/application/contracts'
import { LoadUserByIdController } from '@/application/controllers/user'
import { makeLoadUserById } from '@/main/factories/domain/use-cases/user'

export const makeLoadUserByIdController = (): Controller => {
  return new LoadUserByIdController(makeLoadUserById())
}
