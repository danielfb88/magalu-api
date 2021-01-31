import faker from 'faker'
import { encryptPassword, generateApiKey } from '../../../../util/crypto'
import { INewUser } from './user-types'

export function mockUser(password: string): INewUser {
  return {
    email: faker.internet.email().toLowerCase(),
    password: encryptPassword(password),
    apiKey: generateApiKey(),
  }
}
