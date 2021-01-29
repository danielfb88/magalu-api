import { Router } from 'express'
import { initClientRoutes } from './business/client/client-route'

export function getRoutesV1(): Router {
  const router = Router()

  router.use('/client', initClientRoutes())

  return router
}
