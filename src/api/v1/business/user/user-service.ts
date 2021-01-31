import bcrypt from 'bcryptjs'
import { Model } from 'mongoose'
import User, { IUserDocument } from './user-model'
import { INewUser } from './user-types'

export default class UserService {
  protected model: Model<IUserDocument>

  constructor() {
    this.model = User
  }

  /**
   * Create new user
   *
   * @param {INewUser} newUser
   * @return {*}  {Promise<IUser>}
   * @memberof UserService
   */
  async create(newUser: INewUser): Promise<IUserDocument> {
    const user = await this.model.create(newUser)

    return user
  }

  /**
   * Find by Email
   *
   * @param {string} email
   * @return {*}  {(Promise<IUser | null>)}
   * @memberof UserService
   */
  async findByEmail(email: string): Promise<IUserDocument | null> {
    const user = await this.model.findOne({ email })

    return user
  }

  /**
   * Find by api key
   *
   * @param {string} apiKey
   * @return {*}  {(Promise<IUser | null>)}
   * @memberof UserService
   */
  async findByApiKey(apiKey: string): Promise<IUserDocument | null> {
    const user = await this.model.findOne({ apiKey })

    return user
  }

  /**
   * Delete all
   *
   * @return {*}  {Promise<void>}
   * @memberof UserService
   */
  async deleteAll(): Promise<void> {
    await this.model.deleteMany({})
  }

  /**
   * Compare password
   *
   * @param {string} password
   * @param {string} hash
   * @return {*}  {boolean}
   * @memberof UserService
   */
  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash)
  }
}
