import mongoose, { Mongoose } from 'mongoose'
import { DatabaseConnectionError } from '../errors/database-connection-error'

export default async function setupDatabase(): Promise<Mongoose> {
  try {
    const DB_URL = process.env.DB_URL as string

    mongoose.connection.on('connected', () => {
      console.info(`Database connected: ${DB_URL}`)
    })

    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })

    mongoose.set('debug', true)

    return mongoose
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    throw new DatabaseConnectionError()
  }
}
