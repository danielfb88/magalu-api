export interface INewClient {
  name: string
  email: string
}

export interface IClient extends INewClient {
  id?: string
  createdAt?: string
  updatedAt?: string
}

export interface IClientResponse extends INewClient {
  id: string
}
