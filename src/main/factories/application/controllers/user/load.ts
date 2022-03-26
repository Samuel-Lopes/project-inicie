import { Controller } from '@/application/contracts'
import { LoadUserController } from '@/application/controllers/user'
import { makeLoadUser } from '@/main/factories/domain/use-cases/user'

export const makeLoadUserController = (): Controller => {
  return new LoadUserController(makeLoadUser())
}
