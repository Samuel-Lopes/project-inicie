import { AxiosPostRepository } from '@/external/axios'

export const makeAxiosPostRepository = (): AxiosPostRepository => {
  return new AxiosPostRepository()
}
