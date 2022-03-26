import { Controller } from '@/application/contracts'
import { DeleteCommentController } from '@/application/controllers/comment'
import { makeDeleteComment } from '@/main/factories/domain/use-cases/comment'

export const makeDeleteCommentController = (): Controller => {
  return new DeleteCommentController(makeDeleteComment())
}
