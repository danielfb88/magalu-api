import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import '../../../../../../../../tests/helpers'
import {
  NON_EXISTENT_PRODUCT_ID_MOCK,
  PRODUCT_ID_MOCK,
} from '../../../../../../../integrations/luizalabs/mock/luizalabs-objects-mock'
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

describe('Client Integration Test - Product favorite list', () => {
  const endpoint = '/v1/client'

  beforeEach(async done => {
    await clientService.deleteAll()
    await userService.deleteAll()

    createdUser = await userService.create(mockUser())
    createdClient = await clientService.create(mockClient())

    done()
  })

  test('Should add product to a client favorite list', async done => {
    const res = await request(app)
      .patch(`${endpoint}/${createdClient.id}/favorite/${PRODUCT_ID_MOCK}`)
      .set('api_key', createdUser.apiKey)
      .send()

    expect(res.body.favorites).toHaveLength(1)

    done()
  })

  test('Should not add A non existent product in luizalabs to a client favorite list', async done => {
    const res = await request(app)
      .patch(`${endpoint}/${createdClient.id}/favorite/${NON_EXISTENT_PRODUCT_ID_MOCK}`)
      .set('api_key', createdUser.apiKey)
      .send()

    expect(res.status).toBe(HTTPStatus.NOT_FOUND)

    done()
  })

  test('Should return UNAUTHORIZED with no apiKey sent', async done => {
    const clientMock = mockClient()
    const productId = '123'

    const res = await request(app).patch(`${endpoint}/${createdClient.id}/favorite/${productId}`).send(clientMock)

    expect(res.status).toBe(HTTPStatus.UNAUTHORIZED)

    done()
  })
})
