import HTTPStatus from 'http-status'
import { CustomError, IError } from './custom-error'

export class ClientNotFoundError extends CustomError {
  statusCode = HTTPStatus.NOT_FOUND

  constructor() {
    super('CLIENT_NOT_FOUND')

    Object.setPrototypeOf(this, ClientNotFoundError.prototype)
  }

  serializeErrors(): IError[] {
    return [{ message: 'Client Not Found' }]
  }
}
