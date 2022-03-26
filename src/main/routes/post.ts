import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makePublishPostController, makeLoadPostController } from '@/main/factories/application/controllers/post'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/posts', adapt(makePublishPostController()))
  router.get('/posts', adapt(makeLoadPostController()))
}
