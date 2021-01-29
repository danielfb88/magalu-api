import { body, check, param } from 'express-validator'

export const createClientValidation = [
  body('name').exists(),
  check('email').exists().bail().isEmail().withMessage('must be a valid email'),
]

export const updateClientValidation = [
  param('id').not().isEmpty(),
  body('name').exists(),
  check('email').exists().bail().isEmail().withMessage('must be a valid email'),
]

export const getClientValidation = [param('id').not().isEmpty()]

export const deleteClientValidation = [param('id').not().isEmpty()]
