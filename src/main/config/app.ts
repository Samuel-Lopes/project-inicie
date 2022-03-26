import { setupMiddlewares } from '@/main/config/middlewares'
import { setupRoutes } from '@/main/config/routes'
import swagger from './swagger'

import express from 'express'

const app = express()
swagger(app)
setupMiddlewares(app)
setupRoutes(app)
export { app }
