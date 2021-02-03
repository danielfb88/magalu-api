import { NextFunction, Request, Response } from 'express'
import * as HTTPStatus from 'http-status'
import BaseController from '../../../../base/base-controller'
import { ClientNotFoundError } from '../../../../errors/client-not-found-error'
import { EmailInUseError } from '../../../../errors/email-in-use-error'
import { ProductNotFoundError } from '../../../../errors/product-not-found-error'
import { LuizaLabsIntegration } from '../../../../integrations/luizalabs/luizalabs-integration'
import ClientService from './client-service'
import { INewClient } from './client-types'

export default class ClientController extends BaseController {
  protected clientService: ClientService

  protected luizalabsIntegration: LuizaLabsIntegration

  constructor() {
    super()
    this.clientService = new ClientService()
    this.luizalabsIntegration = new LuizaLabsIntegration()
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

      const newClient = req.body as INewClient

      const client = await this.clientService.findByEmail(newClient.email)
      if (client !== null) {
        throw new EmailInUseError()
      }

      const createdClient = await this.clientService.create(newClient)

      res.status(HTTPStatus.CREATED).json(createdClient.toJSON())
    } catch (err) {
      next(err)
    }
  }

  /**
   * Update client
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {*}  {Promise<void>}
   * @memberof ClientController
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this.checkValidationErrors(req)

      const { clientId } = req.params
      const { name } = req.body

      const updatedClient = await this.clientService.updateById({ id: clientId, name })

      res.status(HTTPStatus.OK).json(updatedClient.toJSON())
    } catch (err) {
      next(err)
    }
  }

  /**
   * Delete client
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {*}  {Promise<void>}
   * @memberof ClientController
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this.checkValidationErrors(req)

      const { clientId } = req.params

      await this.clientService.deleteById(clientId)

      res.sendStatus(HTTPStatus.OK)
    } catch (err) {
      next(err)
    }
  }

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

      res.status(HTTPStatus.OK).json(clientList.map(client => client.toJSON()))
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

      const { clientId } = req.params

      const client = await this.clientService.findById(clientId)

      if (client === null) {
        throw new ClientNotFoundError()
      }

      res.status(HTTPStatus.OK).json(client.toJSON())
    } catch (err) {
      next(err)
    }
  }

  /**
   * Push product id to favorite list
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {*}  {Promise<void>}
   * @memberof ClientController
   */
  async addFavorite(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this.checkValidationErrors(req)

      const { clientId, productId } = req.params

      const product = await this.luizalabsIntegration.getProductById(productId)

      if (product === null) {
        throw new ProductNotFoundError()
      }

      const client = await this.clientService.addFavorite(clientId, product)

      if (client === null) {
        throw new ClientNotFoundError()
      }

      res.status(HTTPStatus.OK).json(client.toJSON())
    } catch (error) {
      next(error)
    }
  }

  /**
   * Remove productId from favorite list
   *
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @return {*}  {Promise<void>}
   * @memberof ClientController
   */
  async removeFromFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      this.checkValidationErrors(req)

      const { clientId, productId } = req.params

      const client = await this.clientService.removeFromFavorites(clientId, productId)

      res.status(HTTPStatus.OK).json(client.toJSON())
    } catch (error) {
      next(error)
    }
  }
}
