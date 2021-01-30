import { NextFunction, Request, Response } from 'express'
import * as HTTPStatus from 'http-status'
import BaseController from '../../../../base/base-controller'
import { AuthenticationFailedError } from '../../../../errors/authentication-failed-error'
import { EmailInUseError } from '../../../../errors/email-in-use-error'
import { UserNotFoundError } from '../../../../errors/user-not-found-error'
import { comparePassword, encryptPassword, generateApiKey } from '../../../../util/crypto'
import UserService from './user-service'
import { IUserResponse } from './user-types'

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
        password: encryptPassword(password),
        apiKey: generateApiKey(),
      })

      const payload: IUserResponse = {
        id: createdUser.id as string,
        email: createdUser.email,
        apiKey: createdUser.apiKey as string,
      }

      res.status(HTTPStatus.CREATED).json(payload)
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

      if (!comparePassword(password, user.password)) {
        throw new AuthenticationFailedError()
      }

      const payload: IUserResponse = {
        id: user.id as string,
        email: user.email,
        apiKey: user.apiKey as string,
      }

      res.status(HTTPStatus.OK).json(payload)
    } catch (err) {
      next(err)
    }
  }
}
