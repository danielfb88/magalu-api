import { Model } from 'mongoose'
import Client, { IClientDocument } from './client-model'
import { INewClient } from './client-types'

export default class ClientService {
  protected model: Model<IClientDocument>

  constructor() {
    this.model = Client
  }

  /**
   * Create new client
   *
   * @param {INewClient} newClient
   * @return {*}  {Promise<IClient>}
   * @memberof ClientService
   */
  async create(newClient: INewClient): Promise<IClientDocument> {
    const client = await this.model.create(newClient)

    return client
  }

  /**
   * Update client
   *
   * @param {string} id
   * @param {INewClient} client
   * @return {*}  {Promise<IClient>}
   * @memberof ClientService
   */
  async updateById(args: { id: string; name: string }): Promise<IClientDocument> {
    const updatedClient = await this.model.findOneAndUpdate({ _id: args.id }, { name: args.name }, { new: true })

    return updatedClient
  }

  /**
   * Delete client
   *
   * @param {string} id
   * @return {*}  {Promise<void>}
   * @memberof ClientService
   */
  async deleteById(id: string): Promise<void> {
    await this.model.deleteOne({ _id: id })
  }

  /**
   * Find by ID
   *
   * @param {string} id
   * @return {*}  {(Promise<IClient | null>)}
   * @memberof ClientService
   */
  async findById(id: string): Promise<IClientDocument | null> {
    const landlord = await this.model.findById(id)

    return landlord
  }

  /**
   * Find by Email
   *
   * @param {string} email
   * @return {*}  {(Promise<IClient | null>)}
   * @memberof ClientService
   */
  async findByEmail(email: string): Promise<IClientDocument | null> {
    const client = await this.model.findOne({ email })

    return client
  }

  /**
   * Find all clients
   *
   * @return {*}  {Promise<IClient[]>}
   * @memberof ClientService
   */
  async findAll(): Promise<IClientDocument[]> {
    const clientList = await this.model.find({})

    return clientList
  }

  /**
   * Delete all
   *
   * @return {*}  {Promise<void>}
   * @memberof ClientService
   */
  async deleteAll(): Promise<void> {
    await this.model.deleteMany({})
  }

  /**
   * Push productId to favorite list
   *
   * @param {string} clientId
   * @param {{ productId: string }} payload
   * @return {*}  {Promise<IClient>}
   * @memberof ClientService
   */
  async pushFavorite(clientId: string, productId: string): Promise<IClientDocument> {
    return this.model.findOneAndUpdate(
      {
        _id: clientId,
      },
      {
        $push: {
          favorites: {
            productId,
          },
        },
      },
      {
        new: true,
      },
    )
  }

  /**
   * Remove productId from favorite list
   *
   * @param {string} clientId
   * @param {string} productId
   * @return {*}  {Promise<IClient>}
   * @memberof ClientService
   */
  async removeFromFavorites(clientId: string, productId: string): Promise<IClientDocument> {
    return this.model.findOneAndUpdate(
      {
        _id: clientId,
      },
      {
        $pull: {
          'favorites.productId': productId,
        },
      },
      {
        new: true,
      },
    )
  }
}
