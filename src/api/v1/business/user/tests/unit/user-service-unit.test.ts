import '../../../../../../../tests/helpers'
import { mockUser } from '../../user-mock'
import UserService from '../../user-service'

const userService = new UserService()

describe('Unit Tests - CRUD Service User', () => {
  beforeEach(async done => {
    await userService.deleteAll()

    done()
  })

  test('Should create an user', async done => {
    const userMock = mockUser()
    const user = await userService.create(userMock)

    expect(user.id).toBeTruthy()
    expect(user.email).toBeTruthy()
    expect(user.password).toBeTruthy()
    expect(user.apiKey).toBeTruthy()

    done()
  })

  test('Should find an user by email', async done => {
    const createdUser = await userService.create(mockUser())

    const user = await userService.findByEmail(createdUser.email)

    expect(user).not.toBeNull()
    expect(createdUser.id).toEqual(user?.id)
    expect(createdUser.email).toEqual(user?.email)
    expect(createdUser.password).toEqual(user?.password)

    done()
  })

  test('Should find an user by api key', async done => {
    const createdUser = await userService.create(mockUser())

    const user = await userService.findByApiKey(createdUser.apiKey)

    expect(user).not.toBeNull()
    expect(createdUser.id).toEqual(user?.id)
    expect(createdUser.email).toEqual(user?.email)
    expect(createdUser.password).toEqual(user?.password)

    done()
  })
})
