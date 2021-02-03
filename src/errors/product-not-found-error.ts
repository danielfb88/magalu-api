import HTTPStatus from 'http-status'
import { CustomError, IError } from './custom-error'

export class ProductNotFoundError extends CustomError {
  statusCode = HTTPStatus.NOT_FOUND

  constructor() {
    super('PRODUCT_NOT_FOUND')

    Object.setPrototypeOf(this, ProductNotFoundError.prototype)
  }

  serializeErrors(): IError[] {
    return [{ message: 'Product Not Found' }]
  }
}
