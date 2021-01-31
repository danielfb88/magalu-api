import { NextFunction, Request, Response } from 'express'
import * as HTTPStatus from 'http-status'
import BaseController from '../../../../base/base-controller'
import { AuthenticationFailedError } from '../../../../errors/authentication-failed-error'
import { EmailInUseError } from '../../../../errors/email-in-use-error'
import { UserNotFoundError } from '../../../../errors/user-not-found-error'
import UserService from './user-service'
export default class UserController extends BaseController {
  readonly userService: UserService

  constructor() {
    super()
    this.userService = new UserService()
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this.checkValidationErrors(req)

      const { email, password } = req.body

      const user = await this.userService.findByEmail(email)
      if (user !== null) {
        throw new EmailInUseError()
      }

      const createdUser = await this.userService.create({
        email,
        password,
      })

      res.status(HTTPStatus.CREATED).json(createdUser.toJSON())
    } catch (err) {
      next(err)
    }
  }

  /**
   * Authenticate user
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {*}  {Promise<void>}
   * @memberof UserController
   */
  async authenticateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this.checkValidationErrors(req)

      const { email, password } = req.body

      const user = await this.userService.findByEmail(email)
      if (user === null) {
        throw new UserNotFoundError()
      }

      if (!this.userService.comparePassword(password, user.password)) {
        throw new AuthenticationFailedError()
      }

      res.status(HTTPStatus.OK).json(user.toJSON())
    } catch (err) {
      next(err)
    }
  }
}
