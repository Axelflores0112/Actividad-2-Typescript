import express from 'express'
import AnimesRouter from './anime.routes'
import CategoryRouter from './category.route'
import UserRouter from './user.route'
import AuthRouter from './auth.route'

const routerApi = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/animes', AnimesRouter)
  router.use('/categories', CategoryRouter)
  router.use('/users', UserRouter)
  router.use('/auth', AuthRouter)
}

export default routerApi
