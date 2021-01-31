import faker from 'faker'
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

const password = faker.random.alphaNumeric(8)

describe('Integration Test - Get client by id', () => {
  const endpoint = '/v1/client'

  beforeAll(async done => {
    await clientService.deleteAll()

    createdClient = await clientService.create(mockClient())
    createdUser = await userService.create(mockUser(password))

    done()
  })

  test('Should get a client', async done => {
    const res = await request(app).get(`${endpoint}/${createdClient.id}`).set('api_key', createdUser.apiKey)

    expect(res.status).toBe(HTTPStatus.OK)
    expect(res.body.name).toEqual(createdClient.name)
    expect(res.body.email).toEqual(createdClient.email)

    done()
  })

  test('Should return UNAUTHORIZED with no apiKey sent', async done => {
    const res = await request(app).get(`${endpoint}/${createdClient.id}`)

    expect(res.status).toBe(HTTPStatus.UNAUTHORIZED)

    done()
  })
})
