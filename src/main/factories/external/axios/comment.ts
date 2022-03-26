import { AxiosCommentRepository } from '@/external/axios'

export const makeAxiosCommentRepository = (): AxiosCommentRepository => {
  return new AxiosCommentRepository()
}
