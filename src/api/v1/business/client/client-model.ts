import mongoose, { Document } from 'mongoose'
import { IProduct } from '../../../../integrations/luizalabs/luizalabs-integration-types'

export interface IClientDocument extends Document {
  name: string
  email: string
  favorites: IProduct[]
}

const ProductSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  reviewScore: {
    type: String,
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
