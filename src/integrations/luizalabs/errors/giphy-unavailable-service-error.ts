import HTTPStatus from 'http-status'
import { CustomError, IError } from '../../../errors/custom-error'

export class LuizaLabsUnavailableServiceError extends CustomError {
  statusCode = HTTPStatus.INTERNAL_SERVER_ERROR
  reason = 'LuizaLabs Unavailable service'

  constructor() {
    super('UNAVAILABLE_SERVICE')

    Object.setPrototypeOf(this, LuizaLabsUnavailableServiceError.prototype)
  }

  serializeErrors(): IError[] {
    return [{ message: this.reason }]
  }
}
