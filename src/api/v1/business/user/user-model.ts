import bcrypt from 'bcryptjs'
import { randomBytes } from 'crypto'
import mongoose, { Document } from 'mongoose'

export interface IUserDocument extends Document {
  email: string
  password: string
  apiKey: string
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    apiKey: {
      type: String,
      trim: true,
      default: randomBytes(20).toString('hex'),
    },
  },
  {
    timestamps: true,
  },
)

UserSchema.pre<IUserDocument>('save', function (next) {
  if (!this.isModified('password')) return next()

  bcrypt.genSalt(12, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

UserSchema.set('toJSON', {
  virtuals: true,
  transform: (docs: any, converted: any) => {
    delete converted.__v
    delete converted._id
    delete converted.password
    return converted
  },
})

export default mongoose.model<IUserDocument>('users', UserSchema)
