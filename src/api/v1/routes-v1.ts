import { Router } from 'express'
import { initClientRoutes } from './business/client/client-route'

export function getRoutesV1(): Router {
  const router = Router()

  router.route('/health').get((req, res) => res.status(200).send()) // health check
  router.use('/client', initClientRoutes())

  return router
}
