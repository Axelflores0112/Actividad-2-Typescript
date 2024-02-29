import express from 'express'
import AnimesRouter from './anime.routes'
import Categoryrouter from './category.route'

const routerApi = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/animes', AnimesRouter)
  router.use('/categories', Categoryrouter)
}

export default routerApi
