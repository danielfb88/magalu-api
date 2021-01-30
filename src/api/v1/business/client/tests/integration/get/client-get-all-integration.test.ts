import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import '../../../../../../../../tests/helpers'
import app from '../../../../../../../main/app'
import { mockClient } from '../../../client-mock'
import ClientService from '../../../client-service'

const request = supertest
const clientService = new ClientService()

describe('Integration Test - Get all clients', () => {
  const endpoint = '/v1/client'

  beforeAll(async done => {
    await clientService.deleteAll()

    await clientService.create(mockClient())
    await clientService.create(mockClient())
    await clientService.create(mockClient())

    done()
  })

  // TODO: test with token
  test('Should get 3 clients', async done => {
    const res = await request(app).get(endpoint)

    expect(res.status).toBe(HTTPStatus.OK)
    expect(res.body).toHaveLength(3)

    done()
  })

  // TODO: test without token
})
