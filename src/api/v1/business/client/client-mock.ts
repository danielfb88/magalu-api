import faker from 'faker'
import { IProduct } from '../../../../integrations/luizalabs/luizalabs-integration-types'
import { INewClient } from './client-types'

export function mockClient(): INewClient {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email().toLowerCase(),
  }
}

export function mockProduct(): IProduct {
  return {
    id: faker.random.uuid(),
    brand: faker.random.word(),
    image: faker.internet.url(),
    price: faker.random.number(),
    title: faker.random.words(),
    reviewScore: faker.random.words(),
  }
}
