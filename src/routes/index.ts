import express from 'express'
import AnimesRouter from './anime.routes'

const routerApi = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/animes', AnimesRouter)
}

export default routerApi
