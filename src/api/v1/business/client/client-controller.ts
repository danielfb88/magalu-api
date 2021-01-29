import { NextFunction, Request, Response } from 'express'
import * as HTTPStatus from 'http-status'
import BaseController from '../../../../base/base-controller'
import { ClientNotFoundError } from '../../../../errors/client-not-found-error'
import { EmailInUseError } from '../../../../errors/email-in-use-error'
import ClientService from './client-service'
import { IClientResponse } from './client-types'

export default class ClientController extends BaseController {
  readonly clientService: ClientService

  constructor() {
    super()
    this.clientService = new ClientService()
  }

  /**
   * Create client
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {*}  {Promise<void>}
   * @memberof ClientController
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this.checkValidationErrors(req)

      const client = await this.clientService.findByEmail(req.body.email)
      if (client !== null) {
        throw new EmailInUseError()
      }

      const createdClient = await this.clientService.create(req.body)

      const payload: IClientResponse = {
        id: createdClient.id,
        name: createdClient.name,
        email: createdClient.email,
      }

      res.status(HTTPStatus.CREATED).json(payload)
    } catch (err) {
      next(err)
    }
  }

  // TODO: Update
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {}

  // TODO: Delete
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {}

  /**
   * Get all clients
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {*}  {Promise<void>}
   * @memberof ClientController
   */
  async getAllClients(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this.checkValidationErrors(req)

      const clientList = await this.clientService.findAll()

      res.status(HTTPStatus.OK).json(
        clientList.map(client => {
          const payload: IClientResponse = {
            id: client.id,
            name: client.name,
            email: client.email,
          }

          return payload
        }),
      )
    } catch (err) {
      next(err)
    }
  }

  /**
   * Get client by ID
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {*}  {Promise<void>}
   * @memberof ClientController
   */
  async getClientById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this.checkValidationErrors(req)

      const { id } = req.params

      const client = await this.clientService.findById(id)

      if (client === null) {
        throw new ClientNotFoundError()
      }

      const payload: IClientResponse = {
        id: client.id,
        name: client.name,
        email: client.email,
      }

      res.status(HTTPStatus.OK).json(payload)
    } catch (err) {
      next(err)
    }
  }
}
