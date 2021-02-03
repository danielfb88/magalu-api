import mongoose, { Document } from 'mongoose'

export interface IClientDocument extends Document {
  name: string
  email: string
  favorites: Array<{ productId: string }>
}

const ProductSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
})

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
        type: ProductSchema,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IClientDocument>('clients', ClientSchema)
