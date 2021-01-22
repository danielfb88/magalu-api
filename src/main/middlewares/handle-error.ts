import { NextFunction, Request, Response } from 'express'
import HTTPStatus from 'http-status'
import { CustomError, IError } from '../../errors/custom-error'

export const handleError = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
): Response<IError> | undefined => {
  console.error(err)

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }

  res.status(HTTPStatus.UNPROCESSABLE_ENTITY).send({
    errors: [{ message: 'Something went wrong' }],
  })
}
