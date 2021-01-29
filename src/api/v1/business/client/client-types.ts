export interface INewClient {
  name: string
  email: string
}

export interface IClientResponse extends INewClient {
  id?: string
}
