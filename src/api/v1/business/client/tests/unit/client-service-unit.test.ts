import faker from 'faker'
import '../../../../../../../tests/helpers'
import { mockClient } from '../../client-mock'
import ClientService from '../../client-service'

const clientService = new ClientService()

describe('Unit Tests - CRUD Service Client', () => {
  beforeEach(async done => {
    await clientService.deleteAll()

    done()
  })

  test('Should create a client', async done => {
    const clientMock = mockClient()
    const client = await clientService.create(clientMock)

    expect(client.id).toBeTruthy()
    expect(client.name).toEqual(clientMock.name)
    expect(client.email).toEqual(clientMock.email)

    done()
  })

  test('Should update a client', async done => {
    const createdClient = await clientService.create(mockClient())

    const newName = faker.name.firstName()
    const updatedClient = await clientService.updateById({ id: createdClient.id as string, name: newName })

    expect(updatedClient.id).toBeTruthy()
    expect(updatedClient.email).toEqual(createdClient.email)
    expect(updatedClient.name).toEqual(newName)

    done()
  })

  test('Should delete a client', async done => {
    const createdClient = await clientService.create(mockClient())
    await clientService.deleteById(createdClient.id as string)

    const client = await clientService.findById(createdClient.id as string)
    expect(client).toBeNull()

    done()
  })

  test('Should get a client by id', async done => {
    const createdClient = await clientService.create(mockClient())

    const client = await clientService.findById(createdClient.id as string)

    expect(client).not.toBeNull()
    expect(client?.id).toEqual(createdClient.id)
    expect(client?.name).toEqual(createdClient.name)

    done()
  })

  test('Should get a client by email', async done => {
    const createdClient = await clientService.create(mockClient())

    const client = await clientService.findByEmail(createdClient.email)

    expect(client).not.toBeNull()
    expect(client?.id).toEqual(createdClient.id)
    expect(client?.name).toEqual(createdClient.name)

    done()
  })

  test('Should get all clients', async done => {
    await clientService.create(mockClient())
    await clientService.create(mockClient())
    await clientService.create(mockClient())

    const clientList = await clientService.findAll()

    expect(clientList).toHaveLength(3)

    done()
  })

  test('Should add a product to favorite list', async done => {
    const createdClient = await clientService.create(mockClient())

    await clientService.pushFavorite(createdClient.id, faker.random.uuid())
    await clientService.pushFavorite(createdClient.id, faker.random.uuid())
    await clientService.pushFavorite(createdClient.id, faker.random.uuid())

    const client = await clientService.findById(createdClient.id)
    expect(client?.id).toBeTruthy()
    expect(client?.favorites).toHaveLength(3)

    done()
  })

  test('Should remove a product from favorite list', async done => {
    const createdClient = await clientService.create(mockClient())

    const productId1 = faker.random.uuid()
    const productId2 = faker.random.uuid()
    const productId3 = faker.random.uuid()

    await clientService.pushFavorite(createdClient.id, productId1)
    await clientService.pushFavorite(createdClient.id, productId2)
    await clientService.pushFavorite(createdClient.id, productId3)

    let client = await clientService.findById(createdClient.id)
    expect(client?.id).toBeTruthy()
    expect(client?.favorites).toHaveLength(3)

    await clientService.removeFromFavorites(createdClient.id, productId1)
    await clientService.removeFromFavorites(createdClient.id, productId2)
    await clientService.removeFromFavorites(createdClient.id, productId3)

    client = await clientService.findById(createdClient.id)
    expect(client?.favorites).toHaveLength(0)

    done()
  })
})
