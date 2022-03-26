import { Controller } from '@/application/contracts'
import { AddCommentController } from '@/application/controllers/comment'
import { makeAddComment } from '@/main/factories/domain/use-cases/comment'

export const makeAddCommentController = (): Controller => {
  return new AddCommentController(makeAddComment())
}
