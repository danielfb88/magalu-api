import faker from 'faker'
import { ILuizaLabsResponse, IProduct, IProductNotFoundResponse } from '../luizalabs-integration-types'

export const PRODUCT_ID_MOCK = '123'
export const NON_EXISTENT_PRODUCT_ID_MOCK = '1234546-non-existent'

export function getProductById(productId: string): IProduct {
  return {
    brand: faker.random.words(),
    id: productId,
    image: faker.internet.url(),
    price: faker.random.number(),
    title: faker.random.words(),
  }
}

export function getProductIdNotFoundResponse(productId: string): IProductNotFoundResponse {
  return {
    error_message: `Product ${productId}__ not found`,
    code: 'not_found',
  }
}

export function getLuizaLabsResponseMock(): ILuizaLabsResponse {
  return {
    meta: {
      page_number: faker.random.number(),
      page_size: faker.random.number(),
    },
    products: [
      {
        brand: faker.random.words(),
        id: faker.random.uuid(),
        image: faker.internet.url(),
        price: faker.random.number(),
        title: faker.random.words(),
      },
      {
        brand: faker.random.words(),
        id: faker.random.uuid(),
        image: faker.internet.url(),
        price: faker.random.number(),
        title: faker.random.words(),
      },
      {
        brand: faker.random.words(),
        id: faker.random.uuid(),
        image: faker.internet.url(),
        price: faker.random.number(),
        title: faker.random.words(),
      },
      {
        brand: faker.random.words(),
        id: faker.random.uuid(),
        image: faker.internet.url(),
        price: faker.random.number(),
        title: faker.random.words(),
      },
      {
        brand: faker.random.words(),
        id: faker.random.uuid(),
        image: faker.internet.url(),
        price: faker.random.number(),
        title: faker.random.words(),
      },
    ],
  }
}
