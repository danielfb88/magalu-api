import { BaseIntegration } from '../../base/base-integration'
import { MOCK_INTEGRATIONS } from '../integrations.config'
import { LuizaLabsUnavailableServiceError } from './errors/luizalabs-unavailable-service-error'
import { ILuizaLabsResponse, IProduct } from './luizalabs-integration-types'
import { LuizaLabsIntegrationMock } from './mock/luizalabs-integration-mock'

const { BASE_URL_LUIZALABS } = process.env

export class LuizaLabsIntegration extends BaseIntegration {
  constructor() {
    super(BASE_URL_LUIZALABS as string, MOCK_INTEGRATIONS ? new LuizaLabsIntegrationMock() : undefined)
  }

  /**
   * Get all products by page
   *
   * @param {number} page
   * @return {*}  {Promise<ILuizaLabsResponse>}
   * @memberof LuizaLabsIntegration
   */
  async getAllProducts(page: number): Promise<ILuizaLabsResponse> {
    try {
      const result = await this.axiosInstance.get<ILuizaLabsResponse>('/', {
        params: {
          page,
        },
      })

      return result.data
    } catch (err) {
      console.error(err)
      throw new LuizaLabsUnavailableServiceError()
    }
  }

  /**
   * Get product by ID
   *
   * @param {string} productId
   * @return {*}  {Promise<ILuizaLabsResponse>}
   * @memberof LuizaLabsIntegration
   */
  async getProductById(productId: string): Promise<IProduct> {
    try {
      const endpoint = `/${productId}`
      const result = await this.axiosInstance.get<IProduct>(endpoint)

      return result.data
    } catch (err) {
      console.error(err)
      throw new LuizaLabsUnavailableServiceError()
    }
  }
}
