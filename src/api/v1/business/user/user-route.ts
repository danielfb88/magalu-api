import { Router } from 'express'
import UserController from './user-controller'
import { userValidation } from './user-validation'

export function initUserRoutes(): Router {
  const controller = new UserController()
  const router = Router()

  router.route('/').post(userValidation, controller.create.bind(controller))
  router.route('/auth').post(userValidation, controller.authenticateUser.bind(controller))

  return router
}
