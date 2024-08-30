import { Router } from 'express'
import { loginHandler } from '../handlers/loginHandlers'

const loginRouter = Router()

loginRouter.post('/', loginHandler)

export default loginRouter
