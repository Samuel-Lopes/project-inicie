import { Controller } from '@/application/contracts'
import { LoadPostController } from '@/application/controllers/post'
import { makeLoadPost } from '@/main/factories/domain/use-cases/post'

export const makeLoadPostController = (): Controller => {
  return new LoadPostController(makeLoadPost())
}
