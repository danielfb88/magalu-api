import { NextFunction, Request, Response } from 'express'
import { NotFoundError } from '../../errors/not-found-error'

export default function throw404(req: Request, res: Response, next: NextFunction): void {
  next(new NotFoundError())
}
