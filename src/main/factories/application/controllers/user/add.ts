import { Controller } from '@/application/contracts'
import { AddUserController } from '@/application/controllers/user'
import { makeAddUser } from '@/main/factories/domain/use-cases/user'

export const makeAddUserController = (): Controller => {
  return new AddUserController(makeAddUser())
}
