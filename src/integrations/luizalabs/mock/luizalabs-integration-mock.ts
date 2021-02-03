import { AxiosInstance } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { IMockIntegration } from '../../../base/base-integration'
import {
  getLuizaLabsResponseMock,
  getProductById,
  getProductIdNotFoundResponse,
  NON_EXISTENT_PRODUCT_ID_MOCK,
  PRODUCT_ID_MOCK,
} from './luizalabs-objects-mock'

export class LuizaLabsIntegrationMock implements IMockIntegration {
  executeMockAdapter(axiosInstance: AxiosInstance): void {
    const mockAdapter = new MockAdapter(axiosInstance)

    /* Get Products */
    mockAdapter.onGet('/').reply(200, getLuizaLabsResponseMock())

    /* Get product by ID */
    mockAdapter.onGet(`/${PRODUCT_ID_MOCK}`).reply(200, getProductById(PRODUCT_ID_MOCK))

    /* Get product not found response */
    mockAdapter
      .onGet(`/${NON_EXISTENT_PRODUCT_ID_MOCK}`)
      .reply(404, getProductIdNotFoundResponse(NON_EXISTENT_PRODUCT_ID_MOCK))
  }
}
