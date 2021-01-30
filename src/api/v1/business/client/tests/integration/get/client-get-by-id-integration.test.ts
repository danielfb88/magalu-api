import * as HTTPStatus from 'http-status'
import supertest from 'supertest'
import '../../../../../../../../tests/helpers'
import app from '../../../../../../../main/app'
import { mockClient } from '../../../client-mock'
import ClientService from '../../../client-service'
import { IClientResponse } from '../../../client-types'

const request = supertest
const clientService = new ClientService()

let createdClient: IClientResponse

describe('GET - Get client by id', () => {
  const endpoint = '/v1/client/'

  beforeAll(async done => {
    await clientService.deleteAll()

    createdClient = await clientService.create(mockClient())

    done()
  })

  // TODO: test with token
  test('Should get a client', async done => {
    const res = await request(app).get(`${endpoint}/${createdClient.id}`)

    expect(res.status).toBe(HTTPStatus.OK)
    expect(res.body.name).toEqual(createdClient.name)
    expect(res.body.email).toEqual(createdClient.email)

    done()
  })

  // TODO: test without token
})
