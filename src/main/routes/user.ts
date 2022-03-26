import { adaptExpressRoute as adapt } from '@/main/adapters'
import { makeAddUserController, makeLoadUserController, makeLoadUserByIdController } from '@/main/factories/application/controllers/user'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/users', adapt(makeAddUserController()))
  router.get('/users', adapt(makeLoadUserController()))
  router.get('/users/:id', adapt(makeLoadUserByIdController()))
}
