import { DeleteComment, setupDeleteComment } from '@/domain/use-cases/comment/delete'
import { makeAxiosCommentRepository } from '@/main/factories/external/axios'

export const makeDeleteComment = (): DeleteComment => {
  return setupDeleteComment(makeAxiosCommentRepository())
}
