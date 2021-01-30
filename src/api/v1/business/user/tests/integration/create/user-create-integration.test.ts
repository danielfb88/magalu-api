import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import '../../../../../../../../tests/helpers'
import app from '../../../../../../../main/app'
import { mockUser } from '../../../user-mock'
import UserService from '../../../user-service'

const request = supertest
const userService = new UserService()

describe('Integration Test - Create user', () => {
  const endpoint = '/v1/user'

  beforeAll(async done => {
    await userService.deleteAll()

    done()
  })

  test('Should create an user', async done => {
    const userMock = mockUser()
    const res = await request(app).post(endpoint).send(userMock)

    expect(res.status).toBe(HTTPStatus.CREATED)
    expect(res.body.id).toBeTruthy()
    expect(res.body.email).toEqual(userMock.email)
    expect(res.body.apiKey).toBeTruthy()

    done()
  })
})
