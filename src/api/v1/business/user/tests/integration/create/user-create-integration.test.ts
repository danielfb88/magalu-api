import faker from 'faker'
import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import '../../../../../../../../tests/helpers'
import app from '../../../../../../../main/app'
import { mockUser } from '../../../user-mock'
import UserService from '../../../user-service'
import { IUser } from '../../../user-types'

const request = supertest
const userService = new UserService()

let createdUser: IUser
const password = faker.random.alphaNumeric(8)

describe('Integration Test - Create user', () => {
  const endpoint = '/v1/user'

  beforeAll(async done => {
    await userService.deleteAll()

    createdUser = await userService.create(mockUser(password))

    done()
  })

  test('Should create an user', async done => {
    const userMock = mockUser(password)
    const res = await request(app)
      .post(endpoint)
      .set('api_key', createdUser.apiKey as string)
      .send(userMock)

    expect(res.status).toBe(HTTPStatus.CREATED)
    expect(res.body.id).toBeTruthy()
    expect(res.body.email).toEqual(userMock.email)
    expect(res.body.apiKey).toBeTruthy()

    done()
  })
})