import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import '../../../../../../../../tests/helpers'
import app from '../../../../../../../main/app'
import { mockClient } from '../../../client-mock'
import ClientService from '../../../client-service'
import { IClientResponse } from '../../../client-types'

const request = supertest
const clientService = new ClientService()

let createdClient: IClientResponse

describe('PUT - Delete client', () => {
  const endpoint = '/v1/client/'

  beforeAll(async done => {
    await clientService.deleteAll()

    createdClient = await clientService.create(mockClient())

    done()
  })

  // TODO: test with token
  test('Should delete a client', async done => {
    const res = await request(app).delete(`${endpoint}/${createdClient.id}`)
    expect(res.status).toBe(HTTPStatus.OK)

    const client = await clientService.findById(createdClient.id as string)
    expect(client).toBeNull()

    done()
  })

  // TODO: test without token
})
