import { Router } from 'express'
import usersRouter from './usersRouter'
import bondsRouter from './bondsRouter'
import holidaysRouter from './holidaysRouter'
import loginRouter from './loginRouter'
import portfoliosRouter from './portfoliosRouter'

const routes = Router()

routes.use('/users', usersRouter)

routes.use('/bonds', bondsRouter)

routes.use('/holidays', holidaysRouter)

routes.use('/login', loginRouter)

routes.use('/portfolios', portfoliosRouter)

export default routes
