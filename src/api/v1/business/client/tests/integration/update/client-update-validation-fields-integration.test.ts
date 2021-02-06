import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import '../../../../../../../../tests/helpers'
import app from '../../../../../../../main/app'
import { mockUser } from '../../../../user/user-mock'
import { IUserDocument } from '../../../../user/user-model'
import UserService from '../../../../user/user-service'
import { mockClient } from '../../../client-mock'
import { IClientDocument } from '../../../client-model'
import ClientService from '../../../client-service'

const request = supertest
const clientService = new ClientService()
const userService = new UserService()

let createdUser: IUserDocument

let createdClient: IClientDocument

describe('Integration Test - Validate update client', () => {
  const endpoint = '/v1/clients/'

  beforeAll(async done => {
    await clientService.deleteAll()
    await userService.deleteAll()

    createdUser = await userService.create(mockUser())
    createdClient = await clientService.create(mockClient())

    done()
  })

  test('Should return BAD_REQUEST error when not sent a required name', async done => {
    const clientMock = mockClient()
    const res = await request(app)
      .put(`${endpoint}/${createdClient.id}`)
      .set('api_key', createdUser.apiKey)
      .send({
        ...clientMock,
        name: undefined,
      })

    expect(res.status).toBe(HTTPStatus.BAD_REQUEST)

    done()
  })
})
