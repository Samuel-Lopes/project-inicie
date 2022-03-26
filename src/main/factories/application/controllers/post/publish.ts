import { Controller } from '@/application/contracts'
import { PublishPostController } from '@/application/controllers/post'
import { makePublishPost } from '@/main/factories/domain/use-cases/post'

export const makePublishPostController = (): Controller => {
  return new PublishPostController(makePublishPost())
}
