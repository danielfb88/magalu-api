/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { NextFunction, Request, Response } from 'express'
import UserService from '../../api/v1/business/user/user-service'
import { InvalidApiKeyError } from '../../errors/invalid-api-key-error'
import { MissingApiKeyError } from '../../errors/missing-api-key-error'

const userService = new UserService()

interface IPath {
  uri: string
  method: 'POST' | 'PUT' | 'GET' | 'DELETE' | 'PATCH'
}

export default async function verifyApiKey(req: Request, res: Response, next: NextFunction): Promise<void> {
  const publicPaths: IPath[] = [
    { uri: '/health', method: 'GET' },
    { uri: '/v1/docs', method: 'GET' },
    { uri: '/v1/user', method: 'POST' },
    { uri: '/v1/user/auth', method: 'POST' },
  ]
  const matched = publicPaths.some(path => new RegExp(path.uri).test(req.path) && req.method === path.method)
  if (matched) {
    return next()
  }

  const apiKey = req.headers.api_key
  if (apiKey === undefined) {
    return next(new MissingApiKeyError())
  }

  try {
    const user = await userService.findByApiKey(apiKey as string)
    if (user === null) {
      return next(new InvalidApiKeyError())
    }

    req.headers.userId = user.id
  } catch (err) {
    console.error(err)
    return next(new InvalidApiKeyError())
  }

  return next()
}
