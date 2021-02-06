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

let createdClient: IClientDocument
let createdUser: IUserDocument

describe('Integration Test - Delete client', () => {
  const endpoint = '/v1/clients'

  beforeAll(async done => {
    await clientService.deleteAll()
    await userService.deleteAll()

    createdUser = await userService.create(mockUser())
    createdClient = await clientService.create(mockClient())

    done()
  })

  test('Should delete a client', async done => {
    const res = await request(app).delete(`${endpoint}/${createdClient.id}`).set('api_key', createdUser.apiKey)

    expect(res.status).toBe(HTTPStatus.OK)

    const client = await clientService.findById(createdClient.id)
    expect(client).toBeNull()

    done()
  })

  test('Should return UNAUTHORIZED to delete a client with no apiKey sent', async done => {
    const res = await request(app).delete(`${endpoint}/${createdClient.id}`)

    expect(res.status).toBe(HTTPStatus.UNAUTHORIZED)

    done()
  })
})
