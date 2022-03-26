import { AxiosUserRepository } from '@/external/axios'

export const makeAxiosUserRepository = (): AxiosUserRepository => {
  return new AxiosUserRepository()
}
