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
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

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
