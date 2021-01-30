import faker from 'faker'
import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import '../../../../../../../../tests/helpers'
import app from '../../../../../../../main/app'
import UserService from '../../../user-service'

const request = supertest
const userService = new UserService()

describe('Integration Test - Validate authentication user', () => {
  const endpoint = '/v1/user/auth'

  beforeAll(async done => {
    await userService.deleteAll()

    done()
  })

  test('Should return BAD_REQUEST error when not sent a required password', async done => {
    const res = await request(app).post(endpoint).send({
      email: faker.internet.email(),
      password: undefined,
    })

    expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

    done()
  })

  test('Should return BAD_REQUEST error when not sent a required email', async done => {
    const res = await request(app).post(endpoint).send({
      email: undefined,
      password: faker.internet.password(),
    })

    expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

    done()
  })

  test('Should return BAD_REQUEST error when sent an invalid email', async done => {
    const res = await request(app).post(endpoint).send({
      email: 'invalid_email',
      password: faker.internet.password(),
    })

    expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

    done()
  })
})
