import * as bodyParser from 'body-parser'
import compress from 'compression'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'
import { getRoutesV1 } from '../api/v1/routes-v1'
import { handleError } from './middlewares/handle-error'
import throw404 from './middlewares/throw-404'

class App {
  public app: express.Application

  constructor() {
    this.app = express()

    this.middleware()
  }

  middleware(): void {
    this.app.use(morgan('dev'))
    this.app.use(compress())
    this.app.use(cors())

    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())

    this.initSwagger()
    this.loadRoutes()

    this.app.use(throw404)
    this.app.use(handleError)
  }

  loadRoutes(): void {
    this.app.route('/health').get((req, res) => res.status(200).send()) // health check

    this.app.use('/v1', getRoutesV1())
  }

  // TODO: create document
  initSwagger(): void {
    const swaggerFile = YAML.load('./swagger.yaml')
    this.app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))
  }
}
export default new App().app
