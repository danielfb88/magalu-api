import faker from 'faker'
import { INewUser } from './user-types'

export function mockUser(): INewUser {
  return {
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  }
}
