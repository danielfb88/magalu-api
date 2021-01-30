import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import '../../../../../../../../tests/helpers'
import app from '../../../../../../../main/app'
import { mockClient } from '../../../client-mock'
import ClientService from '../../../client-service'
import { IClient } from '../../../client-types'

const request = supertest
const clientService = new ClientService()

let createdClient: IClient

describe('Integration Test - Validate update client', () => {
  const endpoint = '/v1/client/'

  beforeAll(async done => {
    await clientService.deleteAll()

    createdClient = await clientService.create(mockClient())

    done()
  })

  test('Should return BAD_REQUEST error when not sent a required name', async done => {
    const clientMock = mockClient()
    const res = await request(app)
      .put(`${endpoint}/${createdClient.id}`)
      .send({
        ...clientMock,
        name: undefined,
      })

    expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

    done()
  })
})
