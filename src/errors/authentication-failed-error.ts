import HTTPStatus from 'http-status'
import { CustomError, IError } from './custom-error'

export class AuthenticationFailedError extends CustomError {
  statusCode = HTTPStatus.UNAUTHORIZED

  constructor() {
    super('AUTHENTICATION_FAILED')

    Object.setPrototypeOf(this, AuthenticationFailedError.prototype)
  }

  serializeErrors(): IError[] {
    return [{ message: 'Email or password invalid' }]
  }
}
