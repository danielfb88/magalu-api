import { Router } from 'express'

export default class RoutesV1 {
  getRouter(): Router {
    const v1 = Router()

    v1.route('/health').get((req, res) => res.status(200).send()) // health check

    return v1
  }
}
