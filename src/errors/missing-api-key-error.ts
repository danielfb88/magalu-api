import HTTPStatus from 'http-status'
import { CustomError, IError } from './custom-error'

export class MissingApiKeyError extends CustomError {
  statusCode = HTTPStatus.UNAUTHORIZED

  constructor() {
    super('MISSING_API_KEY')

    Object.setPrototypeOf(this, MissingApiKeyError.prototype)
  }

  serializeErrors(): IError[] {
    return [{ message: 'Missing API KEY' }]
  }
}
