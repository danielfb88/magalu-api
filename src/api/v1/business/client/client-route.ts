import { Router } from 'express'
import ClientController from './client-controller'
import {
  createClientValidation,
  deleteClientValidation,
  getClientValidation,
  updateClientValidation,
} from './client-validation'

export function initClientRoutes(): Router {
  const controller = new ClientController()
  const router = Router()

  router.route('/').post(createClientValidation, controller.create.bind(controller))
  router.route('/:id').put(updateClientValidation, controller.update.bind(controller))
  router.route('/').get(controller.getAllClients.bind(controller))
  router.route('/:id').get(getClientValidation, controller.getClientById.bind(controller))
  router.route('/:id').delete(deleteClientValidation, controller.delete.bind(controller))

  return router
}