import { AddComment, setupAddComment } from '@/domain/use-cases/comment'
import { makeAxiosCommentRepository, makeAxiosPostRepository } from '@/main/factories/external/axios'

export const makeAddComment = (): AddComment => {
  return setupAddComment(makeAxiosCommentRepository(), makeAxiosPostRepository())
}
