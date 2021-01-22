import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { randomBytes } from 'crypto'

type AxiosRequestConfigWithTime = AxiosRequestConfig & { startTime: number }

export interface IMockIntegration {
  executeMockAdapter: (axiosInstance: AxiosInstance) => void
}

export abstract class BaseIntegration {
  protected baseUrl: string
  protected axiosInstance: AxiosInstance
  protected mockIntegration: IMockIntegration | undefined

  constructor(baseUrl: string, mockIntegration?: IMockIntegration) {
    this.baseUrl = baseUrl
    this.mockIntegration = mockIntegration
    this.axiosInstance = this.createAxiosClient(baseUrl)
  }

  /**
   * Create axios client
   *
   * @param {string} baseURL
   * @returns
   * @memberof BaseIntegration
   */
  protected createAxiosClient(baseURL: string): AxiosInstance {
    const axiosInstance = axios.create({
      baseURL,
      data: {
        json: true,
        resolveWithFullResponse: true,
      },
    })

    axiosInstance.interceptors.request.use(
      request => {
        ;(request as AxiosRequestConfigWithTime).startTime = Date.now()
        request.headers['x-tracking-request-id'] = randomBytes(16).toString('hex')
        return request
      },
      error => {
        throw error
      },
    )

    if (this.mockIntegration !== undefined) {
      console.log(`MOCKING ${this.constructor.name} FUNCTIONS`)
      this.mockIntegration.executeMockAdapter(axiosInstance)
    }

    axiosInstance.interceptors.response.use(
      response => {
        return response
      },
      error => {
        throw error
      },
    )

    return axiosInstance
  }
}
