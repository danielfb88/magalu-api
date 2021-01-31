export interface INewClient {
  name: string
  email: string
}

export interface IClient extends INewClient {
  id?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IClientResponse extends INewClient {
  id: string
  favorites: Array<{ productId: string }>
}
