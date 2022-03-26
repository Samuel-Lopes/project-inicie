import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeAddCommentController, makeDeleteCommentController } from '@/main/factories/application/controllers/comment'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/comments', adapt(makeAddCommentController()))
  router.delete('/comments/:id', adapt(makeDeleteCommentController()))
}
