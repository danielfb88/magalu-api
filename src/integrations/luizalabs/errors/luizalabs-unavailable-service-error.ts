import HTTPStatus from 'http-status'
import { CustomError, IError } from '../../../errors/custom-error'

export class LuizaLabsUnavailableServiceError extends CustomError {
  statusCode = HTTPStatus.NOT_FOUND
  reason = 'LuizaLabs service - Product not found'

  constructor() {
    super('PRODUCT_NOT_FOUND')

    Object.setPrototypeOf(this, LuizaLabsUnavailableServiceError.prototype)
  }

  serializeErrors(): IError[] {
    return [{ message: this.reason }]
  }
}
