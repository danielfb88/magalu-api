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

describe('Integration Test - Update client', () => {
  const endpoint = '/v1/client/'

  beforeAll(async done => {
    await clientService.deleteAll()

    createdClient = await clientService.create(mockClient())

    done()
  })

  // TODO: test with token
  test('Should update a client', async done => {
    const clientMock = mockClient()
    const res = await request(app).put(`${endpoint}/${createdClient.id}`).send(clientMock)

    expect(res.status).toBe(HTTPStatus.OK)
    expect(res.body.name).toEqual(clientMock.name)
    expect(res.body.email).toEqual(createdClient.email)

    done()
  })

  // TODO: test without token
})
