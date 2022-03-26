import { LoadPost, setupLoadPost } from '@/domain/use-cases/post'
import { makeAxiosPostRepository } from '@/main/factories/external/axios'

export const makeLoadPost = (): LoadPost => {
  return setupLoadPost(makeAxiosPostRepository())
}
