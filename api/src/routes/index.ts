import { Router } from 'express'
import usersRouter from './usersRouter'
import bondsRouter from './bondsRouter'
import holidaysRouter from './holidaysRouter'

const routes = Router()

routes.use('/users', usersRouter)

routes.use('/bonds', bondsRouter)

routes.use('/holidays', holidaysRouter)

export default routes
