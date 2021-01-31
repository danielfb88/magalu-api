import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import '../../../../../../../../tests/helpers'
import app from '../../../../../../../main/app'
import { mockUser } from '../../../../user/user-mock'
import { IUserDocument } from '../../../../user/user-model'
import UserService from '../../../../user/user-service'
import { mockClient } from '../../../client-mock'
import ClientService from '../../../client-service'

const request = supertest
const clientService = new ClientService()
const userService = new UserService()

let createdUser: IUserDocument

describe('Integration Test - Create client', () => {
  const endpoint = '/v1/client'

  beforeAll(async done => {
    await clientService.deleteAll()
    await userService.deleteAll()

    createdUser = await userService.create(mockUser())

    done()
  })

  test('Should create a client', async done => {
    const clientMock = mockClient()
    const res = await request(app).post(endpoint).set('api_key', createdUser.apiKey).send(clientMock)

    expect(res.status).toBe(HTTPStatus.CREATED)
    expect(res.body.name).toEqual(clientMock.name)
    expect(res.body.email).toEqual(clientMock.email)

    done()
  })

  test('Should return UNAUTHORIZED with no apiKey', async done => {
    const clientMock = mockClient()
    const res = await request(app).post(endpoint).send(clientMock)

    expect(res.status).toBe(HTTPStatus.UNAUTHORIZED)

    done()
  })
})
