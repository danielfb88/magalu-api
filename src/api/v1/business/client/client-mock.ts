import faker from 'faker'
import { INewClient } from './client-types'

export function mockClient(): INewClient {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email().toLowerCase(),
  }
}
