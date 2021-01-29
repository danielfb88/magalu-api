import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import '../../../../../../../tests/helpers'
import app from '../../../../../../main/app'
import { mockClient } from '../../client-mock'
import ClientService from '../../client-service'

const request = supertest
const clientService = new ClientService()

describe('SignIn integration tests', () => {
  beforeAll(async done => {
    await clientService.deleteAll()

    done()
  })

  describe('POST - Create client', () => {
    const endpoint = '/v1/client/'

    test('Should create a client', async done => {
      const clientMock = mockClient()
      const res = await request(app).post(endpoint).send(clientMock)

      expect(res.status).toBe(HTTPStatus.CREATED)
      expect(res.body.name).toEqual(clientMock.name)
      expect(res.body.email).toEqual(clientMock.email)

      done()
    })

    /* test('Should return UNAUTHORIZED when unnauthorized access', async done => {
      const res = await request(app).post(endpoint).send({
        email: createdClient.email,
        deviceId: 'wrong-device-id',
      })

      expect(res.status).toBe(HTTPStatus.UNAUTHORIZED)

      done()
    }) */
  })
})
