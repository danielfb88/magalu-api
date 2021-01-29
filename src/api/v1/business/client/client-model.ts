import mongoose, { Document } from 'mongoose'
import { INewClient } from './client-types'

export interface IClientDocument extends INewClient, Document {}

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
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IClientDocument>('clients', ClientSchema)
