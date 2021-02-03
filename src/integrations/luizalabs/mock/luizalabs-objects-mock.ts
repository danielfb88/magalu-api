import faker from 'faker'
import { ILuizaLabsResponse, IProduct } from '../luizalabs-integration-types'

export const PRODUCT_ID_MOCK = '123'

export function getProductById(productId: string): IProduct {
  return {
    brand: faker.random.words(),
    id: productId,
    image: faker.internet.url(),
    price: faker.random.number(),
    title: faker.random.words(),
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
