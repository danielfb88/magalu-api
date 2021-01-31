import { Router } from 'express'
import ClientController from './client-controller'
import {
  createClientValidation,
  deleteClientValidation,
  getClientValidation,
  pushFavoriteValidation,
  removeFromFavorites,
  updateClientValidation,
} from './client-validation'

export function initClientRoutes(): Router {
  const controller = new ClientController()
  const router = Router()

  router.route('/').post(createClientValidation, controller.create.bind(controller))
  router.route('/:clientId').put(updateClientValidation, controller.update.bind(controller))
  router.route('/').get(controller.getAllClients.bind(controller))
  router.route('/:clientId').get(getClientValidation, controller.getClientById.bind(controller))
  router.route('/:clientId').delete(deleteClientValidation, controller.delete.bind(controller))
  router.route('/:clientId/favorite/:productId').post(pushFavoriteValidation, controller.pushFavorite.bind(controller))
  router
    .route('/:clientId/favorite/:productId')
    .delete(removeFromFavorites, controller.removeFromFavorites.bind(controller))

  return router
}
