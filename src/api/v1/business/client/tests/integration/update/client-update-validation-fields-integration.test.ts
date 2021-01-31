import faker from 'faker'
import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import '../../../../../../../../tests/helpers'
import app from '../../../../../../../main/app'
import { mockUser } from '../../../../user/user-mock'
import UserService from '../../../../user/user-service'
import { IUser } from '../../../../user/user-types'
import { mockClient } from '../../../client-mock'
import ClientService from '../../../client-service'
import { IClient } from '../../../client-types'

const request = supertest
const clientService = new ClientService()
const userService = new UserService()

let createdUser: IUser
const password = faker.random.alphaNumeric(8)

let createdClient: IClient

describe('Integration Test - Validate update client', () => {
  const endpoint = '/v1/client/'

  beforeAll(async done => {
    await clientService.deleteAll()
    await userService.deleteAll()

    createdUser = await userService.create(mockUser(password))
    createdClient = await clientService.create(mockClient())

    done()
  })

  test('Should return BAD_REQUEST error when not sent a required name', async done => {
    const clientMock = mockClient()
    const res = await request(app)
      .put(`${endpoint}/${createdClient.id}`)
      .set('api_key', createdUser.apiKey as string)
      .send({
        ...clientMock,
        name: undefined,
      })

    expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

    done()
  })
})
