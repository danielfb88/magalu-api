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

describe('Integration Test - Remove product to client favorite favorite list', () => {
  const endpoint = '/v1/client'

  const productList = [
    {
      productId: faker.random.uuid(),
    },
    {
      productId: faker.random.uuid(),
    },
    {
      productId: faker.random.uuid(),
    },
  ]

  beforeAll(async done => {
    await clientService.deleteAll()
    await userService.deleteAll()

    createdUser = await userService.create(mockUser())
    createdClient = await clientService.create(mockClient())

    const promise = productList.map(async product => {
      await request(app)
        .patch(`${endpoint}/${createdClient.id}/favorite/${product.productId}`)
        .set('api_key', createdUser.apiKey)
        .send()
    })
    await Promise.all(promise)

    done()
  })

  test('Should remove product from the client favorite list', async done => {
    const promise = productList.map(async product => {
      await request(app)
        .delete(`${endpoint}/${createdClient.id}/favorite/${product.productId}`)
        .set('api_key', createdUser.apiKey)
        .send()
    })
    await Promise.all(promise)

    // getting client
    const res = await request(app).get(`${endpoint}/${createdClient.id}`).set('api_key', createdUser.apiKey)

    expect(res.status).toBe(HTTPStatus.OK)
    expect(res.body.name).toEqual(createdClient.name)
    expect(res.body.email).toEqual(createdClient.email)
    expect(res.body.favorites).toHaveLength(0)

    done()
  })

  test('Should return UNAUTHORIZED with no apiKey sent', async done => {
    const clientMock = mockClient()
    const productId = '123'

    const res = await request(app).delete(`${endpoint}/${createdClient.id}/favorite/${productId}`).send(clientMock)

    expect(res.status).toBe(HTTPStatus.UNAUTHORIZED)

    done()
  })
})
