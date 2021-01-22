import HTTPStatus from 'http-status'
import { CustomError, IError } from './custom-error'

export class DatabaseConnectionError extends CustomError {
  statusCode = HTTPStatus.INTERNAL_SERVER_ERROR
  reason = 'Error connecting to database'

  constructor() {
    super('DATABASE_CONNECTION_ERROR')

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors(): IError[] {
    return [{ message: this.reason }]
  }
}
