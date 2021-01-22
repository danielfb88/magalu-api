import { ValidationError } from 'express-validator'
import * as HTTPStatus from 'http-status'
import { CustomError, IError } from './custom-error'

export class RequestValidationError extends CustomError {
  statusCode = HTTPStatus.BAD_REQUEST

  constructor(public errors: ValidationError[]) {
    super('INVALID_REQUEST_PARAMETERS')

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors(): IError[] {
    return this.errors.map(err => {
      return { message: err.msg, field: err.param }
    })
  }
}
