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

const password = faker.random.alphaNumeric(8)

let createdClient: IClient
let createdUser: IUser

describe('Integration Test - Delete client', () => {
  const endpoint = '/v1/client'

  beforeAll(async done => {
    await clientService.deleteAll()
    await userService.deleteAll()

    createdUser = await userService.create(mockUser(password))
    createdClient = await clientService.create(mockClient())

    done()
  })

  test('Should delete a client', async done => {
    const res = await request(app)
      .delete(`${endpoint}/${createdClient.id}`)
      .set('api_key', createdUser.apiKey as string)

    expect(res.status).toBe(HTTPStatus.OK)

    const client = await clientService.findById(createdClient.id as string)
    expect(client).toBeNull()

    done()
  })

  test('Should return UNAUTHORIZED to delete a client with no apiKey sent', async done => {
    const res = await request(app).delete(`${endpoint}/${createdClient.id}`)

    expect(res.status).toBe(HTTPStatus.UNAUTHORIZED)

    const client = await clientService.findById(createdClient.id as string)
    expect(client).toBeNull()

    done()
  })
})
