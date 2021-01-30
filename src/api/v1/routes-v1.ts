import { Router } from 'express'
import { initClientRoutes } from './business/client/client-route'
import { initUserRoutes } from './business/user/user-route'

export function getRoutesV1(): Router {
  const router = Router()

  router.use('/client', initClientRoutes())
  router.use('/user', initUserRoutes())

  return router
}
