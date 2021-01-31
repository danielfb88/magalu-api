import mongoose, { Document } from 'mongoose'

export interface IClient extends Document {
  name: string
  email: string
  favorites: Array<{ productId: string }>
}

const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    favorites: [
      {
        productId: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IClient>('clients', ClientSchema)
