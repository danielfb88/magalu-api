import mongoose, { Document } from 'mongoose'
import { INewUser } from './user-types'

export interface IUserDocument extends INewUser, Document {}

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
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IUserDocument>('users', UserSchema)
