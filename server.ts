/* eslint-disable @typescript-eslint/no-base-to-string */
import * as http from 'http'
import app from './src/main/app'
import setupDatabase from './src/main/database'

const server = http.createServer(app)

setupDatabase()
  .then(() => {
    const port = process.env.PORT as string

    server.listen(parseInt(port, 10))
    server.on('listening', () => console.log(`Server running on ${port}`))
    server.on('error', (error: NodeJS.ErrnoException) => console.log(`An error has occurred: ${error}`))
  })
  .catch(err => console.error(err))
