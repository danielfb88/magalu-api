import faker from 'faker'
import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import '../../../../../../tests/helpers'
import app from '../../../../../main/app'
import { mockClient } from '../client-mock'
import ClientService from '../client-service'

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

      expect(res.status).toEqual(HTTPStatus.CREATED)
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

    test('Should return BAD_REQUEST error when not sent a required name', async done => {
      const res = await request(app).post(endpoint).send({
        name: undefined,
        email: faker.internet.email(),
      })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return BAD_REQUEST error when not sent a required email', async done => {
      const res = await request(app).post(endpoint).send({
        name: faker.name.firstName(),
        email: undefined,
      })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return BAD_REQUEST error when sent an invalid email', async done => {
      const res = await request(app).post(endpoint).send({
        name: faker.name.firstName(),
        email: 'invalid_email',
      })

      expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

      done()
    })

    test('Should return FORBIDDEN error when email already exists in database', async done => {
      const client = await clientService.create({
        name: 'Vegeta',
        email: 'vegeta@ssj.com.br',
      })

      const res = await request(app).post(endpoint).send({
        name: client.name,
        email: client.email,
      })

      expect(res.status).toBe(HTTPStatus.FORBIDDEN)

      done()
    })
  })
})
