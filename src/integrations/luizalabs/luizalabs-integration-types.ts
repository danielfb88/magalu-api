export interface IProduct {
  price: number
  image: string
  brand: string
  id: string
  title: string
  reviewScore?: string
}

export interface ILuizaLabsResponse {
  meta: {
    page_number: number
    page_size: number
  }
  products: IProduct[]
}
