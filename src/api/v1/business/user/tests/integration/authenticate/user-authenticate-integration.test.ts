import faker from 'faker'
import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import '../../../../../../../../tests/helpers'
import app from '../../../../../../../main/app'
import { mockUser } from '../../../user-mock'
import UserService from '../../../user-service'

const request = supertest
const userService = new UserService()

const plainPassword = faker.random.alphaNumeric(8)

describe('Integration Test - Authenticate user', () => {
  const endpoint = '/v1/user/auth'

  beforeAll(async done => {
    await userService.deleteAll()

    done()
  })

  test('Should authenticate an user', async done => {
    const userMock = mockUser(plainPassword)
    await request(app).post('/v1/user').send({
      email: userMock.email,
      password: plainPassword,
    })

    const responseAuthenticateUser = await request(app).post(endpoint).send({
      email: userMock.email,
      password: plainPassword,
    })

    expect(responseAuthenticateUser.status).toBe(HTTPStatus.OK)
    expect(responseAuthenticateUser.body.id).toBeTruthy()
    expect(responseAuthenticateUser.body.email).toEqual(userMock.email)
    expect(responseAuthenticateUser.body.apiKey).toBeTruthy()

    done()
  })

  test('Should fail authentication to not found user', async done => {
    const res = await request(app).post(endpoint).send({
      email: 'user@notfound.com',
      password: 'any-password',
    })

    expect(res.status).toBe(HTTPStatus.NOT_FOUND)

    done()
  })

  test('Should fail authentication to wrong password', async done => {
    const userMock = mockUser(plainPassword)
    const createdUser = await userService.create(userMock)

    const res = await request(app).post(endpoint).send({
      email: createdUser.email,
      password: 'wrong-password',
    })

    expect(res.status).toBe(HTTPStatus.UNAUTHORIZED)

    done()
  })
})
