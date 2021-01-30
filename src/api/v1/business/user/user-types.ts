export interface INewUser {
  email: string
  password: string
  apiKey?: string
}

export interface IUser extends INewUser {
  id?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IUserResponse {
  id: string
  email: string
  apiKey: string
}
