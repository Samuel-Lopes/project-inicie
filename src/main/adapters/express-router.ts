import { Controller } from '@/application/contracts'

import { RequestHandler, Request } from 'express'

type Adapter = (controller: Controller) => RequestHandler

export const adaptExpressRoute: Adapter = controller => async (req, res) => {
  const requestData = getRequestData(req)
  const { statusCode, data } = await controller.handle(requestData)
  const json = [200, 204].includes(statusCode) ? data : { error: data.message }
  res.status(statusCode).json(json)
}

function getRequestData (request: Request): any {
  if (request.body instanceof Array) return request.body
  return { ...request.body, ...request.params, ...request.query }
}
