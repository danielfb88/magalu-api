import { body, check, param } from 'express-validator'

export const createClientValidation = [
  body('name').exists(),
  check('email').exists().bail().isEmail().withMessage('must be a valid email'),
]

export const updateClientValidation = [param('clientId').not().isEmpty(), body('name').exists()]

export const getClientValidation = [param('clientId').not().isEmpty()]

export const deleteClientValidation = [param('clientId').not().isEmpty()]

export const addFavoriteValidation = [param('clientId').not().isEmpty(), param('productId').not().isEmpty()]

export const removeFromFavorites = [param('clientId').not().isEmpty(), param('productId').not().isEmpty()]
