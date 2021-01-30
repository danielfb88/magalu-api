import { body, check } from 'express-validator'

export const userValidation = [
  check('email').exists().bail().isEmail().withMessage('must be a valid email'),
  body('password').not().isEmpty(),
]
