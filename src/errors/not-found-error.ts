import HTTPStatus from 'http-status'
import { CustomError, IError } from './custom-error'

export class NotFoundError extends CustomError {
  statusCode = HTTPStatus.NOT_FOUND
  customMessage: string | undefined

  constructor(customMessage?: string) {
    super('NOT_FOUND')

    this.customMessage = customMessage
    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors(): IError[] {
    return [{ message: `${this.customMessage ?? ''} Not Found` }]
  }
}
