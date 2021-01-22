import mongoose, { Mongoose } from 'mongoose'

let mongooseConnection: Mongoose

beforeAll(async done => {
  try {
    const DB_URI = 'mongodb://mongo:27017/db-test'

    mongooseConnection = await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    mongoose.connection.on('connected', () => {
      console.info(`Database connected: ${DB_URI}`)
    })

    // mongoose.set('debug', true)
    done()
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    process.stderr.write(`${err}\n${err.stack}\n`)
    process.exit(1)
  }
}, 60000)

afterAll(async done => {
  await mongooseConnection.connection.close()
  done()
})
