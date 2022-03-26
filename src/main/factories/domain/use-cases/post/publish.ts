import { PublishPost, setupPublishPost } from '@/domain/use-cases/post'
import { makeAxiosPostRepository, makeAxiosUserRepository } from '@/main/factories/external/axios'

export const makePublishPost = (): PublishPost => {
  return setupPublishPost(makeAxiosPostRepository(), makeAxiosUserRepository())
}
