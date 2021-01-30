import HTTPStatus from 'http-status'
import { CustomError, IError } from './custom-error'

export class UserNotFoundError extends CustomError {
  statusCode = HTTPStatus.NOT_FOUND

  constructor() {
    super('USER_NOT_FOUND')

    Object.setPrototypeOf(this, UserNotFoundError.prototype)
  }

  serializeErrors(): IError[] {
    return [{ message: 'User Not Found' }]
  }
}
