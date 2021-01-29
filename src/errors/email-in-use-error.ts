import HTTPStatus from 'http-status'
import { CustomError, IError } from './custom-error'

export class EmailInUseError extends CustomError {
  statusCode = HTTPStatus.FORBIDDEN

  constructor() {
    super('EMAIL_IN_USE')

    Object.setPrototypeOf(this, EmailInUseError.prototype)
  }

  serializeErrors(): IError[] {
    return [{ message: 'E-mail already in use' }]
  }
}
