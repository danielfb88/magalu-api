import { Model } from 'mongoose'
import Client, { IClientDocument } from './client-model'
import { IClientResponse, INewClient } from './client-types'

export default class ClientService {
  protected model: Model<IClientDocument>

  constructor() {
    this.model = Client
  }

  /**
   * Create new client
   *
   * @param {INewClient} newClient
   * @return {*}  {Promise<IClientResponse>}
   * @memberof ClientService
   */
  async create(newClient: INewClient): Promise<IClientResponse> {
    const client = await this.model.create(newClient)

    return client
  }

  /**
   * Update client
   *
   * @param {string} id
   * @param {INewClient} client
   * @return {*}  {Promise<IClientResponse>}
   * @memberof ClientService
   */
  async updateById(id: string, client: INewClient): Promise<IClientResponse> {
    const updatedClient = await this.model.findOneAndUpdate({ id }, client, { new: true })

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
    await this.model.deleteOne({ id })
  }

  /**
   * Find by ID
   *
   * @param {string} id
   * @return {*}  {(Promise<IClientResponse | null>)}
   * @memberof ClientService
   */
  async findById(id: string): Promise<IClientResponse | null> {
    const landlord = await this.model.findById(id)

    return landlord
  }

  /**
   * Find by Email
   *
   * @param {string} email
   * @return {*}  {(Promise<IClientResponse | null>)}
   * @memberof ClientService
   */
  async findByEmail(email: string): Promise<IClientResponse | null> {
    const client = await this.model.findOne({ email })

    return client
  }

  /**
   * Find all clients
   *
   * @return {*}  {Promise<IClientResponse[]>}
   * @memberof ClientService
   */
  async findAll(): Promise<IClientResponse[]> {
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
}
