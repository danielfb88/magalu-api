import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import '../../../../../../../../tests/helpers'
import app from '../../../../../../../main/app'
import { mockClient } from '../../../client-mock'
import ClientService from '../../../client-service'

const request = supertest
const clientService = new ClientService()

describe('POST - Create client', () => {
  const endpoint = '/v1/client/'

  beforeAll(async done => {
    await clientService.deleteAll()

    done()
  })

  // TODO: test with token
  test('Should create a client', async done => {
    const clientMock = mockClient()
    const res = await request(app).post(endpoint).send(clientMock)

    expect(res.status).toBe(HTTPStatus.CREATED)
    expect(res.body.name).toEqual(clientMock.name)
    expect(res.body.email).toEqual(clientMock.email)

    done()
  })

  // TODO: test without token
})
