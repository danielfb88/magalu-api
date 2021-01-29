import faker from 'faker'
import { INewClient } from './client-model'

export function mockClient(): INewClient {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
  }
}
