import faker from 'faker'
import { generateApiKey } from '../../../../util/crypto'
import { INewUser } from './user-types'

export function mockUser(): INewUser {
  return {
    email: faker.internet.email().toLowerCase(),
    password: faker.random.alphaNumeric(8),
    apiKey: generateApiKey(),
  }
}
