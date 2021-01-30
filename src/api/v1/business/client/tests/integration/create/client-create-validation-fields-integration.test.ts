import faker from 'faker'
import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import '../../../../../../../../tests/helpers'
import app from '../../../../../../../main/app'
import { mockClient } from '../../../client-mock'
import ClientService from '../../../client-service'

const request = supertest
const clientService = new ClientService()

describe('POST - Validate creation client', () => {
  const endpoint = '/v1/client/'

  beforeAll(async done => {
    await clientService.deleteAll()

    done()
  })

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
    const client = await clientService.create(mockClient())

    const res = await request(app).post(endpoint).send({
      name: faker.name.firstName(),
      email: client.email,
    })

    expect(res.status).toBe(HTTPStatus.FORBIDDEN)

    done()
  })
})
