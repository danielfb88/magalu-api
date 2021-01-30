import * as bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'

export function generateApiKey(): string {
  return randomBytes(20).toString('hex')
}

export function encryptPassword(password: string): string {
  return bcrypt.hashSync(password, 12)
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash)
}
