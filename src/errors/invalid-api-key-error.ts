import HTTPStatus from 'http-status'
import { CustomError, IError } from './custom-error'

export class InvalidApiKeyError extends CustomError {
  statusCode = HTTPStatus.UNAUTHORIZED

  constructor() {
    super('INVALID_API_KEY')

    Object.setPrototypeOf(this, InvalidApiKeyError.prototype)
  }

  serializeErrors(): IError[] {
    return [{ message: 'Invalid API KEY' }]
  }
}
